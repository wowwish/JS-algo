// HOW RECURSION WORKS: Invoke the same function with a different input until you reach
// your "base case" which also acts as the termination condition for the recursion.
// The "base case" terminates the growth of the recursion call stack.


// An example of recursion
// countDown(3) calls countDown(2) which itself calls countDown(1) which itself calls countDown(0)
// The call stack for countDown(3) would look like: 
                    
                    // countDown(3) <-- Top of call stack (push last, execute first, pop first)
                    // print 3
                    // countDown(2)
                    // print 2 
                    // countDown(1)
                    // print 1
                    // countDown(0)
                    // print "All Done!" <-- Bottom of call stack (push first, execute last, pop last)

function countDown (num) {
    // our base case is to stop the function if num <= 0
    if (num <= 0) {
        console.log('All Done!');
        return; // this return statement comes out of the entire call stack.
        // without this "termination" condition, the recursion call stack will keep filling up
        // leading to stack overflow / out of memory errors.
    }
    // if num > 0, it is displayed
    console.log(num);  
    // Next, decrement num and call this same function on the decremented num
    num--;
    countDown(num);
}




// Sum of a number series
// sumRange(3) will give 3 + sumRange(2)
// = 3 + sumrange(2) 
// = 3 + 2 + sumrange(1) (termination case)
// = 3 + 2 + 1
// = 6

// The call stack looks like:

                    // sumRange(1)      <-- Top of call stack (push last, execute first, pop first)
                    // 2 + sumRange(1)
                    // sumRange(2)
                    // 3 + sumRange(2)
                    // sumRange(3)      <-- Bottom of call stack (push first, execute last, pop last)

function sumRange(num) {
    // base case whih also terminates the call stack growth
    if (num === 1) {
        return 1;
    }
    else {
        return num + sumRange(num - 1);
    }
}




// factorial of a number
// call stack will look very similar to sumRange()
function factorial(num) {
    // base case terminators
    if (num < 0) {
        return 0;
    }
    if (num <= 1) {
        return 1;
    }
    else {
        return num * factorial(num - 1);
    }
}



console.log(countDown(3));
console.log(sumRange(3));


// AVOIDING COMMON PITFALLS OF RECURSION:
// * Check your "base case" and make sure it is correct. It should also terminate the call stack growth, lest
//   you can potentially have an infinite number of recursive calls added to the call stack (or overflow the
//   memory - "Maximum call stack size exceeded" Error!).
// * Remember to return the correct result or miss return statements in termination conditions (which can lead
//   to continously growing call stack! - Stack Overflow)




// RECURSION WITH HELPER METHOD DESIGN PATTERN
// An outer function has a recursive helper function created and used inside of it

// Example - Function to collect all the odd values in an array
function collectOddValues (arr) { // Outer (main) function
    let result = []; // accumulator
    // Recursive helper function definition within the main function
    function helper (helperInput) {
        if (helperInput.length === 0) {
            return;
        }
        if (helperInput[0] % 2 !== 0) {
            result.push(helperInput[0])
        }
        // Remember that Array.slice() takes a start index and optional end index and returns a new array
        // containing the elements within start and end indices in the original array
        helper(helperInput.slice(1)); // remove the first element of the input
    }
    helper(arr); // calling the helper function within the Outer (main) function
    return result;
}

console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]));


// Same function to collect odd values without helper method - PURE RECURSION
// self-container purely recursive function
function collectOddValuesPure(arr) {
    let newArr = []; // accumulator that is reset with every call
    // base case and terminator condition for empty array
    if (arr.length === 0) {
        return newArr;
    }
    // here, the odd value is pushed to our accumulator, but the accumulator is reset to []
    // everytime the function is called recursively. So we need to address this issue
    if (arr[0] % 2 !== 0) {
        newArr.push(arr[0]);
    }
    // pure recursive call with the first element removed from the input array
    // Remember that Array.slice() takes a start index and an optional end index and returns a new array
    // containing the elements within start and end indices in the original array
    
    // Here, we use the newArray returned from each recursive call of the function and aggregate it
    // into the newArr of the final recursive call
    newArr = newArr.concat(collectOddValuesPure(arr.slice(1)));
    // we return newArr with every call so that the newArr created with every recursive call
    // will be preserved and concatenated in the final recursive call of the pure recursive function.
    return newArr;
}


console.log(collectOddValuesPure([1, 2, 3, 4, 5, 6, 7, 8, 9]));