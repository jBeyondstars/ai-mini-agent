import { google } from "./provider.ts";
import { generateText } from "ai";

const systemPrompt = `You are an AI coding assistant with file system tools.

Available tools:
1. To read a file, respond EXACTLY: Read the file 'filename.ext' and return its contents.
2. To write a file, respond EXACTLY: Write 'content here' to 'filename.ext'.

IMPORTANT: You must use these EXACT formats. Do not write code snippets or use other formats.

When asked to modify a file:
1. First read the file
2. After seeing the contents, write the modified version back using the write tool format

Example workflow:
User: "remove comments from test.js"
Assistant: Read the file 'test.js' and return its contents.
[Tool executes and returns file contents]
Assistant: Write 'console.log("hello");' to 'test.js'.`;

const messages: any[] = [
    { role: "system", content: systemPrompt }
];

async function runAgent(input?: string) {
  if (!input) return;
  
  messages.push({ role: "user", content: input });  

  while (true) {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      messages: messages,
    });

    console.log("Agent Response:", text);
    
    messages.push({ role: "assistant", content: text });

    const tools = parseTools(text);

    if (tools.length === 0) {
      break;
    }
    
    for (const tool of tools) {
      console.log(`Executing tool: ${tool.name}`);
      const result = await executeTool(tool);
      console.log(`Tool result: ${result}`);
      messages.push({ 
        role: "user", 
        content: `Tool "${tool.name}" executed successfully. Result: ${result}` 
      });
    }
  }
}

function readFile(filename:string) {
    const file = Bun.file(filename);
    return file.text();
}

function writeFile(filename:string, content:string) {
    const file = Bun.file(filename);
    return Bun.write(file, content);
}

function executeTool(tool: any) {
  if(tool.name === "readFile") {
    return readFile(tool.params.file);
  }
  if(tool.name === "writeFile") {
    return writeFile(tool.params.file, tool.params.content);
  }

  return `Unknown tool: ${tool.name}`;
}

function parseTools(text: string) {
    const tools: any[] = [];
    const readMatches = text.match(/Read the file '([^']+)'/);
    if (readMatches) {
        tools.push({ name: "readFile", params: { file: readMatches[1] } });
    }

    const writeMatches = text.match(/Write '([^']+)' to '([^']+)'/);
    if (writeMatches) {
        tools.push({ name: "writeFile", params: { content: writeMatches[1], file: writeMatches[2] } });
    }

    return tools;
}

async function startAgent() {
  console.log("Agent is starting...");

  while(true) {
    const userInput = prompt("Enter command: ");
    if (userInput === "exit") {
      console.log("Exiting agent.");
      break;
    }

    if (userInput) {
        await runAgent(userInput);
    }
  }
}

startAgent();