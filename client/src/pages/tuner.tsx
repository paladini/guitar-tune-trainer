import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAudio } from "@/hooks/use-audio";
import { guitarStrings, type GuitarString } from "@/lib/guitar-strings";
import { Play, Square, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Tuner() {
  const [currentStringIndex, setCurrentStringIndex] = useState(2); // Start with D string
  const { isPlaying, playTone, stopTone } = useAudio();
  const isMobile = useIsMobile();

  const currentString = guitarStrings[currentStringIndex];

  const handlePlayToggle = useCallback(() => {
    if (isPlaying) {
      stopTone();
    } else {
      playTone(currentString.frequency);
    }
  }, [isPlaying, stopTone, playTone, currentString.frequency]);

  const handleRepeat = useCallback(() => {
    stopTone();
    setTimeout(() => playTone(currentString.frequency), 100);
  }, [stopTone, playTone, currentString.frequency]);

  const navigateToString = useCallback((direction: 'next' | 'prev') => {
    stopTone();
    
    if (direction === 'next') {
      setCurrentStringIndex((prev) => (prev + 1) % guitarStrings.length);
    } else {
      setCurrentStringIndex((prev) => (prev - 1 + guitarStrings.length) % guitarStrings.length);
    }
  }, [stopTone]);

  // Touch gesture handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    e.currentTarget.setAttribute('data-touch-start-x', touch.clientX.toString());
    e.currentTarget.setAttribute('data-touch-start-y', touch.clientY.toString());
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startX = parseFloat(e.currentTarget.getAttribute('data-touch-start-x') || '0');
    const startY = parseFloat(e.currentTarget.getAttribute('data-touch-start-y') || '0');
    
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    
    // Only handle horizontal swipes that are longer than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        navigateToString('prev'); // Swipe right = previous
      } else {
        navigateToString('next'); // Swipe left = next
      }
    }
  }, [navigateToString]);

  return (
    <div className="min-h-screen bg-watch-bg flex items-center justify-center p-4 font-roboto">
      <Card className="watch-container relative overflow-hidden border-watch-surface">
        
        {/* String Navigation Dots */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {guitarStrings.map((string, index) => (
            <div
              key={string.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStringIndex 
                  ? 'opacity-100 shadow-lg scale-110' 
                  : 'opacity-50 hover:opacity-75'
              }`}
              style={{ 
                backgroundColor: string.color,
                boxShadow: index === currentStringIndex ? `0 0 10px ${string.color}` : 'none'
              }}
              onClick={() => {
                stopTone();
                setCurrentStringIndex(index);
              }}
            />
          ))}
        </div>

        {/* Main Tuner Interface */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* String Name Display */}
          <div className="mb-4 text-center">
            <div className="text-4xl font-bold text-white mb-1">
              {currentString.name}
            </div>
            <div className="text-sm text-gray-400 font-medium">
              {currentString.position}
            </div>
          </div>

          {/* String Indicator Ring */}
          <div className="relative mb-6">
            <div 
              className={`string-indicator w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                isPlaying ? 'scale-110 animate-pulse' : ''
              }`}
              style={{ 
                borderColor: currentString.color, 
                color: currentString.color 
              }}
            >
              <div className="text-2xl">🎵</div>
            </div>
            <div 
              className="absolute -inset-2 rounded-full border opacity-30 animate-pulse"
              style={{ borderColor: currentString.color }}
            />
          </div>

          {/* Frequency Display */}
          <Card className="frequency-display bg-watch-surface/50 backdrop-blur border-white/20 rounded-lg px-4 py-2 mb-6">
            <div className="text-center">
              <div className="text-xs text-gray-300 mb-1">Target Frequency</div>
              <div className="text-lg font-bold text-white">
                {currentString.frequency.toFixed(2)} Hz
              </div>
            </div>
          </Card>

          {/* Play Button */}
          <Button
            onClick={handlePlayToggle}
            className="play-button w-16 h-16 rounded-full mb-4 border-0 shadow-lg transition-all duration-200 active:scale-95"
            style={{
              background: `radial-gradient(circle, ${currentString.color} 0%, ${currentString.color}88 100%)`
            }}
          >
            {isPlaying ? (
              <Square className="text-white text-xl" />
            ) : (
              <Play className="text-white text-xl ml-1" />
            )}
          </Button>

          {/* Audio Controls */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-watch-surface border-gray-600 text-gray-300 hover:text-white hover:border-gray-400"
              onClick={handleRepeat}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-watch-surface border-gray-600 text-gray-300 hover:text-white hover:border-gray-400"
              onClick={() => navigateToString('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full bg-watch-surface border-gray-600 text-gray-300 hover:text-white hover:border-gray-400"
              onClick={() => navigateToString('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
