'use client';

import { useState } from 'react';
import { FeatureSpec } from '@/types';

interface FeatureFormProps {
  onSubmit: (spec: FeatureSpec) => void;
  loading: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

export function FeatureForm({ onSubmit, loading }: FeatureFormProps) {
  const [goal, setGoal] = useState('');
  const [users, setUsers] = useState('');
  const [constraints, setConstraints] = useState('');
  const [template, setTemplate] = useState<string | undefined>('');
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const templates = ['Web App', 'Mobile App', 'Internal Tool', 'API Service'];

  const validateForm = (): ValidationError[] => {
    const formErrors: ValidationError[] = [];
    const minChars = 10;

    if (!goal.trim()) {
      formErrors.push({ field: 'goal', message: 'Feature goal is required' });
    } else if (goal.trim().length < minChars) {
      formErrors.push({ field: 'goal', message: `Feature goal must be at least ${minChars} characters` });
    }

    if (!users.trim()) {
      formErrors.push({ field: 'users', message: 'Target users description is required' });
    } else if (users.trim().length < minChars) {
      formErrors.push({ field: 'users', message: `Target users must be at least ${minChars} characters` });
    }

    if (!constraints.trim()) {
      formErrors.push({ field: 'constraints', message: 'Constraints are required' });
    } else if (constraints.trim().length < minChars) {
      formErrors.push({ field: 'constraints', message: `Constraints must be at least ${minChars} characters` });
    }

    return formErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
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

  const hasError = (fieldName: string): boolean => {
    return errors.some((e) => e.field === fieldName);
  };

  const getErrorMessage = (fieldName: string): string | undefined => {
    return errors.find((e) => e.field === fieldName)?.message;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md sticky top-8"
    >
      <h2 className="text-2xl font-bold text-gray-900">Create Feature Spec</h2>

      {/* Validation Errors Summary */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm font-semibold text-red-800 mb-2">
            Please fix the following:
          </p>
          <ul className="space-y-1">
            {errors.map((error) => (
              <li key={error.field} className="text-sm text-red-700">
                • {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="goal"
            className="block text-sm font-medium text-gray-700"
          >
            Feature Goal <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">{goal.length} / 500</span>
        </div>
        <textarea
          id="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value.slice(0, 500));
            setErrors(errors.filter((e) => e.field !== "goal"));
          }}
          placeholder="e.g., Allow users to upload and share photos with real-time collaboration"
          className={`w-full px-4 text-gray-600 py-2 border placeholder-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
            hasError("goal")
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300"
          }`}
          rows={3}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="users"
            className="block text-sm font-medium text-gray-700"
          >
            Target Users <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">{users.length} / 500</span>
        </div>
        <textarea
          id="users"
          value={users}
          onChange={(e) => {
            setUsers(e.target.value.slice(0, 500));
            setErrors(errors.filter((e) => e.field !== "users"));
          }}
          placeholder="e.g., Professional photographers, creative teams, social media influencers"
          className={`w-full px-4 text-gray-600 py-2 placeholder-gray-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
            hasError("users")
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300"
          }`}
          rows={3}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="constraints"
            className="block text-sm font-medium text-gray-700"
          >
            Constraints & Requirements <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-gray-500">
            {constraints.length} / 500
          </span>
        </div>
        <textarea
          id="constraints"
          value={constraints}
          onChange={(e) => {
            setConstraints(e.target.value.slice(0, 500));
            setErrors(errors.filter((e) => e.field !== "constraints"));
          }}
          placeholder="e.g., Must be compatible with iOS/Android, support 100MB files, work offline"
          className={`w-full px-4 py-2 text-gray-600 placeholder-gray-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
            hasError("constraints")
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300"
          }`}
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
          className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a template...</option>
          {templates.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {loading ? "⏳ Generating Tasks..." : "✨ Generate Tasks"}
      </button>
    </form>
  );
}
