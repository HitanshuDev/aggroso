# Prompts Used for Development

This document records all 10 AI prompts used during the development of Aggroso, along with their context, purpose, and how they were applied to the project.

---

## 1️⃣ Architecture Planning

**Purpose:** Design a clean, production-ready architecture for frontend-only backend

**Prompt:**
```
I am building a small AI-powered task generator web app using Next.js (App Router).
The app should:

- Accept feature goal, users, and constraints
- Generate structured user stories and engineering tasks
- Allow editing and reordering
- Store last 5 specs
- Include a /status health check page

Suggest a clean architecture for frontend-only backend (API routes inside Next.js). 
Keep it simple but production-ready.
```

**Application:**
- Structured the project with Next.js App Router
- Implemented API routes in `src/app/api/`
- Designed component hierarchy with clear separation of concerns
- Created status page at `src/app/status/page.tsx`
- Established localStorage-based persistence pattern

**Output Artifacts:**
- `src/app/` folder structure with organized routes
- `src/components/` modular component architecture
- API endpoints under `src/app/api/`

---

## 2️⃣ LLM Prompt Design (Core Generator Prompt)

**Purpose:** Design the master prompt for generating task specifications from feature descriptions

**Prompt:**
```
You are a senior product manager and software architect.
Given:

- Feature Goal
- Target Users
- Constraints

Generate:

- 5–8 user stories (As a..., I want..., so that...)
- Engineering tasks grouped by category (Frontend, Backend, Database, Infrastructure)
- Risk / Unknowns section

Return the output strictly in structured JSON format suitable for parsing 
in a TypeScript application. Do not return markdown.
```

**Application:**
- Implemented in `src/lib/taskGenerator.ts` - `generateTasks()` function
- Used as the system prompt sent to OpenAI API
- Refined to include priority levels and task statuses
- Used in `src/app/api/generate-tasks/route.ts`

**Output Artifacts:**
- Core task generation logic in production
- Structured JSON responses with guaranteed format

---

## 3️⃣ JSON Schema Structuring

**Purpose:** Design clean, reusable data structures for the application

**Prompt:**
```
Design a clean JSON schema for representing:

- User stories
- Tasks (id, title, description, category, priority, status, type)
- Risk items

The schema should be easy to edit, reorder, and render in React.
```

**Application:**
- Created TypeScript interfaces in `src/types/index.ts`:
  - `FeatureSpec` - Feature specification input
  - `Task` - Individual task representation
  - `GeneratedSpec` - Complete spec with history metadata
- Enabled type-safe task manipulation throughout the app

**Output Artifacts:**
```typescript
export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'task' | 'risk';
  priority: 'high' | 'medium' | 'low';
  category: string;
  status: 'todo' | 'in-progress' | 'done';
}
```

---

## 4️⃣ Drag-and-Drop Logic

**Purpose:** Implement native drag-and-drop without external libraries

**Prompt:**
```
I have a React component rendering tasks grouped by category.
I want to implement simple drag-and-drop reordering without external libraries.
Explain how to handle dragStart, dragOver, and drop using native HTML drag events 
and update parent state safely.
```

**Application:**
- Implemented in `src/components/TaskList.tsx`
- Used native HTML5 drag event API (dragStart, dragOver, drop)
- Updated parent state via `onReorder()` callback
- Maintained immutable state patterns with copy operations

**Output Artifacts:**
- Drag-and-drop task reordering in TaskList component
- State updates through parent callbacks

---

## 5️⃣ Local Storage & Spec History

**Purpose:** Design pattern for persisting recent specs with history management

**Prompt:**
```
I want to store only the last 5 generated specs in localStorage.
Suggest a clean pattern to:

- Save new spec
- Keep only 5
- Retrieve and render them
- Handle JSON parsing safely.
```

**Application:**
- Implemented in `src/app/page.tsx` using useEffect hooks
- Created history state management pattern
- Safely parsed localStorage with try-catch blocks
- Implemented in `src/components/HistoryPanel.tsx` for display
- Used `GeneratedSpec` interface with timestamps

**Output Artifacts:**
- localStorage key: `taskGeneratorHistory`
- Automatic history slicing to keep only 5 items
- Safe error handling for JSON parsing

---

## 6️⃣ Status Page Design

**Purpose:** Design health check endpoint and frontend status display

**Prompt:**
```
Design a /status route for a Next.js app that checks:

- API route health
- LLM connectivity
- Environment variable presence

Return a simple JSON response and suggest how to show status visually on frontend.
```

**Application:**
- Created `src/app/api/health/route.ts` - API endpoint
- Created `src/app/status/page.tsx` - Frontend status page
- Checks three components:
  - API Server (always true if responding)
  - OpenAI Connection (validates API key)
  - Local Storage (availability check)
- Color-coded status indicators (green/yellow/red)
- Auto-refresh every 30 seconds

**Output Artifacts:**
- Health check JSON endpoint at `GET /api/health`
- Status dashboard at `/status` with real-time monitoring

---

## 7️⃣ Error Handling

**Purpose:** Design robust error handling for API calls and user input

**Prompt:**
```
In a Next.js API route calling an LLM, how should I:

- Validate empty input
- Handle API failures
- Return structured error responses
- Avoid exposing internal error details?
```

**Application:**
- Implemented in `src/app/api/generate-tasks/route.ts`:
  - Input validation for FeatureSpec
  - Try-catch blocks for API calls
  - Fallback to mock data if OpenAI unavailable
  - Structured error responses with HTTP status codes
- Implemented in `src/components/FeatureForm.tsx`:
  - Client-side validation with error messages
  - Minimum character length validation (10 chars)
  - Maximum character limits (500 chars)
  - Inline error display

**Output Artifacts:**
- Safe error handling throughout the stack
- User-friendly error messages
- Fallback mock data for development

---

## 8️⃣ Markdown Export Logic

**Purpose:** Convert JSON tasks to markdown for export

**Prompt:**
```
Convert structured task JSON into clean markdown format with:

- Title
- User stories section
- Categorized task sections
- Risk section

The output should be suitable for download as a .md file.
```

**Application:**
- Implemented in `src/components/ExportPanel.tsx`
- Generates markdown with proper formatting
- Groups tasks by category
- Includes task metadata (priority, type, status)
- Supports download to `.md` file
- Copy-to-clipboard functionality

**Output Artifacts:**
- Markdown export feature with download button
- Formatted output suitable for documentation
- JSON export option as well

---

## 9️⃣ Input Validation UX

**Purpose:** Design user-friendly validation patterns

**Prompt:**
```
Suggest good UX patterns for handling required form inputs in a small SaaS tool:

- Disable generate button
- Show inline error
- Prevent duplicate submissions
- Keep UI minimal and clean.
```

**Application:**
- Implemented in `src/components/FeatureForm.tsx`:
  - Validation error summary at top of form
  - Inline error indicators (red borders)
  - Character count displays
  - Error clearing on input change
  - Disabled submit button while loading
  - Helpful error messages listing specific issues
- Real-time validation feedback without popups

**Output Artifacts:**
- Improved user experience with inline validation
- Clear error states and recovery paths
- Clean, minimal form design

---

## 🔟 Metadata & SEO

**Purpose:** Configure proper metadata for the SaaS application

**Prompt:**
```
Generate proper Next.js metadata configuration for an AI task generator SaaS app including:

- Title
- Description
- OpenGraph tags
- Author info
```

**Application:**
- Implemented in `src/app/layout.tsx` metadata export
- Configured page title and description
- Set proper meta tags for sharing
- Author information in metadata
- Open Graph tags for social sharing preview

**Output Artifacts:**
- Proper SEO configuration in root layout
- Professional metadata for web sharing
- Enhanced discoverability

---

## Prompt Engineering Patterns Applied

### 1. **Structured Output Requirement**
All prompts for task generation included explicit JSON format specifications to ensure reliable parsing.

### 2. **Role-Based Prompting**
Used role assignments ("You are a senior product manager...") to improve response quality and relevance.

### 3. **Constraint Specification**
Included clear constraints (e.g., "Return ONLY valid JSON array, no markdown") to reduce parsing errors.

### 4. **Context Injection**
Used variable placeholders to inject user data (${spec.goal}, etc.) dynamically.

### 5. **Temperature Control**
Set temperature to 0.7 for task generation (balance between consistency and creativity).

---

## Development Timeline

| Phase | Focus | Prompts Used |
|-------|-------|---|
| 1. Planning | Architecture & Design | Prompts #1, #3, #6 |
| 2. Core Logic | LLM Integration | Prompts #2, #7 |
| 3. Frontend | Components & UX | Prompts #4, #5, #9 |
| 4. Polish | Export & Validation | Prompts #8, #10 |
| 5. Operations | Monitoring & Docs | Prompt #6 |

---

## Notes

- All prompts were iteratively refined based on implementation feedback
- Prompts #1-3 were foundational and set the architecture direction
- Prompts #4-5 handled data persistence and interaction patterns
- Prompts #6-10 addressed production concerns and UX polish
- No prompts included API keys, credentials, or sensitive configuration
- Temperature settings optimized for reliability over creativity in core generation
