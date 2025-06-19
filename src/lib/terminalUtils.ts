export interface CommandHistoryItem {
  prompt: string;
  command: string;
  output: string;
}

// Type autofill help text after a delay
export function typeEffect(
  text: string, 
  onUpdate: (value: string) => void, 
  onComplete?: () => void, 
  speed: number = 100
) {
  let index = 0;
  
  function typeChar() {
    if (index < text.length) {
      onUpdate(text.substring(0, index + 1));
      index++;
      setTimeout(typeChar, speed);
    } else if (onComplete) {
      setTimeout(onComplete, 500);
    }
  }
  
  typeChar();
}

// Welcome message to display on load
export const initialWelcomeMessage = [
  "Welcome to rohan1010's web terminal.",
  "Type 'help' for available commands."
];
