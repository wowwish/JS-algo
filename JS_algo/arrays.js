// Arrays in JavaScript are Ordered Lists
// Arrays are generally used when there is order involved in the data
// Accessing data from an array is very quick O(1)

let names = ['Michael', 'Melissa', 'Andrea'];

let values = [true, {}, [], 2, "awesome"];


// BIG-O OF ARRAYS:
// INSERTION - IT DEPENDS ON THE POSITION OF INSERTION IN THE ARRAY. INSERTING ELEMENTS AT THE START OF THE ARRAY
// IS MORE EXPENSIVE THAN INSERTING ELEMENTS CLOSER TO THE END OF THE ARRAY DUE TO THE NUMBER OF ARRAY RE-INDEXING OPERATIONS
// HENCE PUSH AND POP OPERATIONS ARE ALWAYS FASTER ON ARRAYS WITH ELEMENTS COMPARED TO SHIFT AND UNSHIFT OPERATIONS
// REMOVAL - SIMILAR TO INSERTION
// SEARCHING - O(N)
// ACCESSING (VALID INDEX BASED ACCESS) - O(1)

// BIG-O OF BUILT IN ARRAY METHODS:
// PUSH: Add element to end of array, no re-indexing required O(1)
// POP: remove element from end of array, no re-indexing required O(1)
// SHIFT: add element to start of array, all array indices have to be re-indexed O(N)
// UNSHIFT: remove element from start of array, all array indices have to be re-indexed O(N)
// CONCAT: add elements of one array2 to end of array1 within a newly create array3 O(N), 
// where N (array3.length) = array1.length + array2.length
// SLICE: return a new array with copied elements from the original array that fall under the 
// given start and end indices (element at end index not included) within the original array. Worst case is O(N)
// SPLICE: A versatile method to modify contents of the original array by removing existing elements and/or
// adding new elements. Involves shifting and re-indexing potentially all indices of the array O(N)
// SORT: sort all elements of the array according to an order O(N*logN)
// forEach/map/filter/reduce etc. loop over each element of the array, hence, O(N)