// src/services/TaskService.js
import * as taskApi from "../api/taskApi";

export const fetchUserTasks = async () => {
  const { data, error } = await taskApi.getAllTasks();
  if (error) throw error;
  return data;
};

export const createTask = async (title, userId) => {
  const task = {
    title,
    completed: false,
    user_id: userId,
  };
  const { data, error } = await taskApi.insertTask(task);
  if (error) throw error;
  return data;
};

export const completeTask = async (taskId, completed) => {
  const { data, error } = await taskApi.updateTask(taskId, { completed });
  if (error) throw error;
  return data;
};

export const removeTask = async (taskId) => {
  const { error } = await taskApi.deleteTask(taskId);
  if (error) throw error;
};
