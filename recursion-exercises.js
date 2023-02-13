// POWER
// Write a function called power which accepts a base and an exponent. The function should return the power 
// of the base to the exponent. This function should mimic the functionality of Math.pow()  - do not worry 
// about negative bases and exponents.

// power(2,0) should return 1
// power(2,2) should return 4
// power(2,4) should return 16

function power(base, exponent){
    if (exponent === 0) {
        return 1;
    }
    return base * power(base, exponent - 1);
}


// productOfArray

// Write a function called productOfArray which takes in an array of numbers and returns the product of them all.
// productOfArray([1,2,3]) should return 6
// productOfArray([1,2,3,10]) should return 60
function productOfArray(arr) {
    if (arr.length === 0) {
        return 1;
    }
    return arr[0] * productOfArray(arr.slice(1));
}




// FIBONACCI

// Write a recursive function called fib which accepts a number and returns the nth number in the Fibonacci 
// sequence. Recall that the Fibonacci sequence is the sequence of whole numbers 1, 1, 2, 3, 5, 8, ... which 
// starts with 1 and 1, and where every number thereafter is equal to the sum of the previous two numbers.

// fib(4) should return 3
// fib(10) should return 55
// fib(28) should return 317811
// fib(35) should return 9227465

// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465

function fib(n){
    // fib(0) should be 0 according to classical definition of fibonacci numbers
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
  }


// REVERSE

// Write a recursive function called reverse which accepts a string and returns a new string in reverse.

// reverse('awesome') should return 'emosewa'
// reverse('rithmschool') should return 'loohcsmhtir'

function reverse(str){
    if (str.length === 1) {
        return str[0];
    }
    return str.slice(-1) + reverse(str.slice(0, str.length - 1));
  }
  
// isPalindrome

// Write a recursive function called isPalindrome which returns true if the string passed to it is a 
// palindrome (reads the same forward and backward). Otherwise it returns false.

// isPalindrome('awesome') should return false
// isPalindrome('foobar') should return false
// isPalindrome('tacocat') should return true
// isPalindrome('amanaplanacanalpanama') should return true
// isPalindrome('amanaplanacanalpandemonium') should return false

function isPalindrome(str){
    while(str.length > 0) {
        if (str[0] == str.slice(-1)) {
            return isPalindrome(str.slice(1, -1));
        }
        return false;
    }
    return true;
}



// someRecursive

// Write a recursive function called someRecursive which accepts an array and a callback. The function 
// returns true if a single value in the array returns true when passed to the callback. 
// Otherwise it returns false.

// SAMPLE INPUT / OUTPUT
// const isOdd = val => val % 2 !== 0;

// someRecursive([1,2,3,4], isOdd) should return true
// someRecursive([4,6,8,9], isOdd) should return true
// someRecursive([4,6,8], isOdd) should return false
// someRecursive([4,6,8], val => val > 10); should return false

function someRecursive(arr, func){
    if (arr.length === 0) {
        return false;
    }
    if (func(arr[0])) {
        return true;
    }
    return someRecursive(arr.slice(1), func);
  }


// flatten

// Write a recursive function called flatten which accepts an array of arrays and returns a new array 
// with all values flattened.

// flatten([1, 2, 3, [4, 5] ]) should return [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) should return [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) should return [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) should return [1,2,3]

// Pure Recursion Solution
function flatten(arr){
    // initialize empty result array
    let flatArr = [];
    // return empty array if the input array is empty
    if (arr.length === 0) {
        return flatArr;
    }
    // check the first element of the input array, if it is a number, push it to our result array
    if (typeof(arr[0]) == 'number') {
        flatArr.push(arr[0]);
    }
    // if the first value of the input array is another array, call this function
    // recursively on the array inside and concatenate the result with out result array
    if (typeof arr[0] === 'object') {
        flatArr = flatArr.concat(flatten(arr[0]));
    }
    // we checked only the first element, we now recursively call this function on the remaining
    // elements of the input array and concatenate their result with our result array
    flatArr = flatArr.concat(flatten(arr.slice(1)));
    return flatArr; // return the result array
  }




// capitalizeFirst

// Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first 
// letter of each string in the array.
// capitalizeFirst(['car','taco','banana']); should return ['Car','Taco','Banana']

// Purely recursive solution
function capitalizeFirst (arr) {
    let capArr = [];
    if (arr.length === 0) {
        return capArr;
    }
    let capStr = arr[0][0].toUpperCase() + arr[0].slice(1);
    capArr.push(capStr);
    capArr = capArr.concat(capitalizeFirst(arr.slice(1)));
    return capArr;
  }

// helper function solution
function capitalizeFirst (arr) {
    let capArr = [];
    function helper(arr) {
        if (arr.length === 0) {
            return;
        }
        capArr.push(arr[0][0].toUpperCase() + arr[0].slice(1));
        helper(arr.slice(1));
    }
    helper(arr);
    return capArr;
}


// capitalizeWords

// Write a recursive function called capitalizeWords. Given an array of words, return a new array 
// containing each word capitalized.

// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); should return ['I', 'AM', 'LEARNING', 'RECURSION']

// Pure recursion solution
function capitalizeWords (arr) {
    // base-case terminator
    if (arr.length === 1) {
        return [arr[0].toUpperCase()];
    }
    // get the capitalized words till the second last element of the recursive call array
    let capArr = capitalizeWords(arr.slice(0, -1));
    // push the capitalized last word into the result array and return the resultant array
    capArr.push(arr[arr.length - 1].toUpperCase());
    return capArr;
  }


// stringifyNumbers

// Write a function called stringifyNumbers which takes in an object and finds all of the values which 
// are numbers and converts them to strings. Recursion would be a great way to solve this!


let testObj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}


// stringifyNumbers(testObj) should return:

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

// recursion + iteration approach
function stringifyNumbers(obj) {
    let newObj = {};
    // loop through every key in the input object and convert the values appropriately.
    for (let key in obj) {
        if (typeof(obj[key]) === 'number') {
            newObj[key] = obj[key].toString();
        }
        else if (typeof(obj[key]) === 'object' && !Array.isArray(obj[key])) {
            console.log(key, obj[key]);
            newObj[key] = stringifyNumbers(obj[key]); // recursive call
        }
        else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}


// Alternate Solution using spread Operator - pure recursion approach
function stringifyNumbersSpread(obj) {
    // if object is just empty or not an actual object return the object itself
    if (!Object.keys(obj).length || !obj) return obj;
    // get the first key from the object
    const key = Object.keys(obj)[0];
    // here, "[key]" uses the variable "key" declared above as the key and stores its 
    // corresponding value into "val". The remaining key-value pairs from "obj" are spread
    // into the "left" object.
    const { [key]: val, ...left } = obj;
   
    if (typeof val === 'number') {
      obj[key] = String(val);
    } else if (typeof val === 'object' && !Array.isArray(val)) {
      obj[key] = stringifyNumbers(val);
    }
   
    return {
      ...obj,
      ...stringifyNumbers(left),
    };
  }



// collectStrings

// Write a function called collectStrings which accepts an object and returns an array of all 
// the values in the object that have a typeof string

const strObj = {
    stuff: "foo",
    data: {
        val: {
            thing: {
                info: "bar",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "baz"
                    }
                }
            }
        }
    }
}

// collectStrings(strObj) should return ["foo", "bar", "baz"])

// Pure Recursion Solution
function collectStrings(obj) {
    let res = [];
    // return the input when it is an empty object or a falsy value
    if (!Object.keys(obj).length || !obj) return obj;
    for (key in obj) {
        if (typeof obj[key] === 'string') {
            res.push(obj[key]);
        }
        // recursive call - add the result of the recursive call result to the main call's "res"
        else if (typeof obj[key] === 'object') res = res.concat(collectStrings(obj[key]));
    }
    return res;
}

// implementation with helper method
function collectStringsHelper(strObj) {
    let res = [];
    // helper function
    function gatherStrings(obj) {
        for (let key in obj) {
            if (typeof(obj[key]) === 'string') {
                res.push(obj[key]);
            }
            else if (typeof(obj[key]) === 'object') {
                // return the result from the sub-object in the recursive call
                return gatherStrings(obj[key]);
            }
        }
    }
    gatherStrings(strObj);
    return res;
}


// nestedEvenSum

// Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object 
// which may contain nested objects.


var obj1 = {
    outer: 2,
    obj: {
      inner: 2,
      otherObj: {
        superInner: 2,
        notANumber: true,
        alsoNotANumber: "yup"
      }
    }
  }
  
  var obj2 = {
    a: 2,
    b: {b: 2, bb: {b: 3, bb: {b: 2}}},
    c: {c: {c: 2}, cc: 'ball', ccc: 5},
    d: 1,
    e: {e: {e: 2}, ee: 'car'}
  };
  
//   nestedEvenSum(obj1) should return 6
//   nestedEvenSum(obj2) should return 10


function nestedEvenSum(obj) {
    let total = 0;
    for (let key in obj) {
        if ((typeof obj[key]) === 'number' && obj[key] % 2 === 0) {
            total = total + obj[key];
        }
        else if (typeof obj[key] === 'object') {
            total = total + nestedEvenSum(obj[key]); // recursive call
        }
    }
    return total;
}

console.log(nestedEvenSum(obj2));