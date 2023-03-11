// PRIORITY QUEUE

// It is a data structure where each element has an associated priority.
// Elements with higher priority are served before elements with lower priorities.
// Oftentimes, a lowest number denotes highest priority and the highest number denotes the lowest priority.

// A NAIVE PRIORITY QUEUE: 
// Use a list/array of elements with each element also having a priority number.
// We will have to iterate through the entire list/array to identify the highest priority element
// (with the lowest priority number) - INEFFICIENT!!

// A BETTER APPROACH IS TO USE A HEAP AS A PRIORITY QUEUE:
// INSERTION INTO AND REMOVAL FROM THE HEAP HAS A TIME COMPLEXITY OF O(logN)


// PRIORITY QUEUE USING A MINIMUM BINARY HEAP (every parent is smaller than their children):
// A lower priority number means a higher precedence over other nodes with higher priority numbers.
class Node {
    constructor(val, p) {
        this.value = val;
        this.priority = p;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    // instance method to insert an element into the right spot of the priority queue
    enqueue(val, p) {
        let newNode = new Node(val, p);
        this.values.push(newNode)
        let currentIdx = this.values.length - 1; // the last element index where the new Node is present
        // loop to bubble up the newly inserted node to a spot where its priority number < its children node's 
        // priority numbers (remember that lower priority number indicates a higher precedence).
        while(currentIdx > 0) {
            // check the parent Node of the inserted new child Node.
            let parentIdx = Math.floor((currentIdx - 1) / 2);
            if (this.values[currentIdx].priority >= this.values[parentIdx].priority) break;
            let temp = this.values[currentIdx];
            this.values[currentIdx] = this.values[parentIdx];
            this.values[parentIdx] = temp;
            currentIdx = parentIdx;
        }
    }
    // instance method to remove the next highest priority (lowest priority number) node from the priority queue
    dequeue() {
        // Handle edge cases when the values array is empty or has only one element
        if (this.values.length <= 1) return this.values.pop();
        // replace the root node (maxmum precedence, minimum priority number) with the last element of the 
        // MinBinaryHeap which has the least priority. Then sink-down the new root to its right spot.
        const maxPriorityNode = this.values[0];
        this.values[0] = this.values.pop();
        let currentIdx = 0;
        let childIdx = null;
        while (true) {
            let leftChildIdx = (currentIdx * 2) + 1;
            let rightChildIdx = (currentIdx * 2) + 2;
            if ((leftChildIdx < this.values.length) && (rightChildIdx < this.values.length)) {
                childIdx = this.values[leftChildIdx].priority < this.values[rightChildIdx].priority ? leftChildIdx : rightChildIdx;
            }
            else if (leftChildIdx < this.values.length) childIdx = leftChildIdx;
            else if (rightChildIdx < this.values.length) childIdx = rightChildIdx;
            else break;
            if (this.values[currentIdx].priority > this.values[childIdx].priority) {
                let temp = this.values[currentIdx];
                this.values[currentIdx] = this.values[childIdx];
                this.values[childIdx] = temp;
                currentIdx = childIdx;
            }
            else break;
        }
        return maxPriorityNode;
    }
}


let ER = new PriorityQueue();
ER.enqueue("common cold", 5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("high fever", 4);
ER.enqueue("broken arm", 2);
ER.enqueue("glass in foot", 3);
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.dequeue());
console.log(ER.values);