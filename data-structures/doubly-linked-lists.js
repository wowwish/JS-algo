// DOUBLY-LINKED LIST

// It is also an ordered collection of elements (Nodes) similar to a singly linked-list, 
// but each Node (element) in a doubly linked-list is connected to both the previous 
// and the next Nodes.

// DOUBLY LINKED-LISTS TAKE UP MORE MEMORY THAN SINGLY LINKED-LISTS. THAT IS ITS MAIN DRAWBACK.
// BUT IT OFFERS MORE FLEXIBILITY AS A DATA STRUCTURE COMPARED TO SINGLY LINKED-LIST TO PERFORM
// OPERATIONS ON IT.

class Node {
    constructor(val) {
        this.val = val; // value of this Node
        this.next = null; // connection to next Node
        this.prev = null; // connection to previous Node
    }
}

class DoublyLinkedList {
    constructor() {
        // initiate linked-list properties
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    // instance method to print out the doubly-linked list, assuming that all connections are correctly set
    print() {
        let arr1 = [];
        let arr2 = [];
        let currentNodeStart = this.head; 
        let currentNodeEnd = this.tail;
        while((currentNodeStart != null) || (currentNodeEnd != null)) {
            if (currentNodeStart) {
                arr1.push(currentNodeStart.val);
                currentNodeStart = currentNodeStart.next;
            }
            if (currentNodeEnd) {
                arr2.push(currentNodeEnd.val);
                currentNodeEnd = currentNodeEnd.prev;
            }
        }
        let sanityCheck = false;
        if (arr1.length != arr2.length) {
            console.log("issues with connections in doubly linked-list");
            return;
        }
        else{
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[arr2.length - 1 - i]) {
                    console.log(`Sanity check failed at index ${i}!`);
                    return;
                }
            }
            sanityCheck = true;
        }
        if (sanityCheck) console.log(arr1.join('-> <-'));
    }
    // instance method to add a new Node of given value to end of the doubly-linked list 
    push(val) {
        // create a new Node with the value passed in. If the linked-list is empty, set the head
        // and tail of the linked-list as the new Node.
        // otherwise, set the next property of current tail as the new Node and set the prev
        // property of the new Node as the current tail
        // then update the tail as the new Node
        // finally increment the length and return the linked-list
        let newNode = new Node(val);
        if (!this.head) { // if head is not null
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = this.tail; // attach new Node's prev connection to tail of linked-list
            this.tail.next = newNode; // attach current tail's next connection to the new Node
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    // instance method to remove a Node from the end of the doubly linked-list
    pop() {
        // if the linked-list is empty, return undefined
        // store the current tail in a variable
        // if the linked-list has only one element, set the head and tail to be null
        // otherwise, set the new tail as current tail's prev
        // set the next of new tail Node as null to sever the connection of the old tail 
        // Node with the linked-list. Also set the removed Node's prevto null for security.
        // Finally, decrement the length and return the removed Node.
        if (this.length === 0) return undefined;
        let removedNode = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.tail = this.tail.prev; // tail is the second-last Node in the linked-list now
            this.tail.next = null; // sever connection of new tail with old tail Node
            // sever the removed Node's connection to the linked-list through prev for securing the linked-list
            removedNode.prev = null; 
        }
        this.length--;
        return removedNode;
    }
    // instance method to remove a node from the begining of the doubly-linked list
    shift() {
        // if the linked-list is empty, return undefined
        // store the current head in a variable
        // if the linked-list has only one element, set the head and tail to be null
        // otherwise set the new head as current head's next
        // set the prev of new head Node as null to sever the connection of the old head 
        // Node with the linked-list. Also, set the removed old head Node's next to null.
        // Finally, decrement the length and return the removed Node.
        if (this.length === 0) return undefined;
        let removedNode = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            this.head = this.head.next; // head is now the second Node in the linked-list
            this.head.prev = null; // sever the connection of new head Node with the old head Node
            // sever the removed Node's connection to the linked-list through next for securing the linked-list
            removedNode.next = null;
        }
        this.length--;
        return removedNode;
    }
    // instance method to add a Node to the begining of the doubly linked-list
    unshift(val) {
        // create a new Node with the passed value
        // if the linked-list is empty, set the head and tail as the newly created Node
        // otherwise, set the current head's prev to the new Node
        // set the new Node's next to the current head and set the new head to this new Node
        // finally, increment the length and return the updated doubly linked-list
        let newNode = new Node(val);
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    // instance method to return the Node at the given index in the doubly linked-list
    get(index) {
        // if the passed index is < 0 or >= this.length, return null
        // otherwise, check if the index is <= half the length of the linked-list. If this is the case
        // start from the head and traverse till you reach the Node at the index, else, start from the
        // tail and traverse the doubly linked-list in the reverse direction till you reach the Node 
        // at the index. Finally return the Node at the index once it is found.
        // REMEMBER: index is 0 based
        if ((index < 0) || (index >= this.length)) return null;
        // if the index is closer from the begining of the doubly linked-list
        if (index <= (this.length/2)) {
            var currentNode = this.head; // declared as var to access outside this block scope
            // current Node is already at index 0, hence, we only iterate till (i < index)
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.next;
            }
        }
        // if the index is closer from the end of the doubly linked-list
        else {
            console.log("FROM THE END");
            var currentNode = this.tail; // declared as var to access outside this block scope
            // current Node is already at index (length -1), hence, we only iterate 
            // till (i < this.length - 1 - index) times and traverse the linked-list in reverse direction
            for (let i = 0; i < this.length - 1 - index; i++) {
                currentNode = currentNode.prev;
            }
        }
        return currentNode;
    }
    // instance method to modify the value of the Node at the given index in the linked-list to the
    // given value
    set(index, val) {
        // use the get() method to get to the Node at the given index. If the Node is not null,
        // set its value to the passed value and return true. otherwise, (the Node is null) return false.
        // REMEMBER: index is 0 based
        foundNode = this.get(index);
        if (foundNode != null) {
            foundNode.val = val;
            return true;
        }
        return false;
    }
    // instance method to insert a Node with the passed value at the given index in the doubly linked-list
    insert(index, val) {
        // check for validity of the passed index and return false if index < 0 or index > length
        // if index is 0, use unshift() method to insert a new Node with the passed value. return a boolean
        // corresponding to the output of the unshift() operation.
        // if index is equal to length, use push() method to insert a new Node with the passed value. return 
        // a boolean corresponding to the output of the push() operation.
        // otherwise, use the get() method to get the Node at the passed index, create a new Node
        // with the passed value. update the next of the prev Node to Node at index to the new Node first,
        // and then prev of the Node at index to the new Node that is to be inserted.
        // Set the new Node's next to the Node at index and the new Node's prev to the Node before 
        // Node at index. Finally, increment the length and return true.
        if ((index < 0) || (index > this.length)) return false;
        if (index === 0) return Boolean(this.unshift(val));
        if (index === this.length - 1) return Boolean(this.push(val));
        // create a new Node with the passed value
        let newNode = new Node(val);
        // get the Node that will become the next of the new Node and the Node that will become the prev of
        // the new Node from the index location.
        let nextNode = this.get(index);
        let previousNode = nextNode.prev;
        // update the connections of the previous Node and next Node at the insertion index
        previousNode.next = newNode;
        nextNode.prev = newNode;
        // update the connections of the inserted Node
        newNode.prev = previousNode;
        newNode.next = nextNode;
        this.length++; // increment length after insertion
        return true;
    }
    // instance method to remove a Node at the given index in the doubly linked-list
    remove(index) {
        // if the passed index < 0 or >= length return undefined
        // if the passed index is 0, use shift() to remove the Node at index
        // if the passed index is (length - 1), use pop() to remove the Node at index
        // otherwise, use the get() method to retrieve the Node at index. 
        // set the next of the Node before the index Node as the index Node's next
        // set the prev of the successive Node to the index Node as the prev of Node at index
        // decrement the length of the linked-list.
        // Finally, set the prev and next of Node at index as null and return the Node
        if ((index < 0) || (index > this.length)) return undefined;
        if (index === 0) return Boolean(this.shift());
        if (index === this.length - 1) return Boolean(this.pop());
        // get the Node at index that should be removed
        let removedNode = this.get(index);
        // sever the connections of doubly linked-list with the Node to be removed
        // let beforeNode = removedNode.prev;
        // let afterNode = removedNode.next;
        // beforeNode.next = afterNode;
        // afterNode.prev = beforeNode;
        removedNode.next.prev = removedNode.prev;
        removedNode.prev.next = removedNode.next;
        this.length--;
        // sever connections (lingering references) of the removed node to the doubly-linked list
        removedNode.next = null;
        removedNode.prev = null;
        return removedNode;
    }
    // instance method to reverse the doubly linked-list
    reverse(){
        // if length of the linked-list is <= 1, then return the doubly linked-list as it is.
        // otherwise, set a variable as the current tail Node and use it to swap the head and tail Nodes
        // of the doubly linked-list
        // then loop through the doubly-linked list from the current Node (new head) towards the new tail (old head)
        // get the previous Node of the current Node
        // swap the current Node's prev and next with the help of the previous Node variable and next Node
        // variables. 
        // Then, update current Node as the previous Node and the previous Node as the next Node to move 
        // further inside the linked-list (in the reverse direction). Repeat until current Node becomes null,
        // ie, the old head (current tail after swapping) is reached.
        if (this.length <= 1) return this;
        // swap head and tail and set the current Node as the old tail
        let currentNode = this.tail;
        this.tail = this.head;
        this.head = currentNode;
        let previousNode;
        let nextNode = currentNode.next;
        while (currentNode) { // while currentNode is not null
            previousNode = currentNode.prev; // get the previous Node
            // set current Node's prev as the next Node
            currentNode.prev = nextNode;
            // current Node's next now becomes previous Node
            currentNode.next = previousNode;
            // move both current Node and next Node one step to the left in the doubly linked-list
            nextNode = currentNode;
            currentNode = previousNode;
        }
        return this;
    }
    reverseAlternate() {
        // start from the head this time
        let currentNode = this.head;
        this.head = this.tail;
        this.tail = currentNode;
        let nextNode = null;
        let previousNode = null;
        for(let i = 0; i < this.length; i++) { // using for loop simplified some complexity in reversing
            nextNode = currentNode.next;
            currentNode.next = previousNode;
            currentNode.prev = nextNode;
            previousNode = currentNode;
            currentNode = nextNode;
        }
        return this;
    }  
}


// let list = new DoublyLinkedList();
// list.unshift("LAST ITEM!");
// list.unshift("MIDDLE ITEM!");
// list.unshift("FIRST ITEM!");
// list.push("ACTUALLY LAST ITEM!");
// list.push("FINAL LASTEST ITEM!");
// console.log(list);
// list.print();

let list2 = new DoublyLinkedList();
list2.push(1);
list2.push(3);
list2.push(4);
list2.insert(1, 2);
// console.log(list2.remove(1));
list2.print();
// console.log(list2.get(3));
list2.reverse();
list2.print();



// TIME COMPLEXITIES OF THE DOUBLY LINKED-LIST
// INSERTION - O(1)
// REMOVAL - O(1) (this is an advantage over the singly linked-list)
// SEARCHING - O(N) or O(N/2) depending on optimization
// ACCESS - O(N) or O(N/2) depending on optimization
// KEEP IN MIND THAT DOUBLY LINKED-LISTS TAKE UP MORE MEMORY THAN SINGLY LINKED-LISTS 
// BUT THEY OFFER BETTER REMOVAL, SEARCH AND ACCESS CAPABILITIES.