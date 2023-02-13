// BINARY SEARCH (USES DIVIDE AND CONQUER APPROACH)

// BINARY SEARCH REQUIRED A SORTED ARRAY. AN ARRAY OF NUMBERS CAN BE SORTED IN ASCENDING OR DESCENDING ORDER
// AN ARRAY OF STRINGS WILL BE SORTED ALPHABETICALLY. 
// THERE MUST BE SOME FORM OF ORDER IN THE ARRAY THAT CAN BE USED TO COMPARE TWO ELEMENTS AND THEN
// ELIMINATE HALF OF THE ARRAY ELEMENTS WITH EACH ITERATION.

// TIME COMPLEXITY - O(logN)
// This is a faster form of search
// we eliminate half of the elements of the array at a time when checking for 
// the search / target item in the array

// binarySearch([1,2,3,4,5],2) should return 1
// binarySearch([1,2,3,4,5],3) should return 2
// binarySearch([1,2,3,4,5],5) should return 4
// binarySearch([1,2,3,4,5],6) should return -1
// binarySearch([
// 5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 
//   40, 44, 64, 79, 84, 86, 95, 96, 98, 99
// ], 10) should return 2
// binarySearch([
//   5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 
//   40, 44, 64, 79, 84, 86, 95, 96, 98, 99
// ], 95) should return 16
// binarySearch([
//   5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 
//   40, 44, 64, 79, 84, 86, 95, 96, 98, 99
// ], 100) should return -1

function binarySearch(arr, val){
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] === val) return mid;
      if (arr[mid] > val) right = mid - 1;
      if (arr[mid] < val) left = mid + 1;
    }
    return -1;
  }

console.log(binarySearch([5, 6, 10, 13, 14, 18, 30, 34, 35, 37, 40, 44, 64, 79, 84, 86, 95, 96, 98, 99], 95))