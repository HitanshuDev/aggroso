# 📋 Task Generator - AI-Powered Planning Tool

Transform feature ideas into actionable user stories and engineering tasks in seconds using AI. Perfect for product managers, developers, and teams who need to break down features efficiently.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🤖 AI-Powered Task Generation** - Generate comprehensive user stories and engineering tasks from feature descriptions (powered by OpenAI)
- **📋 Smart Task Organization** - Tasks automatically categorized by type (Frontend, Backend, Design, QA, Planning, Risk)
- **🎯 Priority & Status Management** - Assign priorities (High/Medium/Low) and track status (To Do/In Progress/Done)
- **📤 Multiple Export Formats** - Export as JSON with copy-to-clipboard or download options
- **📚 History Tracking** - Save and quickly recall your last 5 generated specifications
- **🎨 Template Support** - Pre-built templates for Web Apps, Mobile Apps, Internal Tools, and APIs
- **✅ Input Validation** - Smart validation with helpful error messages and character limits
- **🏥 System Health Checks** - Real-time status page monitoring API, OpenAI connection, and local storage
- **💾 Persistent Storage** - Auto-save specs to browser localStorage

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React server-rendered framework with App Router |
| **React 18** | UI component library |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **OpenAI GPT-4** | AI task generation (optional, with mock fallback) |
| **Vercel** | Hosting & deployment |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key (optional - app works with mock data)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aggroso.git
cd aggroso

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your OpenAI API key (optional)
# Edit .env.local and add: OPENAI_API_KEY=your_key_here

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 💻 How to Use

1. **Fill the Form**
   - Enter your feature goal (min 10 characters)
   - Describe target users (min 10 characters)
   - List constraints and requirements (min 10 characters)
   - Optionally select a template

2. **Generate Tasks**
   - Click "Generate Tasks"
   - AI generates user stories, engineering tasks, and identifies risks
   - If OpenAI API is not configured, mock data is used

3. **Manage Tasks**
   - Click edit icon to modify task details
   - Change status dropdown to update progress (To Do → In Progress → Done)
   - Delete tasks you don't need
   - View tasks organized by category and priority

4. **Export & Share**
   - Copy as JSON with clipboard button
   - Download as `.json` file
   - Share with your team

5. **Access History**
   - Click "Load" to restore previous specs
   - Click "Delete" to remove from history
   - Each spec shows task count and creation time

## 🏥 System Status

Visit [http://localhost:3000/status](http://localhost:3000/status) to check:
- **API Server** - Whether the app is responding normally
- **OpenAI Connection** - Whether the API key is valid and connected
- **Local Storage** - Whether browser storage is available for persistence

The status page auto-refreshes every 30 seconds.

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-tasks/
│   │   │   └── route.ts          # API endpoint for task generation
│   │   └── health/
│   │       └── route.ts          # Health check endpoint
│   ├── status/
│   │   └── page.tsx              # System health status page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Main home page
│   └── favicon.ico
├── components/
│   ├── FeatureForm.tsx           # Input form with validation
│   ├── TaskList.tsx              # Task display & management
│   ├── ExportPanel.tsx           # Export options
│   ├── HistoryPanel.tsx          # History viewer
│   └── TaskEditModal.tsx         # Task editing modal
├── lib/
│   └── taskGenerator.ts          # AI task generation logic
├── types/
│   └── index.ts                  # TypeScript interfaces
├── README.md                      # This file
├── AI_NOTES.md                    # AI usage documentation
├── ABOUTME.md                     # Author information
├── PROMPTS_USED.md               # AI prompts used in development
├── .env.example                  # Environment variables template
├── .env.local                    # Environment variables (git ignored)
└── vercel.json                   # Vercel configuration
```

## 🔌 API Documentation

### GET `/api/health`

Checks the health of all system components.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-12T10:30:00Z",
  "checks": {
    "api": {
      "status": true,
      "message": "API responding normally"
    },
    "openai": {
      "status": true,
      "message": "Connected"
    },
    "database": {
      "status": true,
      "message": "Local storage available"
    }
  }
}
```

### POST `/api/generate-tasks`

Generates tasks based on a feature specification.

**Request Body:**
```json
{
  "goal": "Allow users to collaborate in real-time on documents",
  "users": "Product teams, remote workers, educational institutions",
  "constraints": "Must support 100+ concurrent users, sub-100ms latency",
  "template": "Web App"
}
```

**Response:**
```json
{
  "tasks": [
    {
      "id": "1707667200000-0",
      "title": "Design collaborative editing UI",
      "description": "Create wireframes for real-time editor with cursor tracking",
      "type": "story",
      "priority": "high",
      "category": "Design",
      "status": "todo"
    },
    {
      "id": "1707667200000-1",
      "title": "Implement WebSocket connection",
      "description": "Set up WebSocket server for real-time sync",
      "type": "task",
      "priority": "high",
      "category": "Backend",
      "status": "todo"
    }
  ]
}
```

**Error Response:**
```json
{
  "error": "Failed to generate tasks",
  "message": "Error details here"
}
```

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API Configuration (optional)
OPENAI_API_KEY=sk-your-key-here

# App URL (automatically set by Vercel)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Note:** Leave `OPENAI_API_KEY` empty to use mock data for development and testing.

## 📊 Task Categories & Types

### Categories
- **Planning** - Specification and planning tasks
- **Design** - UI/UX design work
- **Frontend** - React component development
- **Backend** - API and server-side implementation
- **QA** - Testing and quality assurance
- **Risk** - Potential risks and unknowns

### Task Types
- **Story** - User story from end-user perspective
- **Task** - Engineering implementation task
- **Risk** - Identified risks or unknown factors

### Priority Levels
- **High** - Critical path items
- **Medium** - Important but not blocking
- **Low** - Nice to have

## 🏗 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 📖 Documentation

- **[README.md](README.md)** - Project overview, setup, and usage
- **[AI_NOTES.md](AI_NOTES.md)** - Details about AI integration, LLM provider, and what was/wasn't AI-generated
- **[ABOUTME.md](ABOUTME.md)** - Author information and background
- **[PROMPTS_USED.md](PROMPTS_USED.md)** - Record of AI prompts used during development

