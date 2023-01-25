// MULTIPLE POINTERS
// creating "pointers" or values that correspond to an index or position and move towards the begining, end,
// or middle based on a certain condition.
// Very efficient for solving problems with minimal space complexity as well

// Write a function called sumZero which accepts a SORTED array of integers. The function should find the first
// pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does
// not exist
// sumZero([-3, -2, -1, 0, 1, 2, 3]) returns [-3, 3]
// sumZero([-2, 0, 1, 3]) returns undefined
// sumZero([1, 2, 3]) returns undefined

// Naive Solution with Time Complexity O(N^2) and space complexity O(1)
function sumZeroNaive(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i] + arr[j] === 0) {
                return [arr[i], arr[j]]
            }
        }
    }
}


// Refactored Solution with Time Complexity O(N) and Space Complexity O(1)
function sumZeroRefactored(arr) {
    let left = 0; // index of first element of array
    let right = arr.length - 1; // index of the last element of array
    while (left < right) { // while the left and right indices/pointers donot pass each other
        let sum = arr[left] + arr[right];
        if (sum === 0) {
            return [arr[left], arr[right]];
        }
        // if sum > 0, the element at right is too big and we should move to a smaller value in the sorted array
        else if (sum > 0) {
            right--;
        }
        // if sum < 0, then the value at left is too small and we should move to a bigger value in the sorted array
        else {
            left++;
        }
    }
    // if while loop ends and no pair with sum === 0 is found, then there is no return statement and 
    // hence, the function call takes "undefined" as value
}

console.log(sumZeroNaive([-4, -3, -2, -1, 0, 1, 2, 5]))
console.log(sumZeroRefactored([-4, -3, -2, -1, 0, 1, 2, 5]))


// countUniqueValues
// implement a function called "countUniqueValues" which accepts a SORTED array, and counts the unique values
// in the array. There can be negative numbers in the array, but it will be always sorted.
// countUniqueValues([1, 1, 1, 1, 1, 2]) returns 2
// countUniqueValues([1, 2, 3, 4, 4, 7, 7, 12, 12, 13]) returns 7
// countUniqueValues([]) returns 0
// countUniqueValues([-2, -1, -1, 0, 1]) returns 4
function countUniqueValues(arr) {
    let i = 0;
    if (arr.length === 0) {
        return 0;
    }
    else {
        for (let j = 1; j < arr.length; j++) {
            if (arr[i] !== arr[j]) {
                i++;
                arr[i] = arr[j]
            }
        }
    }
        return i + 1;
}


function test(arr) {
    let i = 0;
    if (arr.length === 0) {
        return 0;
    }
    else {
        let j = 0;
        while (arr[j+1]) {
            if (arr[i] !== arr[j+1]) {
                i++;
                arr[i] = arr[j];
                j++;
            }
            else {
                j++;
            }
        }
    }
    return i + 1;
}

console.log(test([1, 1, 1, 1, 1, 2]))
console.log(test([1, 2, 3, 4, 4, 7, 7, 12, 12, 13]))