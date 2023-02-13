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


// Write a function called averagePair. Given a SORTED array of integers and a target average, determine if 
// there is a pair of values in the array where the average of the pair equals the target average. 
// There may be more than one pair that matches the average target.
// averagePair([1,2,3],2.5) returns true
// averagePair([1,3,3,5,6,7,10,12,19],8) returns true
// averagePair([-1,0,3,4,5,6], 4.1) returns false
// averagePair([],4) returns false


// Time: O(N)
// Space: O(1)
function averagePair(arr, avg) {
    let start = 0;
    let end = arr.length - 1;
    let tempAvg = 0;
    while (start < end) { 
        // The approach is to calculate a temporary average and check it against the required average.
        // If tempAvg > avg, we need to reduce tempAvg, so we need to make one of the numbers of the pair smaller.
        // this is achieved by moving end one index lower in the sorted array (Ascending sorted).
        // if tempAvg < avg, we need to increase tempAvg, so we need to make one of the numbers of the pair bigger.
        // this is achieved by moving start one index higher in the sorted array (Asending sorted).
        tempAvg = (arr[start] + arr[end]) / 2
        if (tempAvg === avg) {
            return true;
        }
        else if (tempAvg > avg) {
            end--;
        }
        else if (tempAvg < avg) {
            start++;
        }
    }
    return false;
}



// Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.
// isSubsequence('hello', 'hello world') should return true
// isSubsequence('sing', 'sting')        should return true
// isSubsequence('abc', 'abracadabra')   should return true
// isSubsequence('abc', 'acb')           should return false (order matters)



// Time Complexity - O(N + M)
// Space Complexity - O(1)
function isSubsequence(str1, str2) {
    if (str1 == str2) {
        return true;
    }
    else {
        let start1 = 0; // index for string1
        let start2 = 0; // index for string2
        while (start2 < str2.length) { // loop through all characters of string 2
            if (str1[start1] == str2[start2]) { // character comparison
                start1++; // go to next character in string1
                start2++; // go to next character in string2
            }
            else { // if no match, check with the next character of str2 with the current character of str1
               start2++;
            }
        }
        // edge cases with start1 > (start1.length - 1) are possible
        // since we donot use start1 in the terminating condition of the while loop.
        if (start1 >= (str1.length - 1)) { 
            return true;
        }
        else {
            return false;
        }
    }
}


// Time Complexity of O(M)
// Space Complexity of O(1)
function isSubsequenceRefactored(str1, str2) {
    let count = 0
    // loop through every char of str2 and check if the char is equal to the current char at index count in str1
    // Remember that the order of characters should be maintained for str1 to be a subsequence of str2
    for (let c of str2) {
        if (str1[count] == c) { // character comparison
            count++;
        }
    }
    // count starts from one, hence, it should be equal to str1.length and not (str.length - 1)
    return (count === str1.length)
}



// Sliding Window - maxSubarraySum
// Given an array of integers and a number, write a function called maxSubarraySum, which finds the 
// maximum sum of a subarray with the length of the number passed to the function.
// Note that a subarray must consist of consecutive elements from the original array. 
// In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.

// maxSubarraySum([100,200,300,400], 2) should return 700
// maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  should return 39 
// maxSubarraySum([-3,4,0,-2,6,-1], 2) should return 5
// maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) should return 5
// maxSubarraySum([2,3], 3) should return null

// Time Complexity - O(N)
// Space Complexity - O(1)
function maxSubarraySum(arr, num) {
    let maxSum = 0;
    let subArraySum = 0;
    if (arr.length < num) {
        return null;
    }
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    subArraySum = maxSum;
    for (let i = num; i < arr.length; i++) {
        subArraySum = subArraySum - arr[i - num] + arr[i];
        if (subArraySum > maxSum) {
            maxSum = subArraySum;
        }
    }
    return maxSum;
}


// Sliding Window - minSubArrayLen
// Write a function called minSubArrayLen which accepts two parameters - an array of positive integers 
// and a positive integer.
// This function should return the minimal length of a contiguous subarray of which the sum is greater 
// than or equal to the integer passed to the function. If there isn't one, return 0 instead.

// minSubArrayLen([2,3,1,2,4,3], 7)                 should return 2 -> because [4,3] is the smallest subarray
// minSubArrayLen([2,1,6,5,4], 9)                   should return 2 -> because [5,4] is the smallest subarray
// minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) should return 1 -> because [62] is greater than 52
// minSubArrayLen([1,4,16,22,5,7,8,9,10],39)        should return 3
// minSubArrayLen([1,4,16,22,5,7,8,9,10],55)        should return 5
// minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11)        should return 2
// minSubArrayLen([1,4,16,22,5,7,8,9,10],95)        should return 0

// Time Complexity - O(n)
// Space Complexity - O(1)

function minSubArrayLen(arr, num) {
    let minWindowSize = Infinity; // minimum size of the dynamic window that has currentSum >= num
    let currentSum = 0; // sum of the window elements
    windowStart = 0 // the start index of the window
    // loop through the array. Here, each iteration index also acts as the window end index.
    for (let i = 0; i < arr.length; i++) {
        // add every element to the sum of the current window and check if the sum > required total.
        // if the sum is greater than the required num, check to see if the 
        currentSum += arr[i];
        // check if the window length can be reduced while maintaining current sum > required total
        while (currentSum >= num) {
            // if current window size which satisfies currentSum >= num is smaller than minWindowSize, update minWindowSize
            minWindowSize = Math.min(minWindowSize, i - windowStart + 1)
            // removing elements from window start to check if currentSum >= num still holds true
            currentSum -= arr[windowStart];
            windowStart++; // shrinking the window size from the left
        }
    }
    // return the minimum window size that was encountered across the array, which satisfied
    // the condition currentSum >= num
    return minWindowSize;
}


// Alternate Refactored solution
function minSubArrayLenRefactored(nums, sum) {
    let total = 0;
    let start = 0;
    let end = 0;
    let minLen = Infinity;
    // start goes from 0 to nums.length, hence the time complexity is roughly O(N)
    while (start < nums.length) {
        // if current window doesn't add up to the given sum then 
        // move the window to right
        if(total < sum && end < nums.length){
            total += nums[end];
            end++;
        }
        // if current window adds up to at least the sum given then
        // we can shrink the window 
        else if(total >= sum){
            minLen = Math.min(minLen, end-start);
            total -= nums[start];
            start++;
        } 
        // current total less than required total but end has reached nums.length, 
        // need this or else we'll be in an infinite loop 
        else {
            break;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}



// Sliding Window - findLongestSubstring
// Write a function called findLongestSubstring, which accepts a string and returns the length of the 
// longest substring with all distinct characters.

// findLongestSubstring('')                 should return 0
// findLongestSubstring('rithmschool')      should return 7
// findLongestSubstring('thisisawesome')    should return 6
// findLongestSubstring('thecatinthehat')   should return 7
// findLongestSubstring('bbbbbb')           should return 1
// findLongestSubstring('longestsubstring') should return 8
// findLongestSubstring('thisishowwedoit')  should return 6

// Time Complexity - O(n)
function findLongestSubstring(str) {
    let start = 0;
    let longest = 0;
    let indexer = {}; // to store (current index + 1) of every character encountered while looping over str
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        // check if the current character of the string has already been seen. If so, update start
        // to the maximum between start and the neighbor index of the current char from the indexer map.
        // Check if the current window size was the longest we encountered. If so, update longest
        // to the current window size.
        // Keep in mind that this 
        if (indexer[char]) { // If this character has been already encountered
            // when the current character has been already encountered, update start to the updated 
            start = Math.max(start, indexer[char]);
        }
        // adding 1 to (current char index - start) because start will be (index of current char + 1) from indexer
        longest = Math.max(longest, i - start + 1);
        // store the index of the next char in indexer so as to not double count the current character
        // For example, take the case of 'bcdackjilmn'. Here, we encount 'c' at i = 1. 
        // if we assign indexer['c'] = 1 and suppose start become Math.max(0, 1) when i = 4, 
        // we will actually encounter 'c' twice again. So, we need to set the indexer[char] as
        // the index of 'd' (2) which is the next character to the fist 'c' we encountered and so on.
        indexer[char] = i + 1;
    }
    return longest;
}



// Find the Longest Substring with atmost K Distinct Characters in a given String
function longestSubstringKDistinct(str, k) {
    let windowStart = 0;
    let charFrequencyMap = {};
    let maxLen = 0;
    // Loop through the string character by character
    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        // for every character encountered, increment its value in the frequency counter if it 
        // is an already seen character, or set the value to 1 for new character
        charFrequencyMap[str[windowEnd]] = ++charFrequencyMap[str[windowEnd]] || 1;
        // check if the number of unique characters in the current window is > K
        // by counting the number of keys in our frequency counter. If (unique chars > k),
        // we move the window to right by decrementing the value of the character at the windowStart
        // in the frequency counter and incrementing windowStart index. The while loop will again
        // check the number of unique chars in the window until it is greater than K. This while
        // loop for the current iteration breaks only when (unique chars in window <= K)
        while (Object.keys(charFrequencyMap).length > k) {
            charFrequencyMap[str[windowStart]] -= 1;
            // when a particular character reaches 0 occurrences, remove that character key-value pair
            // from the frequency counter. This is done to properly count unique characters with atleast
            // one occurrence within the window.
            if (charFrequencyMap[str[windowStart]] === 0) {
                delete charFrequencyMap[str[windowStart]];
            }
            windowStart++;
        }
        // keep track of the maximum window length encountered after filtering out all windows with
        // size > k.
        maxLen = Math.max(maxLen, windowEnd - windowStart + 1)
    }
    return maxLen;
}


console.log(longestSubstringKDistinct('aaahhibc', 2));