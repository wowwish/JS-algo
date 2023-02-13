// LINEAR SEARCH - Search every item of array to check if it is the target item
// Loop through the array one item at a time - from begining to end or from end to begining
// and check if the current array item is the item we are searching for. If it is, return
// the index at which the search item was found. If the search item is never found, return -1.
// Don't use indexOf to implement this function!

// TIME COMPLEXITY - O(N)


// linearSearch([10, 15, 20, 25, 30], 15)           should return 1
// linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4)  should return 5
// linearSearch([100], 100)                         should return 0
// linearSearch([1,2,3,4,5], 6)                     should return -1
// linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10) should return -1
// linearSearch([100], 200)                         should return -1

function linearSearch(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) return i;
    }
    return -1;
}

console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4))