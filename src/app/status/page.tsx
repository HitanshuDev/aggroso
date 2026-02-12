'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HealthCheck {
  status: boolean;
  message: string;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    api: HealthCheck;
    openai: HealthCheck;
    database: HealthCheck;
  };
}

export default function StatusPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/health');
      const data: HealthStatus = await response.json();
      setHealth(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(`Failed to fetch health status: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800';
  };

  const getStatusBadge = (status: 'healthy' | 'degraded' | 'unhealthy') => {
    const badges = {
      healthy: 'bg-green-100 text-green-800',
      degraded: 'bg-yellow-100 text-yellow-800',
      unhealthy: 'bg-red-100 text-red-800',
    };
    return badges[status] || badges.unhealthy;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-800 mb-4 text-sm font-medium"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">System Health Status</h1>
          <p className="text-gray-600">Real-time status of all system components</p>
        </div>

        {/* Main Status */}
        {health && (
          <div className={`rounded-lg border-2 p-6 mb-6 ${getStatusBadge(health.status)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-75">Overall Status</p>
                <p className="text-2xl font-bold capitalize mt-1">{health.status}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Last Updated</p>
                <p className="text-sm font-mono mt-1">
                  {new Date(health.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Fetching health status...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm font-medium">Error: {error}</p>
          </div>
        )}

        {/* Health Checks */}
        {health && !loading && (
          <div className="grid gap-4">
            {/* API Health */}
            <div className={`rounded-lg border-2 p-4 ${getStatusColor(health.checks.api.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${health.checks.api.status ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <div>
                    <p className="font-semibold text-sm">API Server</p>
                    <p className="text-xs opacity-75">{health.checks.api.message}</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {health.checks.api.status ? 'Operational' : 'Down'}
                </span>
              </div>
            </div>

            {/* OpenAI Connection */}
            <div className={`rounded-lg border-2 p-4 ${getStatusColor(health.checks.openai.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${health.checks.openai.status ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <div>
                    <p className="font-semibold text-sm">OpenAI Connection</p>
                    <p className="text-xs opacity-75">{health.checks.openai.message}</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {health.checks.openai.status ? 'Connected' : 'Failed'}
                </span>
              </div>
            </div>

            {/* Database */}
            <div className={`rounded-lg border-2 p-4 ${getStatusColor(health.checks.database.status)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${health.checks.database.status ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <div>
                    <p className="font-semibold text-sm">Local Storage</p>
                    <p className="text-xs opacity-75">{health.checks.database.message}</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {health.checks.database.status ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={fetchHealth}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Refreshing...' : 'Refresh Status'}
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300"
          >
            Return Home
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>ℹ️ Note:</strong> This page checks the health of:
            <ul className="list-inside list-disc mt-2 space-y-1 text-xs">
              <li>API Server - Whether this Next.js application is responding</li>
              <li>OpenAI Connection - Whether the OpenAI API key is valid and reachable</li>
              <li>Local Storage - Whether browser storage is available for data persistence</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}
