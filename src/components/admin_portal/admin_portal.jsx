import React, { useState, useEffect } from "react";
import { getAllTasks } from "../../api/taskApi";
import { getAllUserEmails, getUserIdByEmail } from "../../api/authApi";
import EditTask from "../task_crud/edit_task/edit_task.jsx";
import DeleteTask from "../task_crud/delete_task/delete_task.jsx";
import ChangePriority from "../task_crud/change_priority/change_priority.jsx";
import TaskDone from "../task_crud/task_done/task_done.jsx";
import { useAuth } from '../../context/AuthContext';

const ADMIN_EMAIL = 'muhammadusmanarshad7455@gmail.com';

const AdminPortal = () => {
  const { user, loading } = useAuth();
  const [userEmails, setUserEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

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

  if (loading) return <div>Loading...</div>;
  if (!user || user.email !== ADMIN_EMAIL) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>Access Denied: You do not have permission to view this page.</div>;
  }

  return (
    <div className="admin-portal-container" style={{ maxWidth: 700, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 700, fontSize: 32, letterSpacing: 1 }}>Admin Portal</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <label htmlFor="user-email-select" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Select User Email:</label>
        <select id="user-email-select" value={selectedEmail} onChange={handleEmailChange} style={{ width: 350, padding: 10, borderRadius: 6, border: '1px solid #bbb', fontSize: 16, marginBottom: 0 }}>
          <option value="">-- Select Email --</option>
          {userEmails.map((email) => (
            <option key={email} value={email}>{email}</option>
          ))}
        </select>
      </div>
      {isLoadingTasks && <div style={{ marginTop: 16, textAlign: 'center' }}>Loading tasks...</div>}
      {error && <div style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</div>}
      <div className="admin-tasks-list" style={{ marginTop: 24 }}>
        {filteredTasks.map((task) => (
          <div key={task.id} className="admin-task-item" style={{ border: '1px solid #e0e0e0', borderRadius: 10, padding: 18, marginBottom: 28, background: '#f8fafc', boxShadow: '0 1px 4px rgba(44,62,80,0.04)' }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}><span style={{ color: '#1976d2' }}>Title:</span> {task.title}</div>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 12 }}><span style={{ color: '#1976d2' }}>Priority:</span> {task.priority}</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <EditTask task={task} onTaskUpdated={() => fetchTasksForEmail(selectedEmail)} />
              <DeleteTask taskId={task.id} onTaskDeleted={() => fetchTasksForEmail(selectedEmail)} />
              <ChangePriority task={task} onPriorityChanged={() => fetchTasksForEmail(selectedEmail)} />
              <TaskDone task={task} onTaskDone={() => fetchTasksForEmail(selectedEmail)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPortal; 