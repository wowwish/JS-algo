// SORTING

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



// BUBBLE SORT

