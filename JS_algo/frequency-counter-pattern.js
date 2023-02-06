// Write a function called "same" which accepts two arrays. 
// The function should return true if every value in the 
// array has it's corresponding value squared in the second
// array. The frequency of the values must be same.

// same([1, 2, 3], [4, 1, 9]) returns true (order can be different)
// same([1, 2, 3], [1, 9]) returns false
// same([1, 2, 1], [4, 4, 1]) returns false (must be same frequency)


// Naive Solution O(N^2) because .indexOf() is O(N)
function sameNaive(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }
    else {
        for (let item of arr1) {
            let correctIndex = arr2.indexOf(item ** 2)
            if (correctIndex === -1) {
                return false
            }
            // remove the squared item value from the second array to account duplications of items in the 
            //  original array
            arr2.splice(correctIndex, 1)
        }
        // all elements of the original array have their square elements in the new array since the loop above
        // completed without returning false
        return true
    }
}



// refactored function for same with linear time complexity O(N) solution (O(3N) ~ O(N))
function sameRefactored(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }
    else {
        let frequencyCounter1 = {};
        let frequencyCounter2 = {};
        for (let val of arr1) {
            frequencyCounter1[val] = ++frequencyCounter1[val] || 1;
        }
        for (let val of arr2) {
            frequencyCounter2[val] = ++frequencyCounter2[val] || 1;
        }
        // return false if any corresponding value for the element of arr1 from frequencyCounter1 is not present
        // in frequencyCounter2
        for (let key in frequencyCounter1) {
            if (!(key ** 2 in frequencyCounter2)) {
                return false;
            }
            // return false if the frequency of corresponding elements donot match between arr1 and arr2
            if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
                return false;
            }
        }
        return true // All conditions are met for both frequencyCounter objects
    }
}


// ANAGRAMS - given two strings, write a function to determine if the second string is an anagram of the first.
// An anagram is a word, phrase, or name formed by rearranging the letters of another, such as 'cinema' formed
// from 'iceman'
// validAnagram('', '') returns true
// validAnagram('aaz', 'zza') returns false
// validAnagram('anagram', 'nagaram') returns true
// validAnagram('car', 'rat') returns false
// validAnagram('awesome', 'awesom') returns false
// validAnagram('qwerty', 'qeywrt') returns true
// validAnagram('texttwisttime', 'timetwisttext') returns true
function validAnagram(first, second){
    // add whatever parameters you deem necessary - good luck!
    if (first.length !== second.length) {
        return false;
    }
    else {
        const lookup = {};
        for (let i=0; i < first.length; i++) {
            let letter = first[i];
            // if letter exists in lookup, increment its value, else, set its value to 1
            lookup[letter] ? lookup[letter] +=1 : lookup[letter] = 1;
        }
        for (let i = 0; i < second.length; i++) {
            let letter = second[i];
            // if letter from second string does not exist in the lookup table from first string, 
            // or if its value is equal to zero, return false
            if (!lookup[letter]) {
                return false;
            }
            // if letter from second string exists in the lookup table from first string, decrement the value
            else {
                lookup[letter] -= 1;
            }
        }
    }
    // when all validation check pass and all false returning statements are skipped, return true
    return true;
}



console.log(sameNaive([1, 2, 3, 2], [9, 1, 4, 4]))
console.log(sameRefactored([1, 2, 3, 2], [9, 1, 4, 4]))
console.log(validAnagram('anagram', 'nagaram'))