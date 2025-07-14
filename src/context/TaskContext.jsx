import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../api/supabaseClient';
import { sortByCompletionAndPriority } from '../utils/prioritySort';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    console.log('fetchTasks called');
    setLoading(true);
    setError(null);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('User data in fetchTasks:', userData);

    if (userError || !userData.user) {
      setError('User not authenticated.');
      setTasks([]);
      setLoading(false);
      return;
    }

    const userId = userData.user.id;
    console.log('Fetching tasks for user:', userId);

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    console.log('Tasks fetched from Supabase:', data, 'Error:', error);

    if (error) {
      setError(error.message);
      setTasks([]);
    } else {
      const sortedTasks = sortByCompletionAndPriority(data);
      setTasks(sortedTasks);
      console.log('Tasks state updated with:', sortedTasks);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      fetchTasks();
    });

    // Cleanup on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchTasks]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, refreshTasks: fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
