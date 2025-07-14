import React, { useState } from 'react';
import { supabase } from '../../../api/supabaseClient';
import './change_priority.css';

const ChangePriority = ({ task, onTaskUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const priorities = ['Low', 'Medium', 'High'];

  const handlePriorityChange = async (newPriority) => {
    if (newPriority === task.priority) {
      setShowDropdown(false);
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ priority: newPriority })
        .eq('id', task.id);

      if (error) {
        console.error('Error updating priority:', error);
      } else {
        console.log('Priority updated successfully');
        if (onTaskUpdate) {
          onTaskUpdate();
        }
      }
    } catch (error) {
      console.error('Error updating priority:', error);
    } finally {
      setIsUpdating(false);
      setShowDropdown(false);
    }
  };

  return (
    <div className="priority-dropdown">
      <button
        className={`priority-btn priority-${task.priority?.toLowerCase()}`}
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isUpdating}
        title="Change priority"
      >
        {isUpdating ? '...' : task.priority}
      </button>
      {showDropdown && (
        <div className="priority-options">
          {priorities.map((priority) => (
            <button
              key={priority}
              className={`priority-option ${priority === task.priority ? 'active' : ''}`}
              onClick={() => handlePriorityChange(priority)}
            >
              {priority}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangePriority; 