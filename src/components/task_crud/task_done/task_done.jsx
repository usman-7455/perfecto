import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient';
import './task_done.css';

const TaskDone = ({ task, onTaskUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', task.id);

      if (error) {
        console.error('Error updating task:', error);
      } else {
        console.log('Task updated successfully');
        if (onTaskUpdate) {
          onTaskUpdate();
        }
      }
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      className={`task-done-btn ${task.completed ? 'completed' : ''}`}
      onClick={handleToggleComplete}
      disabled={isUpdating}
      title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
    >
      {isUpdating ? '...' : (task.completed ? '✓' : '○')}
    </button>
  );
};

export default TaskDone; 