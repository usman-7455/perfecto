import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient';
import './delete_task.css';

const DeleteTask = ({ task, onTaskUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id);

      if (error) {
        console.error('Error deleting task:', error);
      } else {
        console.log('Task deleted successfully');
        if (onTaskUpdate) {
          onTaskUpdate();
        }
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="delete-task-container">
      {!showConfirm ? (
        <button
          className="delete-task-btn"
          onClick={() => setShowConfirm(true)}
          disabled={isDeleting}
          title="Delete task"
        >
          🗑️
        </button>
      ) : (
        <div className="delete-confirm">
          <button
            className="confirm-delete-btn"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? '...' : '✓'}
          </button>
          <button
            className="cancel-delete-btn"
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteTask; 