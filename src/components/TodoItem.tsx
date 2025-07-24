import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Todo } from '../contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, dueDate?: Date, priority?: 'low' | 'medium' | 'high') => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? format(todo.dueDate, 'yyyy-MM-dd') : ''
  );
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(
        todo.id,
        editText.trim(),
        editDueDate ? new Date(editDueDate) : undefined,
        editPriority
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditDueDate(todo.dueDate ? format(todo.dueDate, 'yyyy-MM-dd') : '');
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getDueDateStatus = (dueDate?: Date) => {
    if (!dueDate) return null;

    if (isPast(dueDate) && !isToday(dueDate)) {
      return { text: 'Overdue', color: 'text-red-500' };
    }
    if (isToday(dueDate)) {
      return { text: 'Due today', color: 'text-orange-500' };
    }
    if (isTomorrow(dueDate)) {
      return { text: 'Due tomorrow', color: 'text-blue-500' };
    }
    return { text: format(dueDate, 'MMM dd'), color: 'text-gray-500 dark:text-gray-400' };
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate);

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-all">
        <div className="space-y-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <Check size={14} />}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`text-gray-900 dark:text-white transition-all ${
              todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}
          >
            {todo.text}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority}
            </span>

            {dueDateStatus && (
              <div className={`flex items-center gap-1 text-xs ${dueDateStatus.color}`}>
                <Calendar size={12} />
                <span>{dueDateStatus.text}</span>
                {isPast(todo.dueDate!) && !isToday(todo.dueDate!) && <AlertCircle size={12} />}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Edit todo"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete todo"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
