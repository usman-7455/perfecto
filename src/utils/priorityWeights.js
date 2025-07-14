// Priority weight constants and functions
// Defines weight values for sorting priorities
// Lower weight means higher priority

const PRIORITY_WEIGHTS = {
  'High': 1,
  'Medium': 2, 
  'Low': 3,
  'default': 4
};

export const getWeight = (priority) => {
  return PRIORITY_WEIGHTS[priority] || PRIORITY_WEIGHTS.default;
};

export const getWeights = () => {
  return PRIORITY_WEIGHTS;
}; 