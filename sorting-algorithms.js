// SORTING SMALL ARRAYS:-

// Sorting is the process of rearranging the items in a collection (like an array) so that the items
// are in some kind of order (like smallest to largest numbers).

// Sorting is an incredibly common task. There are many different algorithms to sort things, and 
// different techniques have their own advantages and disadvantages.

// The Default Array.sort() method of JavaScript sorts the elements of an array "in place" 
// and returns the reference to the same array, now sorted. The default sort order is ascending, 
// built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
// The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.
// This built-in sort method accepts an optional comparator function that can be used to dictate the
// way to sort elements. This comparator function takes two elements as arguments and the return value
// determines the sort order. 

// comparator of elements (a and b): if it returns a negative number, a should come before b. if it returns
// a positive number, a should come after b. If it returns 0, a and b are the same as far as the sort is
// concerned.

// Examples:

/*
// comparators
function numberCompare(num1, num2) {
    return num1 - num2
}
function compareByLen(str1, str2) {
    return str1.length - str2.length
}

// sorting
console.log([6, 4, 15, 10].sort(numberCompare));
console.log(["Steele", "Colt", "Data Structures", "Algorithms"].sort(compareByLen));
*/



// 1. BUBBLE SORT - SORTS IN-PLACE

// A sorting algorithm where the largest values bubble up to the top one at a time!
// compare first and second element of array and if first elem > second elem, swap them. keep comparing
// and swapping pairs of elements such that the largest value ends up at the end of the array in the
// first pass through the array. The next pass will only compare (array.length - 1) elements.
// The larger values in the array accumulate at the end of the array (in-place) with each iteration.
// There are two ways to perform the swapping of two numbers:

// BUBBLE SORT TIME COMPLEXITY = O(N^2)
// BUBBLE SORT SPACE COMPLEXITY = O(1)

/*
// ES5 syntax
function swap(arr, idx1, idx2) {
    vat temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

// ES2015 syntax
const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}
*/

// Pseudocode of Bubble sort:
// * start looping from the end of the array towards the begining. 
// * start an inner loop from the begining to (i - 1). 
// * if arr[j] > arr[j + 1] swap those two values.


// bubble sort implementation
function bubbleSort(arr) {
    let temp = 0; // used for swapping two elements
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) { // comparison of two elements
                // SWAP!
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}


// optimized bubble sort implementation for data that is almost sorted
// check if any swaps happened with each iteration and break out of the loop as soon as
// there are no swaps in a particular iteration to prevent subsequent iterations.
function bubbleSortOptim(arr) {
    let temp = 0; // used for swapping two elements
    for (let i = arr.length - 1; i >= 0; i--) {
        let noSwaps = true; // check for any swaps happening in this iteration
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) { // comparison of two elements
                // SWAP!
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                noSwaps = false;
            }
        }
        if (noSwaps) break; // break out of the main loop if there are no swaps happening
    }
    return arr;
}


console.log(bubbleSortOptim([8, 1, 2, 3, 4, 5, 6, 7]));



// 2. SELECTION SORT - ANOTHER IN-PLACE SORTING ALGORITHM

// SELECTION SORT TIME COMPLEXITY = O(N^2)
// SELECTION SORT SPACE COMPLEXITY = O(1)

// This sorting algorithm is similar to bubble sort, but instead of first placing large values into the
// sorted position, it places small values into sorted position. We keep track of the index of the next
// minimum/smallest value in the array with every i'th iteration and at the end of each iteration, we swap the 
// minimum/smallest value found in the (i - j) elements of the array with the i'th element of the array. 

// Selection Sort is not suitable for Nearly Sotred Data.

// Pseudocode of selection sort:
// * store the first element index of the input array (i) as the smallest value seen so far with
// each iteration. This first element index will shift towards the end of the array by 1 
// with each iteration.
// * compare the item at this index, to the next item in the array until you find a smaller number.
// * if a smaller number is found, designate the index of the smaller number to be the new 
// "minimum index" and continue until the end of the array.
// if the "minimum index" is not the value you initially began with, swap the two values.


function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for(j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                newMin = true;
            }
        }
        if (i !== minIdx) { // check to see if new minimum idx was found in the j loop
            // SWAP - ES2015 WAY!
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }   
    }
    return arr;
}

console.log(selectionSort([8, 6, 1, 2, 5, 3, 4, 7]));




// 3. INSERTION SORT - YET ANOTHER IN-PLACE SORTING ALGORITHM
// INSERTION SORT IS SUITABLE FOR CONTINUOUS / STREAMING DATA.

// TIME COMPLEXITY OF INSERTION SORT = O(N^2)
// SPACE COMPLEXITY OF INSERTION SORT = O(1)

// Insertion sort algorithm builds up the sort by gradually creating a larger left half
// (or a portion of the array) which is always sorted.

// Pseudocode for Insertion Sort:
// * start by picking the second element of the array (the first element is considered to be
// the sorted portion).
// * now compare the second element with the one before it and swap if necessary.
// * continue to the next element and if it is in the incorrect order, iterate through the sorted
// portion (ie, the left side) to place the element in the correct place.
// * Repeat until the array is sorted.


function insertionSort(arr) {
    // assume that the sorted portion of the array is the left end of the array and
    // contains only the first element arr[0].
    // last index of the sorted portion (left end of the array with only the first element)
    for (let i = 1; i < arr.length; i++) {
        // preserve arr[i] as it will be overwrittern in the j loop.
        let currentVal = arr[i];
        // Here, the sorted portion is in ascending order. So, with every iteration, we check
        // if the element at i is smaller than the end element of the sorted portion (i - 1).
        // If ith element is smaller than end of sorted portion, loop through the sorted portion
        // in reverse (j loop) and insert the ith element to its corresponding index in the sorted
        // portion, by expanding the sorted portion and shifting the elements of sorted portion > ith
        // element by one index to the right.
        if (arr[i] < arr[i - 1]) { // if the ith element cannot be concatenated to the sorted portion
            // Move through the sorted portion in reverse, check if the current jth element in sorted
            // portion is greater than the ith element of the array and if so, set arr[j+1] to arr[j].
            // Throught the j loop, this ends up shifting all elements of the sorted portion to the right
            // by one index and the final jth element > arr[i] will be duplicated at arr[j+1] and arr[j].
            // We can then finally set arr[j] to arr[i], thereby inserting arrr[i] to its corresponding
            // location in the sorted portion.
            // Here, j is declared as var, becuase it has to be accessed outside its for loop.
            for (var j = i - 1; j >= 0; j--) {
                if(arr[j] > currentVal) {
                    // shifting elements of sorted portion > arr[i] by one index to the right
                    arr[j+1] = arr[j]; 
                }
                else break; // if jth element is not > currentVal, simply break out of the j loop.
            }
            // finally set the i'th element to its corresponding position in the sorted portion
            // before the i'th iteration ends
            arr[j+1] = currentVal;
        }
        else continue;
    }
    return arr;
}

console.log(insertionSort([8, 6, 1, 2, 5, 3, 4, 7]));




// SCALABLE AND FASTER SORTING ALGORITHMS:-

// The sorting algorithms we discussed so far are of quadratic time complexity and do not scale
// well for larer datasets. But they had constant space complexity due to their in-place sorting nature.
// For example, check the runtime of the following code:

// let data = Array.apply(null, {length: 100000}).map(function.call, Math.random)
// bubbleSortOptim(data);

// Here, we discuss sorting algoritms that are scalable and take lesser time to run, with some auxilliary
// space complexity.




// 1. MERGE SORT

// TIME COMPLEXITY OF MERGE SORT = O(N * logN) - O(logN) for decomposition and O(N) comparisons per 
// merge() call or per decomposition step.
// SPACE COMPLEXITY OF MERGE SORT = O(logN) due to logN recursion call stack entries. This call stack
// space due to recursion is used up in merge sort as well, but merge sort creates an auxilliary array
// which is the same size as the input array (N) which is greater in magnitude than logN.

// Merge Sort is a data type agnostic sorting algorithm!

// Merge Sort is a combination of two things - Merging and Sorting. It involves splitting up the array,
// sorting the pieces and merging the pieces together. It exploits the fact that arrays with 0 or 1
// elements are always sorted. It is based on the "divide and conquer" approach.

// In order to implement Merge Sort, it is useful to first implement a function responsible for merging
// two sorted arrays. Given two sorted arrays, this helper function should create a new array
// which is also sorted, and consists of all the elements in the two input arrays. This function should
// run in O(N + M) time and O(N + M) space and should not modify the parameters passed to it.

// Pseudocode for Merge Sort - Merging two Sorted Arrays:
// * Create an empty result array and look at the smallest value at each index in each of input array.
// * While there are still values we have'nt looked at:
//      * if first array value < second array value, push first array value to the result array
//        and move to the next value in the first array. Else if second array value < first array value,
//        push the value in the second array into our result array and move to the next value in the
//        second array.
//      * Once all the values of one of the input arrays is exhausted, push all the remaining values of the
//        other input array also into the result array.

function merge(arr1, arr2) {
    let res = [];
    let i = 0; // index for first input array
    let j = 0; // index for second input array
    while((i < arr1.length) && (j < arr2.length)) {
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i]);
            i++;
        }
        else if (arr1[i] > arr2[j]) {
            res.push(arr2[j]);
            j++;
        }
    }
    // handle cases where one input array is exhausted, but the other input
    // array still has elements
    while (i < arr1.length) {
        res.push(arr1[i]);
        i++;
    }
    while (j < arr2.length) {
        res.push(arr2[j]);
        j++;
    }
    return res;
}


// mergeSort Pseudocode:
// * Break up the input array into halves recursively, until you have arrays that are empty 
//   or have one element.
// * Once you have smaller sorted arrays, merge those arrays with other sorted arrays until you
//   are back at the full length of the array.
// * Once the array has been merged back together, return the merged (and sorted) array.

function mergeSort (arr) {
    // base-case or termination condition of the recursive mergeSort function
    if (arr.length <= 1) {
        return arr;
    }
    else {
        let mid = Math.floor(arr.length/2); // the approximate middle index of the input array
        // Divide and Conquer approach - splitting the array to sorted components and the merging back
        // Making use of the power of Recursion!
        // check the callstack ondebug mode to see the mergeSort magic.
        return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
    }
}

console.log(mergeSort([2, 4, 1, 99, 56, 76, 14, 101, 26]));




// 2. QUICK SORT

// BEST CASE TIME COMPLEXITY OF QUICK SORT = O(N * logN) - logN for decompositions into single element arrays
// and the pivoting helper function does O(N) comparisons at every decomposition step.
// IN THE WORST CASE SCENARIO, THE FIRST OR LAST ELEMENT IS TAKEN AS THE PIVOT AND ALL ELEMENTS ARE ALREADY 
// SORTED. THIS LEADS TO O(N) DECOMPOSITION STEPS (since the array is already sorted, there will be no elements
// to the left of the pivot if the first element is taken as pivot and hence, the left sub-array will always be 
// empty. Similarly, the right sub-array will always be empty when the input array is already sorted and 
// the last element is taken as the pivot) AND O(N) COMPARISONS MAKING THE TIME COMPLEXITY O(N^2). 
// HENCE, IT IS ADVISABLE TO PICK A RANDOM PIVOT OR THE MEDIAN ELEMENT OF THE ARRAY AS THE PIVOT.

// Quick Sort also exploits the fact that arrays of 0 or 1 elements are always sorted. Works by selecting
// one element called the "pivot" and finding the index where the pivot should end up in the sorted array.
// We achieve this by moving all elements lower than the pivot to the left of the pivot and all elements
// higher than the pivot to the right of the pivot (for ascending sort). Once the pivot is positioned
// appropriately, quick sort can be applied recursively to the sub-arrays on either side of the pivot.



// *   In order to implement Quick Sort, it's useful to first implement a function responsible for
//     arranging elements in an array on either side of a pivot.
// *   Given an array, this helper function should designate an element as the pivot. It should
//     then rearrange elements in the array so that all values less than the pivot are moved
//     to the left of the pivot and all values greater than the pivot are moved to the right of the
//     pivot.
// *   The order of elements on either side of the pivot does'nt matter! The helper should do this
//     in-place, ie, it should not create a new array.
// *   The runtime of this pivot helper function depends in part on how one selects the pivot. Ideally,
//     the pivot should be chosen so that it's roughly the MEDIAN value in the data set you're sorting.
// *   For simplicity, we will always choose the first element as the pivot (This has consequences
//     on the big O complexity).

// Pivot Helper Example:
// let arr = [5, 2, 1, 8, 4, 7, 6, 3]
// pivot(arr) should return 4
// arr can be any one of these acceptable mutations:
// [2, 1, 4, 3, 5, 8, 7, 6]
// [1, 4, 3, 2, 5, 7, 6, 8]
// [3, 2, 1, 4, 5, 7, 6, 8]
// [4, 1, 2, 3, 5, 6, 8, 7]
// There are other acceptable mutations too!!

// Pseudocode for Pivot Helper Function:
// * The function will accept three arguments: an array, a start index and an end index (these can
//   default to 0 and array length - 1, respectively)
// * Grab the pivot from the start of the array. Store the current pivot index in a variable (this
//   will keep track of where the pivot should end up after the final iteration).
// * Loop through the array from start to end - if the pivot is greater than the current element,
//   increment the pivot index variable and swap the current element with the element at the pivot index.
// * Swap the starting element (ie the pivot) with the element at the pivot index and return the pivot
//   index.

// Helper function for Quick Sort (the array is changed In-place)
// accumulate elements less than the pivot near the start of the array and then place the pivot at the
// end of this accumulated portion. This ensures that all elements to the left of pivot are less than it
// and all elements to the right of pivot are greater than it. The left and right portions don't have to
// be sorted. Here, we assume the pivot to be the value at the start.
function pivot(arr, start = 0, end = arr.length - 1) {
    // We are assuming the element at start as the pivot here!
    // Hence, swap index will be start. We will increment the swap index before swapping any element
    // less than pivot. The pivot will be swapped 
    let swapIdx = start; // index counter to swap elements less than the pivot and accumulate them
    for (let i = start + 1; i <= end; i++) { // loop through all elements of the input array except the pivot
        if (arr[i] < arr[start]) {
            swapIdx++; // increment the swap index to move 
            // swap the value less than pivot with the value at the swap index
            let temp = arr[swapIdx];
            arr[swapIdx] = arr[i];
            arr[i] = temp;
            // increment the swap index so that the next iteration will not touch the already
            // accumulated values less than the pivot.
        }
    }
    // Here, we swap the pivot (which was at start index) with the index of last element < pivot that we 
    // encountered while looping through the array. This way, the final element that is < pivot still stays
    // to the left of the pivot and the pivot gets placed in its correct position.
    let temp = arr[swapIdx];
    arr[swapIdx] = arr[start];
    arr[start] = temp;
    // console.log(arr);
    return swapIdx; // return the index of the pivot, now that it has been swapped to its correct position
}


// quickSort Pseudocode:
// * Call the pivot helper function on the full input array
// * When the pivot helper returns the updated pivot index, recursively call the pivot helper
//   on the sub-array to the left of this index and on the sub-array to the right of this index.

function quickSort (arr, left = 0, right = arr.length - 1) {
    // base-case or termination condition for the recursion
    if (left < right) {
        // get the updated pivot index from calling the helper function on the 
        // portion of the input array between the given start and end index
        let pivotIdx = pivot(arr, left, right);
        // Recursively call quick sort on the left sub-array. The returned array is not caught here
        // because, we want only the in-place changes to take place in the array.
        quickSort(arr, left, pivotIdx - 1);
        // Recursively call quick sort on the right sub-array. The returned array is not caught here
        // because, we want only the in-place changes to take place in the array.
        quickSort(arr, pivotIdx + 1, right);
    }
    return arr; // Finally, return the sorted array
}

console.log(quickSort([4, 6, 9, 1, 2, 5, 3]));



// 3. RADIX SORT - A NON-COMPARISON SORTING ALGORITHM

// TIME COMPLEXITY OF RADIX SORT = O(N * K) where K is the max number of digits among the input integers
// SPACE COMPLEXITY OF RADIX SORT = O(N + K) where K is the max number of digits among the input integers

// Comparison based sorting algorithms such as quick sort and merge sort compare two values to
// figure out the order of sorting. This approach is mathematically bounded to have atleast
// (N * logN) time complexity. There are other, more advantageous approaches that circumvent this
// comarison of values using inherent properties of the input data, to achieve lower time complexities
// by comparing more than two values at a time (similar to counting sort). 
// One such example is the Radix Sort algorithm which works on lists of binary numbers or numbers
// that can be represented in binary. 
// It never makes comparisons between elements, but instead, it exploits the information about the size 
// of the number (the number of digits of the number) to create ten (digit) buckets where the numbers are 
// grouped according to the digit in their rightmost positon. A new list is then formed from these buckets
// keeping the order of the buckets, ie, the numbers in bucket 0 come first and then the numbers in bucket
// 1 and then the numbers in bucket 2 and so on.

// NOTE: The order of picking number from within one bucket and the order of picking numbers
// between buckets matters! The order of picking numbers from between buckets follows the order
// of the bucket index whereas the order of picking numbers from within a bucket follows the 
// first-in-first-out (FIFO) order - esentially the number that was put first into the bucket is also
// the number that is picked out first from the bucket when reforming the list from the buckets.

// The process is then repeated with a more significant digit place on the left of the current digit which was
// processed. If the first iteration was done with the unit digits, the second iteration will be done 
// using the tenth digit and so on. 

// Numbers lacking a digit at the place will be assumed to start with 0. For example, when itration the
// bucket creation process for the tenths place, if we come across a number 4 and 23, 23 will be placed
// in 2's bucket whereas 4 will be placed in 0's bucket.
// The number of iterations of this process depends on the number of digits in the largest number in
// the input list. With each iteration of the process, we will get closer to a sorted list of numbers.

// As we iterate continuously higher up in the digit position from right to left, we sort numbers within
// the same bucket using more significant digit positions. The relativeorder generated after each iteration is 
// preserved and used for differentating numbers that have the same higher digits (stable sorting).


// In order to implement Radix Sort, it is helpful to build a few helper functions first.
// getDigit(num, place) - returns the digit in num at the given place value
// getDigit(12345, 1) should return 4
// getDigit(12345, 5) should return 0
function getDigit(num, place) {
    return Math.floor(Math.abs(num) / (10 ** place)) % 10;
}

// digitCount(num) - returns the number of digits in a given number
// digitCount(1) should return 1
// digitCount(314) should return 3
function digitCount(num) {
    if (num == 0) return 1;
    else return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// mostDigits(nums) - given an array of numbers, returns the number of digits in the largest number of the list
// mostDigits([1234, 56, 7]) should return 4
// mostDigits([12, 34, 56, 78]) should return 2
function mostDigits(nums) {
    if (nums.length == 0) return 0;
    let max = nums[0]
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > max) max = nums[i];
    }
    return digitCount(max);
}


// Radix Sort Pseudocode:
// * The radixSort function should accept a list of numbers and figure out how many digits the largest
//   number in the list has.
// * Loop from 0 to this largest number of digits (k loop) and for each iteration, create buckets for each digit
//   (0 to 9) (an array of 10 sub-arrays). Place each number in the corresponding bucket based on its kth
//   digit.
// * Rebuild the existing array with the values in our buckets, starting with bucket 0 and going up to
//   bucket 9. 
// * After the finak k loop iteration, return the array rebuilt from the buckets.

function radixSort(nums) {
    let maxDigits = mostDigits(nums);
    for (let k = 0; k < maxDigits; k++) {
        // create array of buckets for numbers having 0 to 9 at kth digit
        // [[], [], [], [], [], [], [], [], []]
        let buckets = Array.from({length: 10}, () => []);
        for (i = 0; i < nums.length; i++) {
            // insert number from input array in the corresponding bucket according the the digit
            // in the kth position of the number
            buckets[getDigit(nums[i], k)].push(nums[i]);
        }
        // rebuild nums using the first-in-first-out order of numbers from buckets 0 till bucket 9
        // Here, we use the spread operator '...' of JS to send the ten buckets as arguments
        // to be concatenated with an empty array, thereby preserving the bucket order and concatenating
        // all the numbers into a single array. The order within each bucket is also preserved in the 
        // rebuilt array.
        nums = [].concat(...buckets); // Array.concat() can take multiple arrays as arguments
    }
    return nums;
}


console.log(radixSort([23, 345, 5467, 12, 2345, 9852]));
