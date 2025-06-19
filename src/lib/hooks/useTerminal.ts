import { useState, useEffect, useCallback, useRef } from "react";
import { executeCommand as executeCommandFn } from "@/lib/commands";
import { 
  CommandHistoryItem, 
  initialWelcomeMessage, 
  typeEffect 
} from "@/lib/terminalUtils";

export function useTerminal() {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [commandBuffer, setCommandBuffer] = useState<string[]>([]);
  const [bufferIndex, setBufferIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [welcomeMessage] = useState<string[]>(initialWelcomeMessage);
  
  // Use refs to avoid stale closures in the effect
  const commandBufferRef = useRef(commandBuffer);
  const currentInputRef = useRef(currentInput);
  
  // Keep refs updated with latest values
  useEffect(() => {
    commandBufferRef.current = commandBuffer;
    currentInputRef.current = currentInput;
  }, [commandBuffer, currentInput]);

  // Function to execute the current command (define with useCallback to avoid infinite recursion)
  const executeCommand = useCallback(() => {
    const command = currentInputRef.current.trim();
    
    // Skip if empty command
    if (command === "") {
      setCurrentInput("");
      return;
    }
    
    // Add command to buffer
    const newBuffer = [...commandBufferRef.current, command];
    setCommandBuffer(newBuffer);
    setBufferIndex(newBuffer.length);
    
    // Execute command and get output
    const output = command ? executeCommandFn(command) : "";
    
    // Handle clear command
    if (output === "__CLEAR__") {
      setCommandHistory([]);
      setCurrentInput("");
      return;
    }
    
    // Add command and output to history
    const newHistoryItem: CommandHistoryItem = {
      prompt: "visitor@rohan1010:~$",
      command,
      output,
    };
    
    setCommandHistory((prevHistory) => [...prevHistory, newHistoryItem]);
    setCurrentInput("");
  }, []); // No external dependencies needed with refs

  // Simulate typing "help" on initial load
  useEffect(() => {
    // Use a flag to ensure this only runs once
    const hasRun = sessionStorage.getItem('initialHelpRun');
    if (!hasRun) {
      sessionStorage.setItem('initialHelpRun', 'true');
      typeEffect(
        "help",
        (value) => setCurrentInput(value),
        () => executeCommand()
      );
    }
  }, []); // Empty dependency array - only run once on mount

  // Function to navigate command history using arrow keys
  const navigateHistory = useCallback((direction: number) => {
    if (commandBufferRef.current.length === 0) return;
    
    const newIndex = bufferIndex + direction;
    
    // Bounds checking
    if (newIndex >= 0 && newIndex <= commandBufferRef.current.length) {
      setBufferIndex(newIndex);
      
      // Set current input based on history or empty if at end
      if (newIndex === commandBufferRef.current.length) {
        setCurrentInput("");
      } else {
        setCurrentInput(commandBufferRef.current[newIndex]);
      }
    }
  }, [bufferIndex]);

  return {
    commandHistory,
    currentInput,
    setCurrentInput,
    executeCommand,
    navigateHistory,
    welcomeMessage,
  };
}
