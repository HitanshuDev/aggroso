import { NextRequest, NextResponse } from 'next/server';
import { generateTasks, generateTasksMock } from '@/lib/taskGenerator';
import { FeatureSpec, Task } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const spec: FeatureSpec = body;

    let tasks: Task[];

    // Try to use OpenAI API, fall back to mock if not configured
    try {
      tasks = await generateTasks(spec);
    } catch (error) {
      console.warn('OpenAI API not available, using mock data');
      tasks = generateTasksMock(spec);
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error('Error in generate-tasks:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate tasks',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
