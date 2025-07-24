import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';

interface TodoStatsProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export default function TodoStats({ totalTasks, completedTasks, pendingTasks }: TodoStatsProps) {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Target className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Done</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Clock className="text-orange-600 dark:text-orange-400" size={20} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingTasks}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          </div>
        </div>
      </div>

      {totalTasks > 0 && (
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}