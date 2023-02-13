// NAIVE STRING SEARCHING

// TIME COMPLEXITY - O(N * M)

// Suppose you want to count the number of times a smaller string appears
// in a longer string. The straight forward approach involves checking pairs
// of characters individually.
// loop over each character in the longer string and loop over the shorter string
// if the characters don't match, break out of the inner loop of the shorter string
// if the characters do match, keep going till you hit the end of the short string.
// if you do hit the end of the short string, increment the count of matches.
// return the number of matches at the end

function naiveStringSearch(longstr, substr) {
    let numMatches = 0;
    for (let i = 0; i < longstr.length; i++) {
        // j declared as var to make it accessible outside the loop
        for (var j = 0; j < substr.length; j++) {
            if (longstr[i + j] != substr[j]) break;
        }
        if (j === substr.length) numMatches++;
    }
    return numMatches;
}

console.log(naiveStringSearch("wowomgzomg", "omg"));



// KMP (Knuth-Morris-Pratt) STRING SEARCHING

function kmpStringSearch(longstr, substr) {
    
}
