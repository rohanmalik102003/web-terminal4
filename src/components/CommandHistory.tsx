import { CommandHistoryItem } from "@/lib/terminalUtils";

interface CommandHistoryProps {
  history: CommandHistoryItem[];
}

export default function CommandHistory({ history }: CommandHistoryProps) {
  return (
    <div id="command-history">
      {history.map((item, index) => (
        <div key={index}>
          {/* Command line with prompt and input */}
          <div className="flex flex-wrap">
            <span className="whitespace-nowrap">{item.prompt}</span>
            <span className="ml-2 break-all">{item.command}</span>
          </div>
          
          {/* Command output */}
          {item.output && (
            <div className="whitespace-pre-wrap mt-1 mb-2">{item.output}</div>
          )}
        </div>
      ))}
    </div>
  );
}
