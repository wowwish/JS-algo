// Write a function called sameFrequency. Given two positive integers, find out if the 
// two numbers have the same frequency of digits.
// Time: O(N)
// sameFrequency(182,281) // true
// sameFrequency(34,14) // false
function sameFrequency(num1, num2) {
    if (num1 === num2) {
        return true
    }
    let digit = 0;
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    while (num1 > 0) {
        digit = num1 % 10;
        frequencyCounter1[digit] ? frequencyCounter1[digit] += 1 : frequencyCounter1[digit] = 1;
        num1 = Math.floor(num1 / 10);
    }
    while (num2 > 0) {
        digit = num2 % 10;
        frequencyCounter2[digit] ? frequencyCounter2[digit] += 1 : frequencyCounter2[digit] = 1;
        num2 = Math.floor(num2 / 10);
    }
    for (let item in frequencyCounter1) {
        if (!(frequencyCounter2[item]) || (frequencyCounter1[item] != frequencyCounter2[item])) {
            return false;
        }
    }
    return true;
}


// Frequency Counter / Multiple Pointers - areThereDuplicates
// Implement a function called, areThereDuplicates which accepts a variable number of arguments, 
// and checks whether there are any duplicates among the arguments passed in.  
// You can solve this using the frequency counter pattern OR the multiple pointers pattern.
// areThereDuplicates(1, 2, 3) returns false
// areThereDuplicates(1, 2, 2) returns true 
// areThereDuplicates('a', 'b', 'c', 'a') returns true 

// Solution use FrequencyCounter Approach
// Time - O(n)
// Space - O(n)
function areThereDuplicates(...args) { // using the "spread operator" to get variable number of arguments 
    // into an array called "args"
    let collection = {};
    for (let val of args) {
        collection[val] = (collection[val] || 0) + 1; 
    }
    for (let key in collection) {
        if (collection[key] > 1) {
            return true;
        }
    }
    return false;
}

// Solution using MutiplePointers Approach
// Time O(n*logn)
// space O(1)
function areThereDuplicatesBonus(...args) {
    args.sort(a, b => a > b); // sorting takes n*logn time complexity
    let start = 0;
    let next = 1;
    while (next < args.length) {
        if (args[start] === args[next]) {
            return true
        }
        start++;
        next++;
    }
    return false;
}



// One Liner Solution
function areThereDuplicatesOneLiner() {
    // "arguments" is a special array-like object in JS with only the "length" attribute
    // Create a Set object collection from this special array and compare its size with the 
    // length of the "arguments" array
    return new Set(arguments).size !== arguments.length;
}