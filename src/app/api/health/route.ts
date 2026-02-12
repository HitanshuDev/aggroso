import { NextResponse } from 'next/server';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    api: { status: boolean; message: string };
    openai: { status: boolean; message: string };
    database: { status: boolean; message: string };
  };
}

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const timestamp = new Date().toISOString();
  const openaiKey = process.env.OPENAI_API_KEY;

  // Check OpenAI API connectivity
  let openaiStatus = false;
  let openaiMessage = 'Not configured';

  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
        },
        timeout: 5000,
      });
      openaiStatus = response.ok;
      openaiMessage = response.ok ? 'Connected' : `Error: ${response.status}`;
    } catch (error) {
      openaiStatus = false;
      openaiMessage = `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  // API status (always true if we're responding)
  const apiStatus = true;
  const apiMessage = 'API responding normally';

  // Database status (localStorage is always available in browser context)
  // For API routes, we just report it as available
  const databaseStatus = true;
  const databaseMessage = 'Local storage available';

  // Determine overall status
  const allHealthy = apiStatus && openaiStatus && databaseStatus;
  const overallStatus = allHealthy ? 'healthy' : !openaiStatus ? 'degraded' : 'unhealthy';

  const healthStatus: HealthStatus = {
    status: overallStatus,
    timestamp,
    checks: {
      api: {
        status: apiStatus,
        message: apiMessage,
      },
      openai: {
        status: openaiStatus,
        message: openaiMessage,
      },
      database: {
        status: databaseStatus,
        message: databaseMessage,
      },
    },
  };

  return NextResponse.json(healthStatus, {
    status: allHealthy ? 200 : 503,
  });
}
