// THE DYNAMIC PROGRAMMING APPROACH

// Dynamic Programming is a method for solving a complex problem by breaking it down into a 
// collection of simpler sub-problems, solving each of those sub-problems just once, and
// storing their solutions.

// THERE ARE TWO CONDITIONS THAT A PROBLEM SHOULD SATISFY TO USE THE DYNAMIC PROGRAMMING APPROACH
// TO SOLVE IT:
//  *   OVERLAPPING SUBPROBLEMS - The problem can be broken down into sub-problems which are
//      reused several times. For example, in the Fibonacci sequence, every number after the
//      first two is the sum of the two preceding ones. An example of a non-overlapping 
//      set of sub-problems would be Merge sort, where any sub-problem's solution is not
//      used as part of another sub-problem's solution. The sub-problem's solutions are
//      simply combined at the end. If the input array has a lot of repetitions of sets of values,
//      then the Merge sort will have some overlapping sub-problems (special case of Merge sort).
//  *   OPTIMAL SUBSTRUCTURE - An optimal solution can be constructed from the optimal solutions
//      of the sub-problems, for example like in the Fibonacci series, or when finding the shortest
//      path between two vertices in a graph (the solution to this problem builds upon the shortest
//      path to some other vertex that lies in the shortest path from the start to end vertex).
//      Shortest path from A to D (A -> B -> C -> D) depends on the solution to shortest path from A to C
//      (A -> B -> C). 
//      However, a solution like finding the longest simple (non-repeating Vertices) path between two Vertices
//      does not exhibit this optimal substructure (cannot combine solutions due to repeating Vertices).


// The FIBONACCI SEQUENCE exhibits both overlapping subproblems and optimal substructure and is a good
// starting example to understand dynamic programming.

// Recursive solution for Fibonacci sequence
function fibonacci(n) {
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// TIME COMPLEXITY OF THIS RECURSIVE IMPLEMENTATION OF FIBONACCI SEQUENCE IS APPROXIMATELY O(2^N)


console.log(fibonacci(6)); // 8

// Here, the fibonacci(6) will be fibonacci(4) + fibonacci(5). Notice that fibonacci(5) will re-calculate
// fibonacci(4) to arrive at fibonacci(5) - overlapping subproblems with optimal substructure.

// ENTER DYNAMIC PROGRAMMING - Using past knowledge/solution to make solving a future problem easier



// MEMOIZATION AS AN APPROACH TO DYNAMIC PROGRAMMING

// One of the strategies to dynamic programming is to simply store or cache the previous solutions in
// an array or an object - MEMOIZATION
// MEMOIZATION is storing the results of expensive function calls and returning the cached result
// when the same inputs occur again.

// A MEMOIZED SOLUTION TO THE FIBONACCI SEQUENCE USING AN ARRAY (CAN ALSO USE AN OBJECT FOR MEMOIZATION)
function memoizedFibonacci(n, memo=[undefined, 1, 1]) {
    // Use the memoization array to recycle already computed results
    if (memo[n] != undefined) return memo[n];
    // For any n > 2, compute the result and store it in the memoization array for quick lookup
    let res = memoizedFibonacci(n-1, memo) + memoizedFibonacci(n - 2, memo);
    // Store the computed result in the memoization array for reuse (to prevent re-computation of result)
    memo[n] = res; // In JS, arrays are dynamic data structures, when a value is set at an array index
    // out of the range of the last element of the array, the intermediate indices are set as undefined! 
    return res; // return the computed result
}

console.log(memoizedFibonacci(200));


// TIME COPMPLEXITY OF THE MEMOIZED SOLUTION IS APPROXIMATELY O(N) !!



// TABULATION: BOTTOM-UP APPROACH OF DYNAMIC PROGRAMMING


// Till now, we have been calculation the solutions to the fibonacci problem from a top-down approach, ie,
// fibonacci(5) is calculated as fibonacci(4) + fibonacci(3) and then fibonacci(4), fibonacci(3) are calculated
// as fibonacci(3) + fibonacci(2), fibonacci(2) + fibonacci(1) and then fibonacci(3), fibonacc(2), fibonacci(1)
// are calculated and so on.

// In the Botton-Up approach of Dynamic Programming, we work our way up from the bottom by calculating fibonacc(1)
// and fibonacci(2) first. 
// TABULATION - storing the result of a previous result in a "table" (usually an array). This is usually
// done using ITERATION.
// BETTER SPACE COMPLEXITY CAN BE ACHIEVED USING TABULATION! 


// FIBONACCI SEQUENCE IMPLEMENTED USING TABULATION: BOTTOM-UP APPROACH
// THIS APPROACH WILL PREVENT STACK OVERFLOW ERRORS BECAUSE OF THE USE OF ITERATION INSTEAD OF RECURSION!
function tabulatedFibonacci(n) {
    if (n <= 2) return 1; // 
    let fibNums = [0, 1, 1]; // initialize the initial state of the Table (array)
    // iterate with the solutions from the table and iterative calculate the solution to the
    // next sub-problem. Store the solution at each iteration for use in the next sub-problem.
    for (let i = 3; i <= n; i++) {
        fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
    }
    return fibNums[n]; // finally, return the solution for the whole problem!
}