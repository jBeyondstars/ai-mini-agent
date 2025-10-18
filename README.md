# ai-min-agent

A minimal AI agent starter project using the `ai` SDK and provider adapters for OpenAI and Google. This repository contains a tiny TypeScript/Bun-based agent (`mini-agent.ts`) and minimal wiring to experiment with different AI providers.

## What this is

- Project name: `ai-min-agent`
- Main module: `mini-agent.ts`
- Runtime: this project is written in TypeScript and is compatible with Bun (or Node with a compatible loader).

## Prerequisites

- Bun (https://bun.sh/) OR Node (v18+) with TypeScript installed
- TypeScript (peer dependency) - the project declares a peer dependency on TypeScript
- Valid credentials for the provider(s) you want to use (OpenAI, Google) set as environment variables as required by the respective SDKs

## Installation (Windows PowerShell)

1. Install Bun (optional) or ensure Node + npm/yarn are installed.

2. From the repository root, install dependencies:

```powershell
# with Bun
bun install

# or with npm
npm install
```

3. If you're using TypeScript and want to run `mini-agent.ts` directly with Bun, Bun will handle TypeScript files. If using Node, compile first:

```powershell
# compile with tsc (if using Node)
npx tsc mini-agent.ts --outDir dist --esModuleInterop --module esnext

# then run with Node
node dist/mini-agent.js
```

## Usage

- Edit `mini-agent.ts` to configure which provider adapter to use and to add your prompt/agent logic.
- Provide credentials through environment variables as required by the provider SDKs. For example (PowerShell):

```powershell
$env:OPENAI_API_KEY = 'your-openai-key'
$env:GOOGLE_API_KEY = 'your-google-key'
```

- Run the agent:

```powershell
# with Bun
bun run mini-agent.ts

# or with Node after compiling
node dist/mini-agent.js
```

## Project structure

- `mini-agent.ts` — main TypeScript agent file
- `provider.ts` — provider wiring and configuration
- `hello.js` — small helper/example script
- `package.json` — project manifest

## Notes & Assumptions

- package.json lists `module: "mini-agent.ts"` and `type: "module"` — the README assumes ES module usage.
- The project depends on `@ai-sdk/openai`, `@ai-sdk/google`, and `ai`. See those packages for provider-specific env var names and setup.
- This README assumes you have Bun or Node available on Windows. Commands shown are for PowerShell.

## Contributing

Send issues or pull requests. Keep changes small and include tests where appropriate.

## License

Add a LICENSE file if you want to open-source this repository. No license is included by default.
