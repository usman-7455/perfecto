import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../api/supabaseClient';

const TaskFormContext = createContext();

export const TaskFormProvider = ({ children }) => {
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium' });

  const handleSubmit = async (e, refreshTasks) => {
    e.preventDefault(); // Prevent form reload
    debugger; // Pause execution for debugging
    console.log("handleSubmit called with newTask:", newTask);

    if (!newTask.title.trim()) {
      console.log('Task title is empty');
      alert('Task title cannot be empty');
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('User data:', userData, 'User error:', userError);

    if (userError || !userData.user) {
      console.error('User not authenticated');
      alert('User not authenticated');
      return;
    }

    const taskToAdd = {
      title: newTask.title.trim(),
      priority: newTask.priority,
      completed: false,
      user_id: userData.user.id,
    };

    console.log('Task to add:', taskToAdd);

    const { data, error } = await supabase.from('tasks').insert([taskToAdd]);
    console.log('Supabase response - data:', data, 'error:', error);

    if (error) {
      console.error('Error adding task:', error);
      alert('Error adding task: ' + error.message);
    } else {
      console.log('Task added successfully');
      setNewTask({ title: '', priority: 'Medium' });
      if (refreshTasks && typeof refreshTasks === 'function') {
        refreshTasks();
      }
    }
  };

  return (
    <TaskFormContext.Provider value={{ newTask, setNewTask, handleSubmit }}>
      {children}
    </TaskFormContext.Provider>
  );
};

export const useTaskForm = () => useContext(TaskFormContext); 