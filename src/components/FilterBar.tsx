import React from 'react';
import { Search, SortAsc, Moon, Sun } from 'lucide-react';
import { FilterType, SortType } from '../contexts/TodoContext';

interface FilterBarProps {
  filter: FilterType;
  sortBy: SortType;
  searchQuery: string;
  darkMode: boolean;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onSearchChange: (query: string) => void;
  onToggleDarkMode: () => void;
  todoCount: { all: number; pending: number; completed: number };
}

export default function FilterBar({
  filter,
  sortBy,
  searchQuery,
  darkMode,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onToggleDarkMode,
  todoCount,
}: FilterBarProps) {
  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: todoCount.all },
    { key: 'pending', label: 'Pending', count: todoCount.pending },
    { key: 'completed', label: 'Completed', count: todoCount.completed },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Dark Mode Toggle */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            aria-label="Search tasks"
          />
        </div>
        
        <button
          onClick={onToggleDarkMode}
          className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              filter === key
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            aria-label={`Show ${label.toLowerCase()} tasks`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <SortAsc className="text-gray-400" size={16} />
        <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Sort tasks by"
        >
          <option value="date">Date Created</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}