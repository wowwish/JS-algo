// SLIDING WINDOW
// This pattern involves creating a "window" which can either be an array or number
// from one position to another. Depending on a certain condition, the "window" either
// increases or closes (and a new "window" is created).
// This is very useful to keep track of a subset of data in an array/string etc.


// Write a function called maxSubArraySum which accepts an array of integers and a number
// called "n". The function should calculate the maximum sum of "n" consecutive elements
// in the array.
// maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 2) returns 10
// maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 4) returns 17
// maxSubArraySum([4, 2, 1, 6], 1) returns 6
// maxSubArraySum([4, 2, 1, 6, 2], 4) returns 13
// maxSubArraySum([], 4) returns null

// A Naive Solution with ~ O(N^2) time complexity
function maxSubArraySumNaive(arr, num) {
    // handle edge case 
    if (num > arr.length) {
        return null;
    }
    let max = -Infinity;
    for (let i = 0; i < (arr.length - num + 1); i++) {
        let temp = 0;
        for (let j = i; j < i + num; j++) {
            temp += arr[j];
        }
        if (temp > max) {
            max = temp;
        }
    }
    return max;
}

// Refactored Solution with O(N) time complexity
function maxSubArraySumRefactored(arr, num) {
    let maxSum = 0;
    let tempSum = 0;
    // edge case handling
    if (arr.length < num) {
        return null;
    }
    // calculate the sum of the first "num" integers of the array (the "window" integers)
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    // now keep subtracting the first element from the window and add one new element to the end of the "window"
    tempSum = maxSum;
    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(tempSum, maxSum);
    }
    return maxSum;
}

console.log(maxSubArraySumNaive([2, 6, 9, 2, 1, 8, 5, 6, 3], 3));
console.log(maxSubArraySumRefactored([2, 6, 9, 2, 1, 8, 5, 6, 3], 3));