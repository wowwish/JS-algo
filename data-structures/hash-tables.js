// HASH TABLES / HASH MAP

// Hash Table / Hash Map is a very common built-in data structure in pretty much all programming languages.
// They are used to store key-value pairs. While the keys in arrays are strictly numeric, the keys 
// of the hash table are not. Similarly, while the keys of arrays are ordered (numeric indices), the keys of 
// a hash table donot have an inherent order. 
// Unlike arrays, hash tables / hash maps are FAST for all the following operations:
//  *   finding values
//  *   adding new values    
//  *   removing values

// Hash Maps allow us to use human-readable keys for values.

// TO IMPLEMENT A HASH TABLE, WE WILL BE USING AN ARRAY. IN ORDER TO LOOKUP VALUES BY KEY, WE NEED
// A WAY TO CONVERT KEYS INTO VALID ARRAY INDICES! A FUNCTION THAT PERFORMS THIS TASK IS CALLED
// AS A 'HASH FUNCTION'. 
// THE HASH FUNCTION SHOULD PROVIDE THE SAME INDEX EVERYTIME THE SAME KEY IS PROVIDED TO IT!
// THE HASH FUNCTION TAKES AN INPUT OF VARIABLE SIZE AND SPITS OUT A CRYPTOGRAPHIC HASH
// OF FIXED SIZE
// A GOOD HASH FUNCTION FOR IMPLEMENTING HASH TABLES / HASH MAPS SHOULD HAVE:
//  *   Fast / Constant time performance
//  *   Does'nt cluster outputs at specific indices, but distributes uniformly
//  *   Deterministic (same input yields same output)

// A hash function implementation that gives an index within 0 and a given number for a given
// string. We calculate the relative alphabetic position of each character of the string, add it
// to a total sum, and return the remainder when this total sum is divided by thee passed upper limit
// number argument for the function.
function hash(key, arrayLen) {
    let total = 0;
    for (let char of key.toLowerCase()) { // loop through each character in the given string
        // relative position of the small-case character in the alphabet is added to the total
        total += char.charCodeAt(0) - 96; 
    }
    // get the remainder when the total is divided by the arrayLen argument (length of the hash table array)
    total = total % arrayLen;
    return total;
}

// These calls will always return the same value as long as the key and the array length remain the same
// console.log(hash("pink", 10)); // 0
// console.log(hash("orangered", 10)); // 7
// console.log(hash("cyan", 10)); // 3

// The Above hash function only hashes strings.
// It's time complexity is O(N) where, N is the length of the key passed to the hash function
// let's optimize the function to reduce its time complexity and improve the randomness of the hash function

function hashOptimized(key, arrayLen) {
    let total = 0;
    // prime numbers are used in hash functions to spread out the keys more uniformly across the hash table
    // The prime numbers are used to get unformly distributed hash values for the given key and array length
    // This helps is populating the hash table in a more uniform manner instead of only some buckets (indices)
    // of the hash table being filled up with data. 
    // The hash table having a prime number length also helps in this uniformity of data insertion into it,
    // by approaching equal probability of filling up for all indices of the table.
    // THE SITUATION WHERE THE HASH FUNCTION PRODUCES THE SAME HASH VALUE FOR TWO DIFFERENT SET OF INPUTS
    // WILL LEAD TO MUTIPLE DATA ELEMENTS BEING ADDED AT THE SAME INDEX IN THE HASH TABLE. SUCH A SITUATION
    // IS TERMED AS A COLLISION AND USING PRIME NUMBER LENGTH HASH TABLES AS WELL AS PRIME NUMBER BASED
    // HASH FUNCTIONS REDUCE THE NUMBER OF COLLISIONS SIGNIFICANTLY!!
    let WEIRD_PRIME = 31;
    key = key.toLowerCase();
    // Add an upper limit to the number of iterations we do
    for (let i = 0; i < Math.min(key.length, 100); i++) {
        total = total * WEIRD_PRIME + (key.charCodeAt(i) - 96);
    }
    total = total % arrayLen;
    return total;
}

// console.log(hashOptimized("hello", 13)); // 7
// console.log(hashOptimized("goodbye", 13)); // 9
// console.log(hashOptimized("hi", 13)); // 10
// COLLISION !!
// console.log(hashOptimized("cyan", 13)); // 5
// console.log(hashOptimized("pink", 13)); // 5


// HANDLING COLLISIONS

// Even with a large array and a great hash function, collisions are inevitable!
// There are many strategies for dealing with collisions, but we will focus on two of them:
//  *   Seperate Chaining - We store the two colliding data elements at the same spot in the hash table
//      using a more sophisticated data structure (like an array or linked-list). This allows us to
//      store multiple (key, hash_value) pairs at the same index!
//  *   Linear Probing - When we encounter a collision, we search through the hash table to find
//      the next empty slot for placing the colliding data element. Thus, we live by the rule of only
//      one (key, hash_value) pair at each index of the hash table! We strictly follow the number of elements
//      allowed in the hash table!


// A RUDIMENTARY HASH TABLE IMPLEMENTATION

class HashTable {
    // default hash-table size is set to a prime-number
    constructor(size=17) {
        // Create an array of the given size to store all the data elements
        this.KeyMap = new Array(size);
    }
    // hash-function to obtain hash cipher for a given key
    hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        key = key.toLowerCase();
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            total = total * WEIRD_PRIME + (key.charCodeAt(i) - 96);
        }
        total = total % this.KeyMap.length;
        return total;
    }
    // instance method to accept a key and a value and insert them into the hash table. 
    // This method also handles collision (two data elements with different keys at the same index)
    // through the seperate chaining approach. If the key already exists in the hash table, its value
    // will be update to the new value passed.
    set(key, value) {
        // hash the  passed key
        let ind = this.hash(key);
        // normal insertion case - set the key-value pair as a list inside an array at the index
        if (!this.KeyMap[ind]) this.KeyMap[ind] = [[key, value]];
        // If the key is already present in the hash table, update its corresponding value
        else {
            let modified = false;
            for (let i = 0; i < this.KeyMap[ind].length; i++) {
                // handling collision case - modify the corresponding value of a colliding key at index in
                // the hash table, if the passed key is already present in the hash table
                if (this.KeyMap[ind][i][0] === key) {
                    this.KeyMap[ind][i][1] = value;
                } 
            }
            // handling collision - If the key being passed is a new key not already present in the 
            // hash-table, simply push the key-value pair to the array at the hash index in the hash
            // table.
            if (!modified) {
                this.KeyMap[ind].push([key, value]);
            }
        }
    }
    // instance method to get the value of a given key from the hash table
    get(key) {
        // hash the given key, then retrive the key-value pair from the hash table
        // Handle collisions, keeping in mind that the seperate chaining approach was used (use
        // the provided key to retrieve the correct value in cases of collision)
        // if the passed key is not found in the hash table, return undefined
        // if the key is found in the hash table, return the corresponding value of the key from
        // the hash table
        let index = this.hash(key);
        if (!this.KeyMap[index]) return undefined;
        // return the value from the only key-value pair in KeyMap for normal cases
        if (this.KeyMap[index].length === 1) return this.KeyMap[index][0][1];
        // handling collision cases - loop through the KeyMap and return the value equivalent to 
        // the array being used.
        else if (this.KeyMap[index].length > 1) {
            for (let i = 0; i < this.KeyMap[index].length; i++) {
                if (this.KeyMap[index][i][0] === key) return this.KeyMap[index][i][1];
            }
        }
    }
    // instance method to return an array of all the unique keys in the hash table
    keysUnique() {
        let keysArr = [];
        for (let i = 0; i < this.KeyMap.length; i++) {
            if (this.KeyMap[i]) {
                for (let j = 0; j < this.KeyMap[i].length; j++) {
                    // push the key from the hash table to the keyssArr only if the key
                    // is not already present in the keysArr
                    if (!keysArr.includes(this.KeyMap[i][j][0])) keysArr.push(this.KeyMap[i][j][0]);
                }
            }
        }
        return keysArr;
    }
    // instance method to return an array of all unique the values in the hash table
    valuesUnique() {
        let valuesArr = [];
        for (let i = 0; i < this.KeyMap.length; i++) {
            if (this.KeyMap[i]) {
                for (let j = 0; j < this.KeyMap[i].length; j++) {
                    // push the value from the hash table to the valuesArr only if the value
                    // is not already present in the valuesArr
                    if (!valuesArr.includes(this.KeyMap[i][j][1])) valuesArr.push(this.KeyMap[i][j][1]);
                }
            }
        }
        return valuesArr;
    }
}


let ht = new HashTable();
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "808000");
ht.set("salmon", "#FA8072");
ht.set("lightcoral", "#F08080");
ht.set("mediumvioletred", "#C71585");
ht.set("plum", "#DDA0DD");
ht.set("are we done?", "no");
ht.set("are we done?", "yes");
// console.log(ht.KeyMap);
console.log(ht.get("yellow"));
console.log(ht.get("olive"));
console.log(ht.get("are we done?"));
console.log(ht.valuesUnique());
console.log(ht.keysUnique());



// BIG O COMPLEXITY OF HASH TABLES

// TIME CMPLEXITY (average and best case scenario with a fast and simple hash function - use good hash function):
// INSERTION - O(1)
// DELETION - O(1)
// ACCESS - O(1)

// TIME COMPLEXITY (worst possible case with an uneven hash function that return the same index for eveey input -
// distributing all data elements into just one index):
// INSERTION - O(N)
// DELETION - O(N)
// ACCESS - O(N)