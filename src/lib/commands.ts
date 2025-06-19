type CommandHandler = () => string;

interface CommandRegistry {
  [key: string]: CommandHandler;
}

export const availableCommands: CommandRegistry = {
  help: () => {
    return `
Available commands:
- about: About Me
- skills: View my skills and expertise
- projects: View my projects
- experience: View my work experience
- contact: Get in touch with me
- help: Show this help message
- clear: Clear the terminal
`;
  },

  clear: () => {
    return "__CLEAR__"; // Special marker for clear command
  },

  about: () => {
    return `
Hello, I'm RoHAN R. I specialize in Generative AI and Natural Language Processing (NLP). 
My expertise lies in fine-tuning large language models (LLMs) like Gemma-3-4B and Llama 3.2 using LoRA and QLoRA, and deploying domain-specific AI systems in legal, social, and scientific applications.

As a Python Developer Intern at EpicMinds, I created retrieval-augmented generation (RAG) agents to answer queries based on U.S. state-level child welfare laws and support Goodwill’s charitable services.

I also developed an offline AI-powered Q&A system for spacecraft documentation at the U.R. Rao Satellite Center, ISRO, improving accessibility to legacy systems in a secure environment.

My tech stack: Python, Hugging Face, PyTorch, Crawl4AI, Docker, and Gemini API. I'm passionate about building scalable, secure, and impactful AI solutions.
`;
  },

  skills: () => {
    return `
Skills & Expertise:
- Languages: Python, Java
- LLMs: LoRA, QLoRA, Hugging Face, Unsloth
- Frameworks: LangChain, CrewAI
- Models: Gemma-3-4B, Llama 3.2
- NLP: RAG, Transformers, Tokenization
- Deployment: Docker, Streamlit, Google Colab, Pydantic AI
- Web Scraping: Crawl4AI, BeautifulSoup
- APIs: OpenAI, Gemini
- Databases: Qdrant, PostgreSQL
`;
  },

  experience: () => {
    return `
Experience:
-----------
1. Python Developer Intern - EpicMinds (May 2025 - Present)
   • Built RAG agents for U.S. child welfare laws and Goodwill support.
   • Conducted web scraping using Crawl4AI, integrated Gemini API for dynamic responses.
   • Used Qdrant and PostgreSQL to store structured data and implemented hybrid retrieval strategies (contextual + BM25).

2. Research Intern - U.R. Rao Satellite Center, ISRO
   • Developed an offline AI-powered Q&A system for spacecraft documentation.
   • Fine-tuned models without internet access, enhancing accessibility for legacy code.
   • Deployed solutions using PyTorch, LoRA, Hugging Face, and Docker.

Technologies: Python, Crawl4AI, Gemini API, Qdrant, PostgreSQL, BM25, Contextual Retrieval, PyTorch, Docker
`;
  },

  projects: () => {
    return `
Projects:
---------
1. Legal AI for IPC Compliance - Fine-tuned Gemma-3-4B for IPC law classification, deployed offline with Hugging Face and Docker.
2. Child Welfare RAG Agent - Built a chatbot for U.S. state-level child welfare laws using hybrid retrieval strategies.
3. Goodwill Support Chatbot - Developed a chatbot for Goodwill’s charitable services using Crawl4AI and Gemini API.
4. ISRO Spacecraft Q&A System - Offline AI system for spacecraft documentation insights at U.R. Rao Satellite Center, ISRO.

Type 'project [number]' for more details on a specific project.
`;
  },

  contact: () => {
    return `
Contact Information:
-------------------
Email: rohanmalik102003@gmail.com
Phone No: 7899437298

Quick access commands:
- github: Visit my GitHub profile
- linkedin: Visit my LinkedIn profile

Availability:
Open to internships, collaborations, and AI-focused roles.
`;
  },

  github: () => {
    window.open("https://github.com/rohanmalik102003", "_blank");
    return "Opening GitHub profile: ROHAN R";
  },

  linkedin: () => {
    window.open("https://www.linkedin.com/in/rohan-r-083960324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank");
    return "Opening LinkedIn profile: ROHAN R";
  },

};

// Project details
const projectDetails = [
  {
    title: "Legal AI for IPC Compliance",
    description:
      "Fine-tuned Gemma-3-4B using LoRA to classify and process IPC sections. Deployed offline with Hugging Face and Docker for data privacy and local execution.",
    technologies: "LoRA, Gemma-3-4B, Unsloth, PyTorch, Hugging Face, Docker",
    plainLink: "https://github.com/rohanmalik102003/gemma-3-indian-penal-code-finetuning",
  },
  {
    title: "Child Welfare RAG Agent",
    description:
      "Built an agentic RAG chatbot to answer queries based on federal and 50 state-level U.S. child welfare laws. Combined contextual and BM25 retrieval for accuracy.",
    technologies: "RAG, Crawl4AI, Gemini API, Qdrant, PostgreSQL, BM25",
  },
  {
    title: "Goodwill Support Chatbot",
    description:
      "Created a domain-specific chatbot for Goodwill's charitable services using Crawl4AI and Gemini API. Implemented a hybrid retrieval strategy for robust answers.",
    technologies: "BM25, Contextual Retrieval, Gemini API, Crawl4AI",
  },
  {
    title: "ISRO Spacecraft Q&A System",
    description:
      "Offline AI-powered Q&A system to assist engineers in understanding spacecraft documentation. Focused on secure, internet-free deployments using PyTorch and Docker.",
    technologies: "PyTorch, LoRA, Hugging Face, Pandas, Docker",
    plainLink: "https://github.com/rohanmalik102003/Multi-PDF-Model-Fine-Tuning-and-Inference",
  },
];

export function getProjectDetails(projectNum: number): string {
  if (projectNum >= 1 && projectNum <= projectDetails.length) {
    const project = projectDetails[projectNum - 1];
    return `
Project: ${project.title}
-----------------------
Description: ${project.description}
Technologies: ${project.technologies}
Link: ${project.plainLink}
`;
  }
  return `Invalid project number. Type 'projects' to see available projects.`;
}

export function executeCommand(command: string): string {
  const trimmedCommand = command.trim().toLowerCase();

  if (trimmedCommand === "") return "";

  if (availableCommands[trimmedCommand]) {
    return availableCommands[trimmedCommand]();
  } else if (trimmedCommand.startsWith("project ")) {
    const projectNum = parseInt(trimmedCommand.split(" ")[1]);
    return getProjectDetails(projectNum);
  } else {
    return `Command not found: ${trimmedCommand}. Type 'help' for available commands.`;
  }
}
