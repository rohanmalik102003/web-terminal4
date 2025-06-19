interface CommandLineProps {
  prompt: string;
  input: string;
}

export default function CommandLine({ prompt, input }: CommandLineProps) {
  return (
    <div className="flex flex-wrap items-start">
      <span className="whitespace-nowrap">{prompt}</span>
      <span className="ml-2 break-all">{input}</span>
      <span className="animate-blink">█</span>
    </div>
  );
}
