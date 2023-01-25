// Add up numbers from 1 to n
// O(n) implementation of linear function to calculate total
function addUpTo(n) {
    let total = 0; // Accumulator
    for (i=1; i<=n; i++) {
        total += i;
    }
    return total
}

// O(1) implementation
function addUp(n) {
    return (n * (n + 1)) / 2;
}

// Another function with O(n) runtime... keep in mind that 2n, 5n, 10n + 1 all correspond to O(n) in the 
// Big O notation
function upAndDown(n) {
    console.log("Going up!")
    for (let i=0; i<n; i++) {
    console.log(i);
    }
    console.log("At the top!\nGoing down...")
    for (let j=n-1; j>=0; j--) {
        console.log(j);
    }
    console.log("Back down, Bye!")
}

// Another function with O(n) complexity
function logAtLeastFive(n) {
    for (let i=1; i<=Math.max(5, n); i++) {
        console.log(i)
    }
}

// Similar function with O(1) complexity
function logAtMostFive(n) {
    for (let i=1; i<=Math.min(5, n); i++) {
        console.log(i)
    }
}

// O(n^2) quadratic function using nested loops
function printAllPairs(n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; i < n; j++) {
            console.log(i, j);
        }
    }
}

let t1 = performance.now();
addUpTo(1000000000);
let t2 = performance.now();
console.log(`Time Elapsed for addUpTo: ${(t2 - t1)/1000} seconds.`);

let t3 = performance.now();
addUp(1000000000);
let t4 = performance.now();
console.log(`Time Elapsed for addUp: ${(t4 - t3)/1000} seconds.`);