'use client';

import { useState, useEffect } from 'react';
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
        throw new Error('Failed to generate tasks');
      }

      const data = await response.json();
      setSpec(newSpec);
      setTasks(data.tasks);

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
  };

  const handleDeleteSpec = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Generator</h1>
          <p className="text-gray-600">Generate user stories and engineering tasks from feature ideas</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Error: {error}
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

            {tasks.length === 0 && !spec && (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600 text-lg">Fill out the form and generate tasks to get started</p>
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
      </div>
    </div>
  );
}
