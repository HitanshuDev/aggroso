# 📋 Task Generator - AI-Powered Planning Tool

Transform feature ideas into actionable user stories and engineering tasks in seconds using AI. Perfect for product managers, developers, and teams who need to break down features efficiently.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🤖 AI-Powered Task Generation** - Generate comprehensive user stories and engineering tasks from feature descriptions
- **📋 Smart Task Organization** - Tasks automatically categorized by type (Frontend, Backend, Design, QA, Planning, Risk)
- **🎯 Priority & Status Management** - Assign priorities (High/Medium/Low) and track status (To Do/In Progress/Done)
- **📤 Multiple Export Formats** - Export as Markdown or plain text with copy-to-clipboard or download
- **📚 History Tracking** - Save and quickly recall your last 5 generated specifications
- **🎨 Template Support** - Pre-built templates for Web Apps, Mobile Apps, Internal Tools, and APIs
- **🔄 Drag-and-Drop Reordering** - Intuitive interface to reorganize tasks
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
   - Enter your feature goal
   - Describe target users
   - List constraints and requirements
   - Optionally select a template

2. **Generate Tasks**
   - Click "Generate Tasks"
   - AI generates user stories, engineering tasks, and identifies risks

3. **Manage Tasks**
   - Drag to reorder tasks
   - Click status dropdown to change (To Do → In Progress → Done)
   - Delete tasks you don't need
   - View tasks organized by category

4. **Export & Share**
   - Copy as Markdown or plain text with clipboard buttons
   - Download as `.md` or `.txt` file
   - Share formatted specs with your team

5. **Access History**
   - Click "Load" to restore previous specs
   - Click "Delete" to remove from history
   - Each spec shows task count and creation time

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-tasks/
│   │       └── route.ts          # API endpoint for task generation
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Main page component
│   └── favicon.ico
├── components/
│   ├── FeatureForm.tsx           # Input form component
│   ├── TaskList.tsx              # Task display & management
│   ├── ExportPanel.tsx           # Export options
│   └── HistoryPanel.tsx          # History viewer
├── lib/
│   └── taskGenerator.ts          # AI task generation logic
├── types/
│   └── index.ts                  # TypeScript interfaces
├── .env.example                  # Environment variables template
├── .env.local                    # Environment variables (git ignored)
└── vercel.json                   # Vercel configuration
```

## 🔌 API Documentation

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

## 🚢 Deployment

### Deploy to Vercel (Recommended)

**Option 1: Via GitHub**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Add environment variable: `OPENAI_API_KEY`
6. Deploy!

**Option 2: Via Vercel CLI**
```bash
npm i -g vercel
cd aggroso
vercel --prod
```

**Option 3: Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## 🧪 Development

### Run Tests
```bash
npm run dev       # Development server
npm run build     # Production build
npm run lint      # ESLint checks
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Environment Setup for Contributors

```bash
# Install Node 18+
# Clone repo
git clone https://github.com/yourusername/aggroso.git

# Setup
npm install
cp .env.example .env.local

# Development
npm run dev
```

## 🐛 Troubleshooting

### App works but tasks aren't generating
- Check if `OPENAI_API_KEY` is set in `.env.local`
- If not set, mock data will be used instead
- Check browser console for errors

### Export buttons not working
- Ensure browser allows clipboard access
- For download, check browser download settings

### Tasks not saving to history
- Verify localStorage is enabled in browser
- Check browser storage quota

## 📦 Dependencies

Key packages used:
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `openai` - AI integration (implicit via API calls)

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙋 Support & Feedback

- **Issues**: Open an issue on GitHub
- **Feature Requests**: Create a GitHub discussion
- **Questions**: Check existing issues/discussions first

## 🎯 Roadmap

- [ ] User authentication & cloud backup
- [ ] Team collaboration features
- [ ] Database persistence (MongoDB/PostgreSQL)
- [ ] Custom AI model support
- [ ] Task dependency visualization
- [ ] Gantt chart generation
- [ ] Jira/Asana integration
- [ ] Advanced filtering & search
- [ ] Custom prompt templates
- [ ] Mobile app

## ⭐ Show Your Support

If you find this tool helpful, please give it a star! ⭐

---

**Built with ❤️ for product teams and developers**

Made with [Next.js](https://nextjs.org) • [React](https://react.dev) • [TypeScript](https://www.typescriptlang.org) • [Tailwind CSS](https://tailwindcss.com)
