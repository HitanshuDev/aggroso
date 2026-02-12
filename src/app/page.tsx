'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FeatureForm } from '@/components/FeatureForm';
import { TaskList } from '@/components/TaskList';
import { ExportPanel } from '@/components/ExportPanel';
import { HistoryPanel } from '@/components/HistoryPanel';
import { FeatureSpec, Task, GeneratedSpec } from '@/types';

export default function Home() {
  const [spec, setSpec] = useState<FeatureSpec | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<GeneratedSpec[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(true);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('taskGeneratorHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('taskGeneratorHistory', JSON.stringify(history.slice(0, 5)));
  }, [history]);

  const handleGenerateTasks = async (newSpec: FeatureSpec) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpec),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate tasks');
      }

      const data = await response.json();
      setSpec(newSpec);
      setTasks(data.tasks);
      setShowSteps(false);

      // Add to history
      const newSpecEntry: GeneratedSpec = {
        id: Date.now().toString(),
        spec: newSpec,
        tasks: data.tasks,
        createdAt: new Date().toISOString(),
        title: `${newSpec.goal.substring(0, 50)}...`,
      };
      setHistory([newSpecEntry, ...history.slice(0, 4)]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleTaskDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleReorderTasks = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
  };

  const handleLoadSpec = (item: GeneratedSpec) => {
    setSpec(item.spec);
    setTasks(item.tasks);
    setShowSteps(false);
  };

  const handleDeleteSpec = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Status Link */}
        <header className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Aggroso</h1>
              <p className="text-gray-600">AI-Powered Task Generator - Transform feature ideas into actionable tasks</p>
            </div>
            <Link
              href="/status"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 text-sm"
            >
              Status
            </Link>
          </div>
        </header>

        {/* Global Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold">Error generating tasks</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Step-by-Step Guide */}
        {showSteps && tasks.length === 0 && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use Aggroso</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Define Your Feature</h3>
                  <p className="text-gray-600 text-sm">
                    Describe your feature goal, target users, and constraints in the form on the left.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Generate Tasks</h3>
                  <p className="text-gray-600 text-sm">
                    Click "Generate" and AI will create user stories, engineering tasks, and identify risks.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Review & Export</h3>
                  <p className="text-gray-600 text-sm">
                    Edit tasks, update statuses, and export as JSON or Markdown for your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            <FeatureForm onSubmit={handleGenerateTasks} loading={loading} />
          </div>

          {/* Right Column - Tasks and Export */}
          <div className="lg:col-span-3 space-y-6">
            {tasks.length > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Generated Tasks ({tasks.length})</h2>
                  <button
                    onClick={() => {
                      setTasks([]);
                      setSpec(null);
                      setShowSteps(true);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700"
                  >
                    Clear
                  </button>
                </div>
                <TaskList
                  tasks={tasks}
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                  onReorder={handleReorderTasks}
                />
                <ExportPanel spec={spec} tasks={tasks} />
              </>
            )}

            {tasks.length === 0 && !showSteps && (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600 text-lg">Generating tasks...</p>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-8">
            <HistoryPanel history={history} onLoadSpec={handleLoadSpec} onDeleteSpec={handleDeleteSpec} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm border-t border-gray-300 pt-8">
          <p>Built with Next.js • Powered by OpenAI • <Link href="/status" className="text-blue-600 hover:text-blue-800">View System Status</Link></p>
        </footer>
      </div>
    </div>
  );
}
