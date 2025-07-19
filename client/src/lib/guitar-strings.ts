export interface GuitarString {
  id: string;
  name: string;
  position: string;
  frequency: number; // in Hz
  color: string;
}

export const guitarStrings: GuitarString[] = [
  {
    id: 'e1',
    name: 'E',
    position: '6th String',
    frequency: 82.41,
    color: '#FF5722'
  },
  {
    id: 'a',
    name: 'A',
    position: '5th String',
    frequency: 110.00,
    color: '#4CAF50'
  },
  {
    id: 'd',
    name: 'D',
    position: '4th String',
    frequency: 146.83,
    color: '#2196F3'
  },
  {
    id: 'g',
    name: 'G',
    position: '3rd String',
    frequency: 196.00,
    color: '#FF9800'
  },
  {
    id: 'b',
    name: 'B',
    position: '2nd String',
    frequency: 246.94,
    color: '#9C27B0'
  },
  {
    id: 'e2',
    name: 'E',
    position: '1st String',
    frequency: 329.63,
    color: '#F44336'
  }
];
