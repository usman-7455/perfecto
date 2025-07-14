import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient';
import './edit_task.css';

const EditTask = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editData.title.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: editData.title.trim()
        })
        .eq('id', task.id);

      if (error) {
        console.error('Error updating task:', error);
        alert('Error updating task: ' + error.message);
      } else {
        console.log('Task updated successfully');
        if (onTaskUpdate) {
          onTaskUpdate();
        }
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task: ' + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="edit-task-form">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="edit-title-input"
          placeholder="Task title"
        />
        <div className="edit-actions">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? '...' : 'Save'}
          </button>
          <button
            className="cancel-btn"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className="edit-task-btn"
      onClick={handleEdit}
      title="Edit task"
    >
      ✏️
    </button>
  );
};

export default EditTask; 