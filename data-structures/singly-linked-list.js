// SINGLY-LINKED LIST
// It is an ordered data structure with a bunch of elements of that contains "head", "tail" and "length" properties.
// Linked lists consist of "nodes", and each "node" has a "value" and a "pointer" to
// another "node" or null.
// Unlike an array, a linked list contain no indices. However, one element is connected to the next one, all
// the way until the end. Insertion and deletion of elements at the begining or the end in a linked list 
// (push, pop, shift, unshift) is not as expensive as in arrays, however, linked lists donot provide random 
// access to elements through indices like in arrays. So, accessing elements is expensive in linked lists.

// class for each "node" of the linked list - with a piece of data (value) and a reference to the 
// next node (next)
class Node {
    constructor(val) {
        this.val = val;
        this.next = null; // reference points to null in an isolated Node.
    }
}

// Creating the linked list chain
// let first = new Node("Hi");
// first.next = new Node("there");
// first.next.next = new Node("how");
// first.next.next.next = new Node("are");
// first.next.next.next.next = new Node("you");
// console.log(first);


// our singly-linked list class
class SinglyLinkedList {
    constructor() {
        this.length = 0; // the length attribute of the empty singly-linked list is set to 0
        this.head = null; // the head attribute of the empty singly-linked list is set to null
        this.tail = null; // the tail attribute of the empty singly-linked list is set to null
    }
    // instance method to print out the values of linked-list
    print() {
        let arr = [];
        let currentNode = this.head;
        while(currentNode) {
            arr.push(currentNode.val);
            currentNode = currentNode.next;
       }
       console.log(arr.join(' -> '));
    }
    // instance method to add element to end of singly-linked list
    push(val) {
        // push() method adds an element to the end of the singly-linked list. It first creates a new
        // Node with the passed value and if the singly-linked list is empty, both the head and tail
        // are set to refer to this newly created Node. If the singly-linked list already has values,
        // the current tail Node's "next" property is set to refer to this new Node and this new Node
        // is set as the tail of the linked list.
        let newNode = new Node(val);
        if (!this.head) { // when the linked-list is empty (null is a falsy value)
            this.head = newNode;
            // both the head and tail should point to the same Node when it is added to an empty linked-list
            this.tail = this.head; 
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1; // increment the length of the linked-list after any insertion operation
        return this; // return the updated linked-list
    }
    // instance method to remove a Node from the end of the linked-list
    pop() {
        // if linked-list is empty, return undefined. Otherwise, loop through the linked-list till
        // the second-last Node of the linked-list and set its next to null. Then, set the tail
        // to this second-last node. Finally, decrement the "length" by 1 and return the older tail Node.
        if (!this.head) return undefined; // nothing to pop in empty linked-list, so return undefined
        else {
            let currentTail = this.tail;
            // new tail will be the second-last Node in the linked-list.
            let newTailNode = this.head; // initialize the second-last Node of the linked-list
            // traverse the linked-list till you reach the second-last Node whose next points 
            // to a tail Node which has next = null;
            while(currentTail.next) { // while the next of current Node is not null (not a tail Node)
                newTailNode = currentTail;
                currentTail = current.next;
            }
            newTailNode.next = null; // set new Tail (second-last) Node's next to null
            this.tail = newTailNode; // set the new Tail to the second-last node
            this.length--; // decrenemt the length of linked list by 1
            // handle the edge case of popping a single element linked-list
            if (this.length === 0) {
                // reset head and tail to be null
                this.head = null;
                this.tail = null;
            }
            return currentTail; // return old tail Node
        }
        
    }
    // instance method to remove a new node from the begining of the linked-list
    shift() {
        // if there are no nodes in the linked-list (empty), return undefined.
        // otherwise, store the current head Node in a variable, set the new head to
        // the current head Node's next, decrement the linked-list length by 1 and return
        // the value of the old head Node
        if (!this.length) return undefined;
        else {
            let removedHead = this.head; // get the old head Node that needs to be removed
            this.head = removedHead.next; // set new head's next to old head's next
            this.length--; // decrement the linked-list length by 1
            // handle the edge-case of shifting from a single-element linked-list
            if (this.length === 0) this.tail = null;
            return removedHead; // return the old head Node
        }
    }
    // instance method to add a new node to the begining of the linked-list
    unshift(val) {
        // create a new Node with value passed to the method. If the linked-list is empty, both
        // the head and tail should be set to this newly created Node. Otherwise, set the new Node's 
        // next to the current head of the linked-list. Set the new Node as the head of the linked-list.
        // increment the length of the linked-list by 1. Finally, return the linked list. 
        let newNode = new Node(val);
        // if the linked-list is empty, the head and tail should be the newly inserted Node
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else { // if the linked-list is non-empty
            newNode.next = this.head; // Set the new Node's next as the current head
            this.head = newNode; // set the head of the link-list to the newly inserted Node
        }
        this.length++; // increment the length of the linked-list
        return this; // return the updated linked-list
    }
    // instance method to retrieve a Node by its position in the linked-list
    get(index) {
        // take the index passed to the method and return null if the index < 0 or >= length
        // otherwise, loop through the linked-list until you reach the index and return
        // the node at that specific index
        // REMEMBER: index is 0 based
        if ((index < 0) || (index >= this.length)) return null;
        let currentNode = this.head;
        // traverse the linked-list till you reach the Node at the index
        // current Node is already at index 0, hence, we only iterate till (i < index)
        for (let i = 0; i < index; i++) { 
            currentNode = currentNode.next;
        }
        return currentNode; // return the Node at the index
    }
    // instance method to change the value of a Node based on its position in the linked-list
    set(index, val) {
        // take the index passed to the method and return null if the index < 0 or >= length
        // use the get() method to find the Node at the given index. If the Node is not found,
        // return false. If the Node is found, update the value of the node to the new passed value
        // in the method call and return true
        // REMEMBER: index is 0 based
        let foundNode = this.get(index);
        if (foundNode) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    // instance method to add a Node to the linked-list at a specific position
    insert(index, val) {
        // if the passed index < 0 or > length, return false
        // if the index is the same as the length of the linked-list, add a Node to the end of the
        // linked-list. If the index is 0, unshift a new node to the start of the list
        // otherwise, use the get() method to access the node at (index - 1) and set the next property
        // of this Node as the new Node created using the passed value. The next of the new Node should
        // be the previous next of the Node at (index - 1). Finally, increment the length and return true.
        // REMEMBER: this.length is 1 based and index is 0 based.
        if ((index < 0) || (index > this.length)) return false;
        else if (index === 0) return Boolean(this.unshift(val)); // insert() should only return a Boolean
        else if (index === this.length) return Boolean(this.push(val)); // insert() should only return a Boolean
        let newNode = new Node(val); // Node to be inserted
        let previousNode = list.get(index - 1); // the Node currently at the insertion index
        let nextNode = previousNode.next; // temporary variable to store the next of previous Node
        previousNode.next = newNode;
        newNode.next = nextNode;
        this.length++;
        return true;
    }
    // instance method to remove a node from a linked-list at a specific position
    remove(index) {
        // if the index passed is < 0 or > length, return undefined
        // if the index is (length - 1), use pop() to remove the Node at the index 
        // from the linked-list
        // if the index is 0, use this.shift() to remove the Node at index 0
        // otherwise, use get() to access the Node at (index - 1), set the next property
        // of the Node at (index - 1) as the next of its next Node.
        // Finally, decrement the length by 1 and return the removed Node.
        // REMEMBER: this.length is 1 based and index is 0 based
        if ((index < 0) || (index >= this.length)) return undefined; // handle invalid index
        // pop when index is for the last Node of linked-list
        if (index === this.length - 1) return Boolean(this.pop());
        // shift when index is for the first Node of linked-list
        if (index === 0) return Boolean(this.shift());
        // for other indices, get the previous Node and set its next property to the next Node 
        // of the Node at index
        let prevNode = this.get(index - 1);
        let removedNode = prevNode.next;
        prevNode.next = removedNode.next;
        // decrement length
        this.length--;
        // for security reasons, sever the connection of the removed Node with the linked-list
        removedNode.next = null; 
        return removedNode;
    }
    // instance method to reverse the linked-list in-place
    reverse() {
        // swap the head and the tail
        // start from the head with three variables - the current Node, previous Node and next Node.
        // loop through the linked-list and set the next Node as the next property of current Node
        // set the next property of current Node to the previous Node.
        // set the previous Node as current Node
        // set current Node as the next Node
        let temp = this.head; // for swapping head and tail
        this.head = this.tail;
        this.tail = temp;
        let previousNode = null;
        let currentNode = this.tail; // start from the swapped tail
        let nextNode;
        while(currentNode) { // while current Node is not null
            nextNode = currentNode.next;
            currentNode.next = previousNode; // reverse the two Node connection
            // Now, move current and previous Nodes by one step
            previousNode = currentNode;
            currentNode = nextNode;
        }
        return this;
    }
    // recursive approach to reverse linked-list
    // we move step by step changing the current Node to point to its previous Node across the linked-list
    reverseRecursive(prev=null, current=this.head) {
        // if the current Node points to a valid (non-null) next Node, do a recursive call
        // with the current Node and its next Node
        if(current.next){
            this.reverseRecursive(current, current.next); // recursive call stack is built here
        }
        // otherwise (the next Node is null which means the current Node is the tail), swap the 
        // head and tail. This is the base case or the termination condition.
        else {
            this.tail = this.head;
            this.head = current;
        }
        // The current Node's next is set to previous Node
        current.next = prev;
    }
}

let list = new SinglyLinkedList();
list.push("Hello");
list.push("GOODBYE");
list.push("!");
list.push("<3");
list.push(":)");
// console.log(list);
// console.log(list.pop());
// list.shift();
// list.shift();
// list.shift();
// console.log(list);
// console.log(list.unshift("Hey!"));
// console.log(list.get(4));
// console.log(list.set(2, "!!!"));
// console.log(list.get(2));

let list2 = new SinglyLinkedList();
list2.push(1);
list2.push(2);
list2.push(3);
list2.print();
list2.reverseRecursive();
list2.print();
console.log(list2.head);
console.log(list2.tail);





// TIME COMPLEXITIES OF SINGLY-LINKED LIST
// INSERTION - O(1)
// REMOVAL - O(1) in case of removal from very begining of linked-list or O(N) if removing near the end of
// the linked-list because we have to traverse till we reach the Node to be removed
// SEARCHING - O(N) as we need to traverse potentially till the end of the linked-list to search
// ACCESS - O(N) due to reasons same as above
// SINGLY LINKED-LISTS ARE AN EXCELLENT ALTERNATIVE ARRAYS WHEN INSERTION AND DELETION AT THE
// BEGINNING ARE FREQUENTLY REQUIRED.
