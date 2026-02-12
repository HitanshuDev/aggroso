import { NextResponse } from "next/server";

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
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

  // API check (if this route responds, API is up)
  const apiStatus = true;
  const apiMessage = "API responding normally";

  // OpenAI check
  let openaiStatus = false;
  let openaiMessage = "Not configured";

  if (openaiKey) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      openaiStatus = response.ok;
      openaiMessage = response.ok ? "Connected" : `Error: ${response.status}`;
    } catch (error) {
      openaiStatus = false;
      openaiMessage =
        error instanceof Error && error.name === "AbortError"
          ? "Timeout"
          : "Connection failed";
    }
  }

  // Database check (since you're using localStorage client-side)
  const databaseStatus = true;
  const databaseMessage = "Client-side storage enabled";

  // Determine overall status
  const allHealthy = apiStatus && openaiStatus && databaseStatus;

  let overallStatus: "healthy" | "degraded" | "unhealthy";

  if (allHealthy) {
    overallStatus = "healthy";
  } else if (!openaiStatus) {
    overallStatus = "degraded";
  } else {
    overallStatus = "unhealthy";
  }

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
