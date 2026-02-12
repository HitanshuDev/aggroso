# Prompts Used for Development

This document records the AI prompts used during the development of Aggroso.

## Core Task Generation Prompt

**Purpose:** Generate user stories and engineering tasks from feature specifications

**Location:** `src/lib/taskGenerator.ts` (lines ~8-30)

**Prompt (Current):**
```
You are a product manager and software engineer. Generate a comprehensive 
list of user stories and engineering tasks for the following feature:

Goal: ${spec.goal}
Target Users: ${spec.users}
Constraints: ${spec.constraints}
${spec.template ? `Template: ${spec.template}` : ''}

Please return a JSON array with tasks following this structure exactly:
[
  {
    "title": "string (short title)",
    "description": "string (detailed description)",
    "type": "story|task|risk",
    "priority": "high|medium|low",
    "category": "string (like 'Frontend', 'Backend', 'Design', 'Infrastructure')",
    "status": "todo"
  }
]

Include:
- User stories (type: "story")
- Engineering/Implementation tasks (type: "task")
- Potential risks and mitigation tasks (type: "risk")
- Mix of high/medium/low priorities
- Proper categorization by area
```

**Context:** This is the main prompt used for the core functionality of generating tasks from feature specifications.

**Input Variables:**
- `spec.goal` - The feature goal/objective
- `spec.users` - Target users description
- `spec.constraints` - Constraints and limitations
- `spec.template` - Optional template type (Web App, Mobile App, etc.)

**Expected Output:** JSON array of task objects

---

## UI Component Prompts

The following UI components were built based on standard React patterns without specific AI prompts:
- FeatureForm component - standard form handling
- TaskList component - standard list rendering
- ExportPanel component - standard file export
- HistoryPanel component - standard history display
- TaskEditModal component - standard modal pattern

---

## API Endpoint Prompt (Health Check)

**Purpose:** Create a health check endpoint for system diagnostics

**Location:** `src/app/api/health/route.ts`

**Prompt Context:** Standard Next.js route handler pattern with error handling

---

## Future Prompt Experiments

### Potential improvements (not yet implemented):
1. "Generate 5 different variations of the task list and score them by completeness"
2. "Based on these tasks, identify dependencies and create a development timeline"
3. "Review these tasks and suggest additional edge cases or error scenarios"
4. "Estimate story points for each task based on complexity"

---

## Prompt Evolution

### Version 1.0 (Current)
- Focuses on structured output (JSON)
- Includes three task types: story, task, risk
- Requires specific categories
- Balances user stories with technical tasks

---

## Notes

- All prompts are engineered to produce valid JSON output for reliable parsing
- Prompts include explicit format specifications to reduce parsing errors
- Task generation uses temperature setting for consistency over creativity
