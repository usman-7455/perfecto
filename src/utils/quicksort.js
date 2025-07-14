// Quicksort implementation for task sorting
// Uses partition and recursive sorting
// Returns sorted array in ascending order

const partition = (arr, low, high, compareFn) => {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (compareFn(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
};

const quicksort = (arr, low, high, compareFn) => {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, compareFn);
    quicksort(arr, low, pivotIndex - 1, compareFn);
    quicksort(arr, pivotIndex + 1, high, compareFn);
  }
};

export const sort = (arr, compareFn) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  
  const arrCopy = [...arr];
  quicksort(arrCopy, 0, arrCopy.length - 1, compareFn);
  return arrCopy;
}; 