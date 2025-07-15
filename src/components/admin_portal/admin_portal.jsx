import React, { useState, useEffect } from "react";
import { getAllTasks, insertTask } from "../../api/taskApi";
import { getAllUserEmails, getUserIdByEmail } from "../../api/authApi";
import EditTask from "../task_crud/edit_task/edit_task.jsx";
import DeleteTask from "../task_crud/delete_task/delete_task.jsx";
import ChangePriority from "../task_crud/change_priority/change_priority.jsx";
import TaskDone from "../task_crud/task_done/task_done.jsx";
import { useAuth } from '../../context/AuthContext';
import './admin_portal.css';
const ADMIN_EMAIL = 'muhammadusmanarshad7455@gmail.com';

const AdminPortal = () => {
  const { user, loading } = useAuth();
  const [userEmails, setUserEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [addError, setAddError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUserEmails();
  }, []);

  useEffect(() => {
    if (selectedEmail) {
      fetchTasksForEmail(selectedEmail);
    } else {
      setFilteredTasks([]);
      setError("");
    }
    // eslint-disable-next-line
  }, [selectedEmail]);

  const fetchUserEmails = async () => {
    try {
      const emails = await getAllUserEmails();
      setUserEmails(emails);
    } catch (error) {
      setUserEmails([]);
    }
  };

  const fetchTasksForEmail = async (email) => {
    setError("");
    setFilteredTasks([]);
    setIsLoadingTasks(true);
    try {
      const userId = await getUserIdByEmail(email);
      if (!userId) {
        setError("No user found with this email.");
        setIsLoadingTasks(false);
        return;
      }
      const { data: allTasks } = await getAllTasks();
      const userTasks = (allTasks || []).filter((task) => task.user_id === userId);
      setFilteredTasks(userTasks);
      if (userTasks.length === 0) {
        setError("No tasks found for this user.");
      }
    } catch (err) {
      setError("No user found with this email.");
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const refreshTasks = () => {
    if (selectedEmail) {
      setTimeout(() => fetchTasksForEmail(selectedEmail), 200);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setAddError("");
    if (!selectedEmail) {
      setAddError("Please select a user first.");
      return;
    }
    if (!newTaskTitle.trim()) {
      setAddError("Task title cannot be empty.");
      return;
    }
    setIsAdding(true);
    try {
      const userId = await getUserIdByEmail(selectedEmail);
      if (!userId) {
        setAddError("User not found.");
        setIsAdding(false);
        return;
      }
      await insertTask({
        title: newTaskTitle.trim(),
        priority: newTaskPriority,
        completed: false,
        user_id: userId,
      });
      setNewTaskTitle("");
      setNewTaskPriority("Medium");
      refreshTasks();
    } catch (err) {
      setAddError("Failed to add task.");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user || user.email !== ADMIN_EMAIL) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>Access Denied: You do not have permission to view this page.</div>;
  }

  return (
    <div className="admin-portal-container">
      <div className="admin-portal-notice">
        For visible changes on tasks, please reload the page because the database takes time to update.
      </div>
      <h2 className="admin-portal-title">Admin Portal</h2>
      <div className="admin-portal-email-row">
        <label htmlFor="user-email-select" className="admin-portal-email-label">Select User Email:</label>
        <select id="user-email-select" value={selectedEmail} onChange={handleEmailChange}>
          <option value="">-- Select Email --</option>
          {userEmails.map((email) => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select>
      </div>
      {isLoadingTasks && <div className="admin-portal-loading">Loading tasks...</div>}
      {error && <div className="admin-portal-error">{error}</div>}
      <form className="admin-add-task-form" onSubmit={handleAddTask}>
        <input
          className="admin-add-task-input"
          type="text"
          placeholder="Task title..."
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          disabled={!selectedEmail || isAdding}
        />
        <select
          className="admin-add-task-priority"
          value={newTaskPriority}
          onChange={e => setNewTaskPriority(e.target.value)}
          disabled={!selectedEmail || isAdding}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button className="admin-add-task-btn" type="submit" disabled={!selectedEmail || isAdding}>
          {isAdding ? "Adding..." : "Add Task"}
        </button>
      </form>
      {addError && <div className="admin-portal-error">{addError}</div>}
      <div className="admin-tasks-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="admin-task-item">
            <div className="admin-task-title"><span>Title:</span> {task.title}</div>
            <div className="admin-task-priority"><span>Priority:</span> {task.priority}</div>
            <div className="admin-task-actions">
              <EditTask task={task} onTaskUpdated={refreshTasks} />
              <DeleteTask task={task} onTaskUpdate={refreshTasks} />
              <ChangePriority task={task} onPriorityChanged={refreshTasks} />
              <TaskDone task={task} onTaskDone={refreshTasks} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortal; 