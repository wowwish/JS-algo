// Both STACK and QUEUE are abstract data structures that follow the LIFO (Last-In-First-Out) and
// FIFO (First-In-First-Out) rules to insert and remove data elements, respectively.


// STACK 

// A stack is an ordered LIFO data structure. The last element added to the stack will be the first
// element removed from the stack. The CALL STACK used in RECURSION is an example of a STACK data structure.
// Imagine a STACK to be a stack of plates. The last plate placed on the stack will be the first to be removed
// from the top. 

// STACKS PRESERVE THE ORDER OF ELEMENTS BY ARE NOT INDEXED. THE ORDER OF ELEMENTS IN THE STACK CAN BE USEFUL.

// Stacks are used to manage function invocations and to implement undo/redo functionality in apps.
// History objects (visited routes) in browsers is treated list a stack as well (go back and go forward).


// THERE IS MORE THAN ONE WAY TO IMPLEMENT A STACK AS IT IS AN ABSTRACT CONCEPT.
// * ARRAY IMPLEMENTATION OF STACK IN JS:
// we can treat an in-built JS array as a Stack
// THE MOST EFFICIENT WAY TO USE AN ARRAY AS A STACK IS TO PUSH AND POP ELEMENTS FROM THE END OF THE
// ARRAY TO PREVENT RE-INDEXING
// stack from the end
let endStack = []; 
// use .push() to populate endStack from the end
endStack.push("google.com");
endStack.push("instagram.com");
endStack.push("youtube.com");
console.log(endStack);
// use the .pop() to remove the last added element from the end of endStack
console.log(endStack.pop());


// ADDING AND REMOVING ELEMENTS FROM THE BEGINING OF AN ARRAY THAT IS TREATED AS A STACK
// IS INEFFICIENT BECAUSE OF HOW ARRAYS WORK (ISSUES WITH UPDATING ARRAY INDICES)
// stack from the begining
let beginStack = [];
// use .unshift() to populate beginStack from the start
beginStack.unshift("create new file");
beginStack.unshift("resize file");
beginStack.unshift("processed the image");
console.log(beginStack);
// use the .shift() to remove the last element added to the beginStack
console.log(beginStack.shift());




// * SINGLY LINKED-LIST IMPLEMENTATION OF STACK IN JS:
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
// The stack is supposed to have constant time for push and pop operations. 
// Recall that singly-linked lists have O(N) complexity for the pop operation.
// here, we actually use the shift() and unshift() methods of a singly-linked list and 
// just call them as push and pop.
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(val) {
        // create a new Node with the passed value. If the stack is empty, set the first and last properties
        // to be the newly created Node. 
        // If there is atleast one Node already in the stack, create a variable that stores the current
        // first property of the stack. Then, reset the stack's first property to be the newly created Node.
        // set the next property of the newly created Node as the previously saved first property of the stack.
        // increment the stack length property by 1 and return it
        let newNode = new Node(val);
        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
        }
        else {
            newNode.next = this.first;
            this.first = newNode;
        }
        return ++this.size; // Remember the ++ operator increments the size property inplace here and then
        // returns it. So, the size property will stay with its incremented value.
    }
    pop() {
        // if the stack is empty, return null, otherwise, store the first property of the stack in a
        // variable. if there is only one Node in the stack, set the first and last properties as null
        // If there are > 1 Nodes, set the stack's first property to be the current first's next.
        // decrement the stack size by 1. Return the value of the removed Node.
        if (this.size === 0) return null;
        let removedNode = this.first;
        if (this.first === this.last) {
            this.first = null;
            this.last = null; // set first and last property of stack to null if it has only one element.
            // stack cannot have the same Node as first and last (the same Node can be head and 
            // tail in linked-list)
        } else {
            // if the stack has more than one Node, set the first to the next Node in the stack
            this.first = this.first.next;
        }
        // decrement the stack size and return the removed first Node.
        this.size--;
        return removedNode.val;
    }
}


let stack = new Stack();
stack.push("first");
stack.push("second");
stack.push("third");
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());



// TIME COMPLEXITY OF STACKS
// INSERTION - O(1) // last element in is first element out, so always add element to begining
// REMOVAL - O(1) // last element in is first element out, so always remove element from begining
// SEARCHING - O(N) due to traversal of the entire stack in worst case
// ACCESS - O(N) due to traversal of the entire stack in worst case




// QUEUES

// A Queue is a FIFO (First-In-First-Out) data structure. Think of people waiting in line. Queues are used
// in online multiplayer games for matching players for a game session, background tasks prioritization,
// uploading resources, printing / task processing.

// An element is added to the queue using an ENQUEUE method and an element is removed from the queue 
// using a DEQUEUE method. These are the standard terms used to refer to populating and remove from the
// QUEUE.

// QUEUES CAN ALSO BE IMPLEMENTED IN MANY WAYS JUST LIKE STACKS.

// IF YOU ARE CONCERNED ABOUT PERFORMANCE, IT IS DEFINITELY RECOMMENDED TO CREATE YOUR OWN QUEUE
// DATA STRUCTURE IMPLEMENTATION INSTEAD OF USING ARRAY AS A QUEUE BECAUSE IN THE CASE OF AN ARRAY
// AS A QUEUE, REINDEXING WILL HAPPEN IRRESPECTIVE OF WETHER YOU ARE INSERT FROM BEGINING AND REMOVE
// FROM END, OR, INSERT FROM END AND REMOVE FROM BEGINING.

// * QUEUE IMPLEMENTATION IN JS USING IN-BUILT ARRAYS

// add from the end and remove from the begining - INEFFICIENT METHOD DUE TO ARRAY REINDEXING 
// TIME CONSUMING SINCE ARRAY IS REINDEXED EVERYTIME AN ELEMENT IS REMOVED FROM THE BEGINING.
let q = [];
// use .push() to insert / enqueue / populate from the end of array
q.push("FIRST");
q.push("SECOND");
q.push("THIRD");
console.log(q);
// use .shift() to remove / dequeue from the begining of array
console.log(q.shift());
console.log(q.shift());
console.log(q.shift());


// add from begining and remove from the end - INEFFICIENT METHOD DUE TO ARRAY REINDEXING
// TIME CONSUMING SINCE ARRAY IS REINDEXED EVERYTIME AN ELEMENT IS ADDED FROM THE BEGINING.

let qu = [];
// use .unshift() to add / enqueue elements from the begining of the array
qu.unshift("FIRST");
qu.unshift("SECOND");
qu.unshift("THIRD");
// use.pop() to remove / dequeue from the end of the array
console.log(qu);
console.log(qu.pop());
console.log(qu.pop());
console.log(qu.pop());



// * SINGLY LINKED-LIST IMPLEMENTATION OF A QUEUE - MOST EFFICIENT IMPLEMENTATION OF QUEUE

// IF WE ADD NODES FROM THE BEGINING, WE HAVE TO REMOVE NODES FROM THE END (THE TAIL) OF SINGLY LINKED-LIST
// AND SET THE SECOND-LAST ELEMENT AS THE NEW TAIL WHICH INVOLVES TRAVERSING THE LINKED-LIST TILL THE SECOND
// LAST ELEMENT. 
// SO, WE ADD NODES FROM THE END AND REMOVE NODES FROM THE BEGINING (THE HEAD) OF THE LINKED-LIST


class Queue {
    constructor() {
        this.size = 0;
        this.first = null;
        this.last = null;
    }
    // instance method to add nodes to the queue from the end
    enqueue(val) {
        // create a new Node using the value passed. If the queue is empty, set the first and last property
        // to this new Node.
        // otherwise, set the next property on the current last to be the new Node and then set the new
        // last property of the queue to this new Node.
        // finally, increment the size of the queue and return this incremented size
        let newNode = new Node(val);
        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
        }
        else {
            this.last.next = newNode;
            this.last = newNode;
        }
        return ++this.size;
    }
    // instance method to remove nodes from the begining of the queue
    dequeue() {
        // return null if the queue is empty. otherwise, store the first property in a variable.
        // store the current first, which is to be removed, in a variable.
        // if the queue contains only one Node, set the first and last to null. 
        // otherwise, update the first to the next of the current first.
        // decrement the size and return only the value of the removed Node.
        if (this.size === 0) return null;
        let removedNode = this.first;
        if (this.first === this.last) {
            this.first = null;
            this.last = null;
        }
        else {
            this.first = this.first.next;
        }
        --this.size;
        return removedNode.val;
    }
}



let que = new Queue();
que.enqueue("FIRST");
que.enqueue("SECOND");
que.enqueue("THIRD");
console.log(que);
console.log(que.dequeue());
console.log(que.dequeue());
console.log(que.dequeue());
console.log(que.dequeue());



// TIME COMPLEXITY OF QUEUE
// INSERTION - O(1) as element is always added to the end
// REMOVAL - O(1) as element is always removed from the begining
// SEARCHING - O(N) due to potentially traversing the entire queue
// ACCESS - O(N) due to potentially traversing the entire queue