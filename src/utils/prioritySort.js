// Priority sorting functions for tasks
// High priority tasks appear first
// Uses quicksort for efficient sorting

import { sort } from './quicksort.js';

const PRIORITY_WEIGHTS = {
  'High': 1,
  'Medium': 2, 
  'Low': 3,
  'default': 4
};

const compareByPriority = (taskA, taskB) => {
  const priorityA = PRIORITY_WEIGHTS[taskA.priority] || PRIORITY_WEIGHTS.default;
  const priorityB = PRIORITY_WEIGHTS[taskB.priority] || PRIORITY_WEIGHTS.default;
  
  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }
  
  const dateA = new Date(taskA.created_at || 0);
  const dateB = new Date(taskB.created_at || 0);
  return dateB - dateA;
};

const compareByCompletionAndPriority = (taskA, taskB) => {
  if (taskA.completed !== taskB.completed) {
    return taskA.completed ? 1 : -1;
  }
  
  const priorityA = PRIORITY_WEIGHTS[taskA.priority] || PRIORITY_WEIGHTS.default;
  const priorityB = PRIORITY_WEIGHTS[taskB.priority] || PRIORITY_WEIGHTS.default;
  
  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }
  
  const dateA = new Date(taskA.created_at || 0);
  const dateB = new Date(taskB.created_at || 0);
  return dateB - dateA;
};

export const sortByPriority = (tasks) => {
  return sort(tasks, compareByPriority);
};

export const sortByCompletionAndPriority = (tasks) => {
  return sort(tasks, compareByCompletionAndPriority);
}; 