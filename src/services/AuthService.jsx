// src/services/AuthService.js
import * as authApi from "../api/authApi";

export const registerUser = async (email, password) => {
  const { data, error } = await authApi.signUp(email, password);
  if (error) throw error;
  return data;
};

export const loginUser = async (email, password) => {
  const { data, error } = await authApi.signIn(email, password);
  if (error) throw error;
  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await authApi.getUser();
  if (error) throw error;
  return data.user;
};

export const logoutUser = async () => {
  const { error } = await authApi.signOut();
  if (error) throw error;
};
