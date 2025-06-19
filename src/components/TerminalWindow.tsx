import { useEffect, useRef } from "react";
import CommandHistory from "./CommandHistory";
import CommandLine from "./CommandLine";
import { useTerminal } from "@/lib/hooks/useTerminal";

interface TerminalWindowProps {
  visitorCount: number;
}

export default function TerminalWindow({ visitorCount }: TerminalWindowProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const {
    commandHistory,
    currentInput,
    setCurrentInput,
    executeCommand,
    navigateHistory,
    welcomeMessage,
  } = useTerminal();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();

    switch (e.key) {
      case "Enter":
        executeCommand();
        break;
      case "ArrowUp":
      case "ArrowDown":
        navigateHistory(e.key === "ArrowUp" ? -1 : 1);
        break;
      case "Backspace":
        setCurrentInput(currentInput.slice(0, -1));
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
          setCurrentInput(currentInput + e.key);
        }
        break;
    }
  };

  // Auto-focus and scroll to bottom when terminal content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, currentInput]);

  // Auto-focus terminal on click
  const handleTerminalClick = () => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  };

  return (
    <div
      id="terminal"
      ref={terminalRef}
      className="w-full h-full p-4 overflow-y-auto outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleTerminalClick}
    >
      <div id="terminal-content">
        {/* Welcome message */}
        <div id="welcome-message">
          {welcomeMessage.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          <div id="visitor-counter">
            visitor@rohan1010:~$ [Visitor #{visitorCount}]
          </div>
        </div>

        {/* Command history */}
        <CommandHistory history={commandHistory} />

        {/* Current command line */}
        <CommandLine
          prompt="visitor@rohan1010:~$"
          input={currentInput}
        />
      </div>
    </div>
  );
}
