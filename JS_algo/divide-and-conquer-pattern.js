// DIVIDE AND CONQUER
// This pattern involves dividing a dataset into smaller chunks and then repeating a 
// process with a subset of data. This pattern can trememdously decrease time complexity.

// AN EXAMPLE:
// Given a SORTED array of integers, write a function called "search", that accepts a 
// value and returns the index where the value passed to the function is located. If
// the value is not found, return -1.
// search([1, 2, 3, 4, 5, 6], 4) returns 3
// search([1, 2, 3, 4, 5, 6], 6) returns 5
// search([1, 2, 3, 4, 5, 6], 11) returns -1

// A Naive Solution with O(N) Time Complexity (Linear Search)
function search(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i;
        }
    }
    return -1;
}

// Refactored Solution with Time Complexity of O(logN) (Binary Search)
function search(arr, val) {
    let min = 0;
    let max = arr.length - 1;
    while (min < max) {
        // pick the middle point
        let middle = Math.floor((min + max) / 2);
        let currentElement = array[middle];
        if (arr[middle] == val) {
            return middle;
        }
        // with the second iteration, we skip half of the array length since the array is SORTED
        // with subsequent iterations, we skip lesser and lesser array lengths.
        else if (arr[middle] < val) {
            max = middle - 1;
        }
        else if (arr[middle] > val) {
            min = middle + 1;
        }
    }
    // If while loop is exited without finding val in the array
    return -1;
}