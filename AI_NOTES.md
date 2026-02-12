# AI Usage Notes

## Project Overview

Aggroso is an AI-powered task generation tool that helps product managers and engineers automatically create comprehensive user stories and engineering tasks from feature specifications.

## AI Integration Details

### LLM Provider: OpenAI
- **Model:** GPT-4 / GPT-4 Turbo (specified in API calls)
- **Why OpenAI?**
  - Industry-leading quality for technical content generation
  - Excellent at understanding product context and generating structured output
  - Reliable API with good documentation
  - Strong performance on JSON-formatted responses (required for task parsing)
  - Enterprise-grade reliability and availability

### What AI is Used For 🤖

1. **Task Generation from Feature Specs** (`src/lib/taskGenerator.ts`)
   - Takes feature goal, target users, and constraints
   - Generates structured user stories, engineering tasks, and risk identification
   - Creates prioritized, categorized tasks ready for implementation planning
   - **File:** `src/api/generate-tasks/route.ts` - API endpoint that calls OpenAI

### What Was AI-Generated 🤖

1. **Architecture & System Design** - Frontend-only backend structure with Next.js API routes
2. **LLM Prompt Engineering** - Core task generation prompt with structured output
3. **JSON Schema Design** - Data structures for user stories, tasks, and risks
4. **Drag-and-Drop Implementation** - Native HTML drag event handling logic
5. **Health Check Endpoint** - API route for system diagnostics and status monitoring
6. **Error Handling Patterns** - Structured error responses and input validation
7. **Markdown Export Logic** - Task-to-markdown conversion with proper formatting
8. **Input Validation UX** - Form validation patterns and inline error display
9. **Next.js Metadata/SEO** - Proper metadata configuration for SaaS app

### What Was NOT AI-Generated (Self-Implemented) 🧠

1. **Component-Level Styling** - Custom Tailwind CSS implementation and responsive design
2. **React State Management** - Custom hooks usage (useState, useEffect) patterns
3. **localStorage Implementation** - History persistence and JSON parsing logic
4. **UI/UX Polish** - Visual design, animations, and user experience refinements
5. **Testing & Debugging** - Manual testing and error troubleshooting
6. **Project Structure Organization** - File organization and folder hierarchy
7. **Documentation** - README, API docs, and code comments

### Prompts Used for Development

See `PROMPTS_USED.md` for the complete list of 10 AI prompts with detailed context and explanations.

## Cost Considerations

- **Per request cost:** Varies based on token usage
  - Input tokens: ~200-500 typical
  - Output tokens: ~300-800 typical
  - Estimated cost per generation: $0.01-0.05 USD
- **No rate limiting:** Current implementation has no request throttling
- **Recommended:** Monitor usage and implement quota limits for production

## Known AI Limitations

1. **Output Parsing** - Task generation relies on JSON parsing; malformed responses can cause errors
2. **Context Length** - Very complex specs may hit token limits
3. **Consistency** - Multiple requests for same spec may produce different outputs
4. **Technical Depth** - Generated tasks are general; may need refinement for specialized domains
5. **No Real-time Learning** - Doesn't learn from user feedback

## Future AI Enhancement Opportunities

1. **Fine-tuned Models** - Custom training on your historical tasks for better quality
2. **Multi-model Support** - Add Claude, Gemini, or open-source alternatives
3. **Prompt Optimization** - A/B test different prompt templates
4. **Few-shot Learning** - Provide examples of good tasks for better outputs
5. **Feedback Loop** - Track which generated tasks are useful/modified most
6. **Cost Optimization** - Switch to cheaper models for simple specs
