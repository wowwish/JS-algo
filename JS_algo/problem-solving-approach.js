// function to calculate the count frequency of each alphanumeric character in a given string
function charCount(str) {
    var result = {};
    for (var i = 0; i < str.length; i++) {
        char = str[i].toLowerCase();
        if (/[a-z0-9]/.test(char)) {
            if (result[char] > 0) {
                result[char]++;
            }
            else {
                result[char] = 1;
            }
        }   
    }
    return result;
}

// Refactored solution
function charCountRefactored(str) {
    let result = {};
    for (let char of str) {
        if (isAlphaNumeric(char)) {
            char = char.toLowerCase();
            result[char] = ++result[char] || 1;
        }   
    }
    return result;
}

// boolean logic based comparison of unicode character of a character is faster than using regular expression matching
function isAlphaNumeric(char) {
    const code = char.charCodeAt(0);
    if (!(code > 47 && code < 58) && // numeric [0-9]
       !(code > 64 && code < 91) && // upper alpha [A-Z]
       !(code > 96 && code < 123)) { // lower alpha [a-z]
            return false;        
       }
    return true;
}

console.log(charCount('Hello'));
console.log(charCountRefactored('Hello'));