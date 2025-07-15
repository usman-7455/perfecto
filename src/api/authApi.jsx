// src/api/authApi.js
import { supabase } from "./supabaseClient";

export const signUp = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const signIn = async (email, password) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getUser = async () => {
  return await supabase.auth.getUser();
};

export const getAllUserEmails = async () => {
  const { data, error } = await supabase.from('users_index').select('email');
  if (error) throw error;
  return data.map(user => user.email);
};

export const getUserIdByEmail = async (email) => {
  const { data, error } = await supabase.from('users_index').select('id').eq('email', email).single();
  if (error) throw error;
  return data?.id;
};
