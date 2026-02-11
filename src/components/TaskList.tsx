'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { TaskEditModal } from './TaskEditModal';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (id: string) => void;
  onReorder: (tasks: Task[]) => void;
}

export function TaskList({ tasks, onTaskUpdate, onTaskDelete, onReorder }: TaskListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const byCategory = tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) acc[task.category] = [];
      acc[task.category].push(task);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = tasks.findIndex((t) => t.id === draggedId);
    const targetIndex = tasks.findIndex((t) => t.id === targetId);

    const newTasks = [...tasks];
    [newTasks[draggedIndex], newTasks[targetIndex]] = [
      newTasks[targetIndex],
      newTasks[draggedIndex],
    ];

    onReorder(newTasks);
    setDraggedId(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'story':
        return 'bg-blue-100 text-blue-800';
      case 'task':
        return 'bg-purple-100 text-purple-800';
      case 'risk':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditingTaskId(task.id);
  };

  const handleEditSave = (updatedTask: Task) => {
    onTaskUpdate(updatedTask);
    setEditingTaskId(null);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      {Object.entries(byCategory).map(([category, categoryTasks]) => (
        <div
          key={category}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
            <p className="text-sm text-gray-600">
              {categoryTasks.length} tasks
            </p>
          </div>
          <div className="divide-y">
            {categoryTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, task.id)}
                className="p-4 hover:bg-gray-50 cursor-move transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {task.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(task.type)}`}
                      >
                        {task.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      onTaskUpdate({
                        ...task,
                        status: e.target.value as
                          | "todo"
                          | "in-progress"
                          | "done",
                      })
                    }
                    className={`px-3 py-1 border rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 ${
                      task.status === "todo"
                        ? "bg-gray-100 text-gray-700 border-gray-300"
                        : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                          : "bg-green-100 text-green-700 border-green-300"
                    }`}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>

                  <button
                    onClick={() => handleEditClick(task)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm px-2 py-1 rounded hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onTaskDelete(task.id)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm px-2 py-1 rounded hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          isOpen={editingTaskId !== null}
          onClose={() => {
            setEditingTaskId(null);
            setEditingTask(null);
          }}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
