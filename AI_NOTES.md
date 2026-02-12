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

### What Was NOT AI-Generated 🧠

The following components were developed without AI assistance:

1. **Project Architecture & Structure** - Designed based on Next.js best practices
2. **React Component Layout** - Custom Tailwind CSS styling and component hierarchy
3. **State Management** - React hooks implementation (useState, useEffect)
4. **Type Definitions** - TypeScript interfaces in `src/types/index.ts`
5. **UI/UX Design** - Form layout, task display, and interactive components
6. **Error Handling** - Input validation and error recovery logic
7. **LocalStorage Integration** - History persistence implementation
8. **Export Functionality** - CSV and JSON export logic
9. **Health Check System** - API endpoint for system diagnostics

### Prompts Used for Development

See `PROMPTS_USED.md` for specific prompts and their contexts.

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
