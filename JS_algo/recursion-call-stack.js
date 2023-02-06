// THE FUNCTION CALL STACK
// In most Porgramming langugages, the STACK data structure is used to manage function calls and 
// process them in the right order.
// Any time a function is invoked, it is placed (pushed) on top of the call stack. When JS sees the
// "return" keyword or when the function ends, the COMPILER will remove the top item (pop) the 
// function from the STACK.

function takeShower() {
    return "Showering";
}

function eatBreakfast() {
    let meal = cookFood();
    return `Eating ${meal}`;
}

function cookFood () {
    let items = ["Oatmeal", "Eggs", "Protein Shake"];
    // pick a random element of the array
    return items[Math.floor(Math.random() * items.length)];
}

// you can see while stepping into the call stack: cookFood is on top of the stack above eatBreakfast which
// is itself above wakeUp.
function wakeUp () {
    takeShower();
    eatBreakfast();
    console.log("Ok ready to go to work!")
}


wakeUp(); // Add a breakpoint here in debug mode and go through the call stack

// When we use functions, we are used to seeing functions being pushed on the call stack and popped off
// when they are done. When we write recursive functions, we keep pushing new functions
// onto the call stack!