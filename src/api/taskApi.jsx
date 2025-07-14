// src/api/taskApi.js
import { supabase } from "./supabaseClient";

export const getAllTasks = async () => {
  return await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
};

export const insertTask = async (task) => {
  return await supabase.from("tasks").insert([task]);
};

export const updateTask = async (id, updates) => {
  return await supabase.from("tasks").update(updates).eq("id", id);
};

export const deleteTask = async (id) => {
  return await supabase.from("tasks").delete().eq("id", id);
};
