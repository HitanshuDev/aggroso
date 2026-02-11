'use client';

import { Task, FeatureSpec } from '@/types';

interface ExportPanelProps {
  spec: FeatureSpec | null;
  tasks: Task[];
}

export function ExportPanel({ spec, tasks }: ExportPanelProps) {
  if (!spec || tasks.length === 0) {
    return null;
  }

  const generateMarkdown = () => {
    let markdown = `# ${spec.goal}\n\n`;
    markdown += `## Feature Specification\n\n`;
    markdown += `**Goal:** ${spec.goal}\n\n`;
    markdown += `**Target Users:** ${spec.users}\n\n`;
    markdown += `**Constraints:** ${spec.constraints}\n\n`;
    if (spec.template) {
      markdown += `**Template:** ${spec.template}\n\n`;
    }

    markdown += `## Tasks\n\n`;

    const byCategory = tasks.reduce(
      (acc, task) => {
        if (!acc[task.category]) acc[task.category] = [];
        acc[task.category].push(task);
        return acc;
      },
      {} as Record<string, Task[]>
    );

    Object.entries(byCategory).forEach(([category, categoryTasks]) => {
      markdown += `### ${category}\n\n`;
      categoryTasks.forEach((task) => {
        markdown += `- **[${task.type.toUpperCase()}]** ${task.title} (${task.priority})\n`;
        markdown += `  - ${task.description}\n`;
        markdown += `  - Status: ${task.status}\n\n`;
      });
    });

    return markdown;
  };

  const generatePlainText = () => {
    let text = `${spec.goal}\n`;
    text += `${'='.repeat(spec.goal.length)}\n\n`;
    text += `Goal: ${spec.goal}\n`;
    text += `Target Users: ${spec.users}\n`;
    text += `Constraints: ${spec.constraints}\n`;
    if (spec.template) {
      text += `Template: ${spec.template}\n`;
    }
    text += `\n\nTASKS\n${'='.repeat(5)}\n\n`;

    const byCategory = tasks.reduce(
      (acc, task) => {
        if (!acc[task.category]) acc[task.category] = [];
        acc[task.category].push(task);
        return acc;
      },
      {} as Record<string, Task[]>
    );

    Object.entries(byCategory).forEach(([category, categoryTasks]) => {
      text += `\n${category}\n${'-'.repeat(category.length)}\n`;
      categoryTasks.forEach((task) => {
        text += `\n• ${task.title}\n`;
        text += `  Type: ${task.type}\n`;
        text += `  Priority: ${task.priority}\n`;
        text += `  Status: ${task.status}\n`;
        text += `  ${task.description}\n`;
      });
    });

    return text;
  };

  const handleCopy = (format: 'markdown' | 'text') => {
    const content = format === 'markdown' ? generateMarkdown() : generatePlainText();
    navigator.clipboard.writeText(content);
    alert(`${format === 'markdown' ? 'Markdown' : 'Text'} copied to clipboard!`);
  };

  const handleDownload = (format: 'markdown' | 'text') => {
    const content = format === 'markdown' ? generateMarkdown() : generatePlainText();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `task-spec-${Date.now()}.${format === 'markdown' ? 'md' : 'txt'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Export Options</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleCopy('markdown')}
          className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Copy Markdown
        </button>
        <button
          onClick={() => handleCopy('text')}
          className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Copy Text
        </button>
        <button
          onClick={() => handleDownload('markdown')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Download MD
        </button>
        <button
          onClick={() => handleDownload('text')}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Download TXT
        </button>
      </div>
    </div>
  );
}
