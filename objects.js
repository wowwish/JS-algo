// Objects in JavaScript are unordered key-value pairs
// Objects work well when you don't need order and when you need fast access, insertion or removal of data
let instructor = {
    firstName: "Kelly",
    isInstructor: true,
    favoriteNumbers: [1, 2, 3, 4]
}



// BIG-O OF OBJECTS:
// INSERTION - O(1)
// REMOVAL - O(1)
// SEARCHING (CHEKCING TO SEE IF A GIVEN INFORMATION IS IN THE VALUES OF THE OBJECT) - O(N)
// ACCESS (VALID KEY BASED ACCESS) - O(1)

// PRINTING ALL THE KEYS/VALUES OF AN OBJECT TAKES O(N) TIME
console.log(Object.keys(instructor)) // KEYS
console.log(Object.entries(instructor)) // KEY-VALUE PAIRS

// CHECK IF A KEY EXISTS IN THE OBJECT AT CONSTANT TIME O(1)
console.log(instructor.hasOwnProperty("firstName"))
