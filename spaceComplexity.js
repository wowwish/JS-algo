// constant space complexity as only two auxillary variables (total and i) are created apart from 
// the input array (which is not counted)
function sum(arr) {
    let total = 0 // accumulator
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
    }
    return total
}

// Another function with space complexity of N
function double(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(2 * arr[i]); // new array of size N created
    }
    return newArr
}