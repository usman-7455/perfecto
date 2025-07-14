import React, { useState } from 'react';
import { useTaskForm } from '../context/TaskFormContext';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const AddTaskButton = () => {
  const { newTask, handleSubmit } = useTaskForm();
  const { user } = useAuth();
  const { refreshTasks } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to add tasks');
      return;
    }

    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);
    try {
      await handleSubmit(e, refreshTasks);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button 
      type="submit" 
      className="add-task-btn"
      onClick={handleClick}
      disabled={isSubmitting || !user}
    >
      {isSubmitting ? 'Adding...' : 'Add Task'}
    </button>
  );
};

export default AddTaskButton; 