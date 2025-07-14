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

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return <div className="task-container"><p>Loading...</p></div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="task-container">
      <h2>My Tasks</h2>

      <DesktopTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
        refreshTasks={refreshTasks}
      />

      <button 
        className="floating-add-btn"
        onClick={openMobileForm}
        aria-label="Add new task"
      >
        +
      </button>

      {showMobileForm && (
        <MobileTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          handleSubmit={handleSubmit}
          refreshTasks={refreshTasks}
          closeMobileForm={closeMobileForm}
        />
      )}

      {error && <p className="task-error">{error}</p>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} />
          ))}
        </ul>
      )}
    </div>
  );
};

const DesktopTaskForm = ({ newTask, setNewTask, handleSubmit, refreshTasks }) => (
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
          {['Low', 'Medium', 'High'].map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="priority"
                value={level}
                checked={newTask.priority === level}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              />
              {level}
            </label>
          ))}
        </div>
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </div>
    </form>
  </div>
);

const MobileTaskForm = ({ newTask, setNewTask, handleSubmit, refreshTasks, closeMobileForm }) => (
  <div className="mobile-form-overlay" onClick={closeMobileForm}>
    <div className="mobile-form-modal" onClick={(e) => e.stopPropagation()}>
      <div className="mobile-form-header">
        <h3>Add New Task</h3>
        <button
          className="mobile-form-close"
          onClick={closeMobileForm}
          aria-label="Close form"
        >
          ×
        </button>
      </div>
      <form onSubmit={(e) => {
        handleSubmit(e, refreshTasks);
        closeMobileForm();
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
            {['Low', 'Medium', 'High'].map((level) => (
              <button
                key={level}
                type="button"
                className={`mobile-priority-btn ${newTask.priority === level ? 'active' : ''}`}
                onClick={() => setNewTask({ ...newTask, priority: level })}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="mobile-submit-btn">
          Add Task
        </button>
      </form>
    </div>
  </div>
);

const TaskItem = ({ task, refreshTasks }) => (
  <li className={`task-item ${task.completed ? 'completed' : ''}`}>
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
);

export default Task;
