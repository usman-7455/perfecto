// Priority color and label utilities
// Provides colors and labels for task priorities
// Used for UI styling and display

const colorMap = {
  'High': '#e74c3c',
  'Medium': '#f39c12',
  'Low': '#27ae60'
};

const labelMap = {
  'High': '🔴 High Priority',
  'Medium': '🟡 Medium Priority', 
  'Low': '🟢 Low Priority'
};

export const getColor = (priority) => {
  return colorMap[priority] || '#95a5a6';
};

export const getLabel = (priority) => {
  return labelMap[priority] || priority;
}; 