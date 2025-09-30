# techtouch0 Web Application

This is a modern, dynamic web application designed to feature posts, applications, and games. It is managed via a headless CMS (Netlify CMS) and integrates several AI-powered features using the Google Gemini and Cloudflare AI APIs.

## ✨ Features

- **Dynamic Content Management**: Easily manage posts, categories, and site settings through the Netlify CMS admin panel at `/admin/`.
- **AI-Powered Content Assistance**:
  - **Post Summarization**: Generate concise summaries for any post using Gemini AI.
  - **AI Chat**: Engage in a conversation with a Gemini-powered chatbot with local storage history persistence.
  - **AI Image Generation**: Create images from text prompts using two powerful models: Google's Imagen (via Gemini) and Cloudflare's Stable Diffusion model.
  - **CMS AI Helper**: Within the CMS, users can summarize, reorder content into bullet points, or complete text using Gemini.
- **Interactive User Experience**:
  - **Post Reactions**: Users can react to posts with "like," "dislike," or "love." Counts are stored on the server.
  - **Search & Filtering**: Quickly find posts with a real-time search bar and category filters.
- **Progressive Web App (PWA)**:
  - **Installable**: The application can be installed on mobile and desktop devices.
  - **Offline Functionality**: A service worker provides offline access to previously visited pages and assets.
- **Customizable & Themed**: Site identity (logo, name), colors, and social media links can be updated directly from the CMS.
- **Responsive Design**: A mobile-first design that looks great on all screen sizes.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **AI Services**: Google Gemini API (`@google/genai`), Cloudflare AI
- **CMS**: Netlify CMS
- **Deployment & Backend**: Netlify, Netlify Functions, Netlify Git Gateway

## 📂 Project Structure

```
/
├── content/                # Markdown content for posts and categories
│   ├── posts/
│   └── categories/
├── netlify/
│   └── functions/          # Serverless functions for AI and reactions
│       ├── ai-helper.ts
│       ├── gemini-image-generator.ts
│       ├── image-generator.ts
│       └── reactions.ts
├── public/                 # Static assets and build outputs
│   ├── admin/              # Netlify CMS configuration and custom scripts
│   ├── uploads/            # Media files uploaded via CMS
│   ├── categories.json     # Generated categories data (prebuild)
│   └── posts.json          # Generated posts data (prebuild)
├── scripts/
│   └── prebuild.js         # Script to convert Markdown to JSON
├── src/                    # Main application source code
│   ├── components/         # React components
│   └── types/              # TypeScript type definitions
├── .env.example            # Environment variable template
├── package.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory by copying `.env.example`. Fill in your API keys:
    ```env
    # Google Gemini API Key
    API_KEY="your_google_api_key"

    # Cloudflare AI Credentials for Image Generation
    CLOUDFLARE_ACCOUNT_ID="your_cloudflare_account_id"
    CLOUDFLARE_API_KEY="your_cloudflare_api_key"
    ```

### Running the Application

- **Development Server:**
  ```bash
  npm run dev
  ```
  This will start the Vite development server, typically at `http://localhost:5173`.

- **Production Build:**
  ```bash
  npm run build
  ```
  This command first runs the `prebuild.js` script to generate JSON from your Markdown files and then builds the application for production in the `dist/` folder.

## 📝 Headless CMS (Netlify CMS)

The content of this website is managed through Netlify CMS.

- **Access**: The admin panel is available at `https://your-deployed-site.com/admin/`. For local development, you can use the Netlify CLI with a local Git gateway.
- **Collections**:
  - **إعدادات الموقع (Site Settings)**: Configure global settings like the site logo, name, colors, announcement bar, and social media links.
  - **التصنيفات (Categories)**: Manage the categories used to filter posts.
  - **المنشورات (Posts)**: Create and edit posts. The post editor includes AI Helper buttons to automatically **summarize**, **reorder as points**, or **complete** the content in the main body field.

## ☁️ Serverless Functions

The application uses Netlify Functions to securely handle requests to AI services and manage dynamic data like reactions.

-   `ai-helper.ts`: Powers the AI buttons within the Netlify CMS post editor.
-   `gemini-image-generator.ts`: A backend proxy to generate images using the Gemini Imagen model.
-   `image-generator.ts`: A backend proxy to generate images using Cloudflare's AI model.
-   `reactions.ts`: A simple in-memory store to handle post reaction counts.

## ⚙️ Prebuild Process

Before the Vite build process starts, the `scripts/prebuild.js` script runs. It reads all Markdown files from the `content/posts` and `content/categories` directories, parses the frontmatter and content, and compiles them into `public/posts.json` and `public/categories.json`. The main React application then fetches these JSON files to display the content. This approach allows for static content generation while maintaining the ease of Markdown-based content management.
