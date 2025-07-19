import { useState, useCallback, useRef, useEffect } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume context if suspended (required for some browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number = 3) => {
    if (isPlaying) {
      return;
    }

    try {
      const audioContext = initAudioContext();
      
      // Create oscillator and gain node
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      // Gentle volume envelope for smooth sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      // Connect audio nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Store references for cleanup
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      
      // Start playing
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
      
      setIsPlaying(true);
      
      // Handle end of playback
      oscillator.onended = () => {
        setIsPlaying(false);
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      };
      
    } catch (error) {
      console.error('Error playing tone:', error);
      setIsPlaying(false);
    }
  }, [isPlaying, initAudioContext]);

  const stopTone = useCallback(() => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (error) {
        // Oscillator might already be stopped
        console.warn('Error stopping oscillator:', error);
      }
      oscillatorRef.current = null;
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Cleanup on unmount or visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTone();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopTone();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopTone]);

  return {
    isPlaying,
    playTone,
    stopTone
  };
}
