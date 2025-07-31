# Momentum AI - Specialized AI Agents

Momentum AI is a web application built with Next.js that provides a suite of specialized AI agents powered by Google's Gemini models. It offers a clean, modern, and responsive interface for users to interact with different AI capabilities, from text and code generation to image creation and document analysis.

## Features

- **Modern UI/UX**: Clean, minimal, and responsive user interface built with Next.js, Tailwind CSS, and ShadCN UI.
- **Specialized AI Agents**: Access a variety of AI agents, each tailored for a specific task.
- **Powered by Google Gemini**: Leverages Google's powerful Gemini family of models for high-quality and creative responses.
- **Text-to-Speech**: Convert text into natural-sounding speech with a selection of different voices.
- **Document & URL Analysis**: Summarize and ask questions about uploaded documents or content from a web page.
- **Image Generation**: Create stunning visuals from text prompts.
- **Code Generation**: Get assistance with writing code snippets in various programming languages.
- **Light & Dark Mode**: The app includes a theme toggler for user preference.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with [Google's Gemini API](https://ai.google.dev/gemini-api)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm
- A Google AI API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/momentum-ai.git
    cd momentum-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key.

    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

5.  **Run the Genkit development server (in a separate terminal):**
    This allows you to inspect and debug your Genkit flows.
    ```bash
    npm run genkit:watch
    ```
    The Genkit development UI will be available at `http://localhost:4000`.

## Available AI Agents

The application features several agents, each designed for a specific purpose:

- **Writer Agent**: Generate creative text, from poems and stories to emails and articles.
- **Coder Agent**: Get help with writing code snippets, debugging, and explaining programming concepts.
- **Image Generator**: Create unique images from descriptive text prompts.
- **TTS Agent**: Convert written text into natural-sounding speech using a variety of voices.
- **Document Summarizer**: Upload a document (.pdf, .doc, .txt) and receive a summary or ask specific questions about its content.
- **URL Summarizer**: Provide a URL to get a detailed summary of the web page's content.

## Disclaimer

The AI agents provided on this platform generate content based on complex algorithms and vast datasets. While we strive for accuracy and relevance, the generated content may not always be perfect and may sometimes produce incorrect or nonsensical information. Please use the generated content responsibly.

