// DATA STRUCTURES are collections of values, the relationships among them, and the functions or operations
// that can be applied to the data.
// Different Data Structures excel at different things. Some are highly specialized, while others
// (like arrays) are more generally used.
// The more time you spend as a developer, the more likely you'll need to use one of these data
// structures!
// THERE IS NO ONE "BEST" DATA STRUCTURE ... THEY ALL EXCEL IN DIFFERENT SITUATIONS!!


// ES2015 CLASS SYNTAX
// A class is a blueprint for creating objects with pre-defined properties and methods.
// In JavaScript, ES2015 Classes are just syntactic sugar over the Prototype-chain based inheritance that
// is the norm in JS.
// Data Structures are implemented as Classes!!

// The "class" keyword creates a constant, so you cannot redefine a class.
class Student {
    // The method to create new objects of the class must be called as "constructor"
    constructor(firstName, lastName) {
        // initializing instance attributes/properties
        this.firstName = firstName;
        this.lastName = lastName;
        this.lateEntries = 0;
        this.scores = []
    }
    // instance method
    fullName() {
        console.log(`Your full name is ${this.firstName} ${this.lastName}`);
    }
    // instance methods that update an instance's attribute/property
    // inside an instance method, the "this" keyword refers to the particular instnace of the class.
    markLate() {
        this.lateEntries += 1;
        console.log(`${this.firstName} ${this.lastName} has been late ${this.lateEntries} times!`);
    }
    addScores(score) {
        this.scores.push(score);
        return this.score; // instance methods can return something when invoked
    }
    // class methods use the "static" keyword, are not associated with any single instance of the class
    static enrollStudents() {
        console.log('ENROLLING STUDENTS!')
    }
}

// use the "new" keyword to create instances (objects) of a class
let firstStudent = new Student("Dio", "Brando", 1);
let secondStudent = new Student("Jotaro", "Cujoh", 1);
// invoking instance method
firstStudent.fullName();
secondStudent.fullName();
secondStudent.markLate();

// access individual instance attributes/properties
console.log(secondStudent.lateEntries);

 // calling class methods
 Student.enrollStudents();
