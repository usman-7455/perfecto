import React from 'react';
import { useNavigate } from 'react-router-dom';
import './task.css';
import { useTasks } from '../../../context/TaskContext';
import { useTaskForm } from '../../../context/TaskFormContext';
import { useAuth } from '../../../context/AuthContext';
import { useMobileForm } from '../../../context/MobileFormContext';
import AddTaskButton from '../../AddTaskButton';
import TaskDone from '../../task_crud/task_done/task_done';
import ChangePriority from '../../task_crud/change_priority/change_priority';
import DeleteTask from '../../task_crud/delete_task/delete_task';
import EditTask from '../../task_crud/edit_task/edit_task';

const Task = () => {
  const { tasks, loading, error, refreshTasks } = useTasks();
  const { newTask, setNewTask, handleSubmit } = useTaskForm();
  const { user, loading: authLoading } = useAuth();
  const { showMobileForm, openMobileForm, closeMobileForm } = useMobileForm();
  const navigate = useNavigate();

  // Redirect to signin if user is not authenticated
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading) {
    return <div className="task-container"><p>Loading...</p></div>;
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  const handleFloatingButtonClick = () => {
    openMobileForm();
  };

  const handleMobileFormClose = () => {
    closeMobileForm();
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>
      
      {/* Desktop Task Creation Form */}
      <div className="task-create-bar">
        <form onSubmit={(e) => handleSubmit(e, refreshTasks)}>
          <div className="task-form">
            <input
              type="text"
              className="task-input"
              placeholder="Add a new task..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <div className="priority-radio-group">
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={newTask.priority === 'Low'}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={newTask.priority === 'Medium'}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={newTask.priority === 'High'}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                />
                High
              </label>
            </div>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Floating Action Button */}
      <button 
        className="floating-add-btn"
        onClick={handleFloatingButtonClick}
        aria-label="Add new task"
      >
        +
      </button>

      {/* Mobile Task Creation Modal */}
      {showMobileForm && (
        <div className="mobile-form-overlay" onClick={handleMobileFormClose}>
          <div className="mobile-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-form-header">
              <h3>Add New Task</h3>
              <button 
                className="mobile-form-close"
                onClick={handleMobileFormClose}
                aria-label="Close form"
              >
                ×
              </button>
            </div>
            <form onSubmit={(e) => {
              useTaskForm().handleSubmit(e, refreshTasks);
              handleMobileFormClose();
            }}>
              <div className="mobile-form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="mobile-form-group">
                <label>Priority</label>
                <div className="mobile-priority-buttons">
                  <button
                    type="button"
                    className={`mobile-priority-btn ${newTask.priority === 'Low' ? 'active' : ''}`}
                    onClick={() => setNewTask({ ...newTask, priority: 'Low' })}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    className={`mobile-priority-btn ${newTask.priority === 'Medium' ? 'active' : ''}`}
                    onClick={() => setNewTask({ ...newTask, priority: 'Medium' })}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`mobile-priority-btn ${newTask.priority === 'High' ? 'active' : ''}`}
                    onClick={() => setNewTask({ ...newTask, priority: 'High' })}
                  >
                    High
                  </button>
                </div>
              </div>
              <button type="submit" className="mobile-submit-btn">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      {error && <p className="task-error">{error}</p>}
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <div className="task-title">{task.title}</div>
                <div className="task-meta">
                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  {task.due_date && (
                    <span className="due-date">Due: {task.due_date}</span>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <TaskDone task={task} onTaskUpdate={refreshTasks} />
                <ChangePriority task={task} onTaskUpdate={refreshTasks} />
                <EditTask task={task} onTaskUpdate={refreshTasks} />
                <DeleteTask task={task} onTaskUpdate={refreshTasks} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Task;
