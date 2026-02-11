import { FeatureSpec, Task } from '@/types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function generateTasks(spec: FeatureSpec): Promise<Task[]> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined');
  }

  const prompt = `You are a product manager and software engineer. Generate a comprehensive list of user stories and engineering tasks for the following feature:

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
- Engineering tasks (type: "task")
- Risks and unknowns (type: "risk")

Return ONLY valid JSON array, no markdown, no code blocks.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const tasks: Task[] = JSON.parse(content);

    // Add IDs to tasks
    return tasks.map((task, index) => ({
      ...task,
      id: `${Date.now()}-${index}`,
    }));
  } catch (error) {
    console.error('Error generating tasks:', error);
    throw error;
  }
}

// Fallback mock data for demonstration
export function generateTasksMock(spec: FeatureSpec): Task[] {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Create feature requirements document',
      description: 'Prepare detailed requirements based on goals and constraints',
      type: 'story',
      priority: 'high',
      category: 'Planning',
      status: 'todo',
    },
    {
      id: '2',
      title: 'Design UI mockups',
      description: 'Create wireframes and prototypes for the feature',
      type: 'task',
      priority: 'high',
      category: 'Design',
      status: 'todo',
    },
    {
      id: '3',
      title: 'Set up backend API',
      description: `Implement REST API endpoints for feature: ${spec.goal}`,
      type: 'task',
      priority: 'high',
      category: 'Backend',
      status: 'todo',
    },
    {
      id: '4',
      title: 'Implement frontend components',
      description: 'Build React components based on designs',
      type: 'task',
      priority: 'high',
      category: 'Frontend',
      status: 'todo',
    },
    {
      id: '5',
      title: 'User testing and validation',
      description: `Test with target users: ${spec.users}`,
      type: 'story',
      priority: 'medium',
      category: 'QA',
      status: 'todo',
    },
    {
      id: '6',
      title: 'Identify unknown dependencies',
      description: 'Evaluate constraints and potential blockers',
      type: 'risk',
      priority: 'medium',
      category: 'Risk',
      status: 'todo',
    },
  ];

  return mockTasks;
}
