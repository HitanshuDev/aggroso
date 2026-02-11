'use client';

import { useState } from 'react';
import { FeatureSpec } from '@/types';

interface FeatureFormProps {
  onSubmit: (spec: FeatureSpec) => void;
  loading: boolean;
}

export function FeatureForm({ onSubmit, loading }: FeatureFormProps) {
  const [goal, setGoal] = useState('');
  const [users, setUsers] = useState('');
  const [constraints, setConstraints] = useState('');
  const [template, setTemplate] = useState<string | undefined>('');

  const templates = ['Web App', 'Mobile App', 'Internal Tool', 'API Service'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !users.trim() || !constraints.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({
      goal: goal.trim(),
      users: users.trim(),
      constraints: constraints.trim(),
      template: template || undefined,
    });
    setGoal('');
    setUsers('');
    setConstraints('');
    setTemplate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-900">Create Feature Spec</h2>

      <div>
        <label
          htmlFor="goal"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Feature Goal <span className="text-red-500">*</span>
        </label>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Allow users to upload and share photos with real-time collaboration"
          className="w-full px-4 py-2 border placeholder-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div>
        <label
          htmlFor="users"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Target Users <span className="text-red-500">*</span>
        </label>
        <textarea
          id="users"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
          placeholder="e.g., Professional photographers, creative teams, social media influencers"
          className="w-full px-4 py-2 placeholder-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div>
        <label
          htmlFor="constraints"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Constraints & Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          id="constraints"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="e.g., Must be compatible with iOS/Android, support 100MB files, work offline"
          className="w-full px-4 py-2 placeholder-gray-300 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div>
        <label
          htmlFor="template"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Template (Optional)
        </label>
        <select
          id="template"
          value={template}
          onChange={(e) => setTemplate(e.target.value || undefined)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="" className="text-gray-400">
            Choose a template...
          </option>
          {templates.map((t) => (
            <option key={t} value={t} className="text-gray-400">
              {t}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? "Generating Tasks..." : "Generate Tasks"}
      </button>
    </form>
  );
}
