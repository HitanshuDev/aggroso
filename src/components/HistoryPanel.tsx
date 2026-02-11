'use client';

import { GeneratedSpec, FeatureSpec, Task } from '@/types';

interface HistoryPanelProps {
  history: GeneratedSpec[];
  onLoadSpec: (spec: GeneratedSpec) => void;
  onDeleteSpec: (id: string) => void;
}

export function HistoryPanel({ history, onLoadSpec, onDeleteSpec }: HistoryPanelProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Specs (Last 5)</h2>
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.title || item.spec.goal}</h3>
                <p className="text-sm text-gray-600 truncate">{item.spec.goal}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                <p className="text-xs text-gray-500">{item.tasks.length} tasks</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onLoadSpec(item)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-700"
                >
                  Load
                </button>
                <button
                  onClick={() => onDeleteSpec(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
