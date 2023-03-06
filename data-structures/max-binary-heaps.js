// HEAPS ARE ANOTHER CATEGORY OF TREES - THEY ARE VERY SIMILAR TO A BINARY SEARCH TREE
// WITH SOME DIFFERENT RULES. 
// SIMILAR TO A BINARY TREE, A PARENT NODE IN A BINARY HEAP CAN HAVE AT MOST TWO CHILDREN.
// BUT THERE IS NOT INHERENT ORDER TO THE NODES OF A BINARY HEAP LIKE IN A BINARY SEARCH TREE, ie,
// THE VALUE OF LEFT NODE IS NOT ALWAYS SMALLER THAN THE VALUE OF THE CURRENT NODE AND THE VALUE
// OF THE RIGHT NODE IS NOT ALWAYS LARGER THAN THE VALUE OF THE CURRENT NODE.

// IN A MAX BINARY-HEAP, PARENT NODES ARE ALWAYS LARGER THAN THEIR CHILD NODES, BUT THERE ARE
// NO GUARANTEES BETWEEN SIBLINGS. 
// IN A MIN BINARY HEAP, PARENT NODES ARE ALWAYS SMALLER THAN THEIR CHILD NODES, BUT THERE ARE 
// NO GUARANTEES BETWEEN SIBLINGS.

// A BINARY HEAP IS AS COMPACT AS POSSIBLE. ALL THE CHILDREN OF EACH NODE ARE AS FULL AS THEY
// CAN BE AND LEFT CHILDREN ARE FILLED OUT FIRST.

// BINARY HEAPS ARE VERY COMMONLY USED TO IMPLEMENT PRIORITY QUEUES, WHICH ARE VERY COMMONLY USED
// DATA STRUCTURES. BINARY HEAPS ARE ALSO USED IN GRAPH TRAVERSAL ALGORITHMS.

// A BINARY HEAP CAN BE IMPLEMENTED USING A BINARY TREE DATA STRUCTURE WITH A ROOT AND NODES WITH
// A LEFT, A RIGHT, AND A VALUE.
// THERE IS ALSO AN EASIER WAY OF STORING BINARY HEAPS - USING A LIST / ARRAY !!
// THE ROOT OF THE BINARY HEAP WILL BE AT INDEX 0 OF THE LIST / ARRAY. INDICES 1 AND 2 WILL THEN HAVE
// THE CHILDREN OF THE ROOT NODE OF THE BINARY HEAP AND SO ON.
// FOR ANY NODE OF THE BINARY HEAP AT INDEX 'N' INSIDE OF THE ARRAY / LIST, ITS LEFT CHILD IS STORED
// IN INDEX '2N + 1' AND ITS RIGHT CHILD IS STORED IN INDEX '2N + 2' OF THE ARRAY / LIST. THIS PATTERN
// IS FOLLOWED.
// SIMILARLY, GIVEN A CHILD NODE FROM INDEX 'N' OF THE ARRAY / LIST REPRESENTATION OF THE BINARY HEAP, 
// ITS PARENT WILL BE AT INDEX '(N - 1) / 2' IF 'N' IS ODD OR AT INDEX '(N - 2) / 2' IF 'N' IS EVEN.



// IMPLEMENTATION OF MAX BINARY HEAP
class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }
    // instance method to add a value to the MaxBinaryHeap
    insert(val) {
        // push the passed value to the end of the values array
        // bubble up - move the value to a node index in the array where all children nodes of
        // the node of this value have values lower than the inserted value.
        // This is achieved by comparing the inserted value with the value of its parent node
        // (the node at Math.floor(2n - 1), where n is the last index of values) and then
        // swap the inserted value with the parent node value if inserted value > parent node's value
        // continue this swapping operation until inserted value < parent node's value.
        this.values.push(val);
        let currentInd = this.values.length - 1;
        let parentInd = Math.floor((currentInd - 1) / 2);
        // While loop to keep swapping until the value is inserted in the proper position in the 
        // MaxBinaryHeap values array - Bubbling Up.
        while(this.values[currentInd] > this.values[parentInd]) {
            let temp = this.values[currentInd];
            this.values[currentInd] = this.values[parentInd];
            this.values[parentInd] = temp;
            currentInd = parentInd;
            parentInd = Math.floor((currentInd - 1) / 2);
        }
    }
    // instance method to remove the root from the MaxBinaryHeap (the maximum element or the highest value
    // in a MaxBinaryHeap is the root and the minimum or the lowest value is the root in a MinBinaryHeap)
    // and replace it with the current last value in the MaxBinaryHeap (or the most recently added value).
    // Then, sink down / bubble down / percolate down / sift down / cascade down / heapify down: adjust down 
    // the MaxBinaryHeap by swapping the root with its children until the root gets the maximum or highest
    // value in the MaxBinaryHeap.
    ExtractMax() {
        let max = this.values.shift();
        this.values.unshift(this.values.pop());
        let currentIdx = 0;
        let childIdx = this.values[1] > this.values[2] ? 1 : 2
        while (this.values[currentIdx] <= this.values[childIdx]) {
            let temp = this.values[currentIdx];
            this.values[currentIdx] = this.values[childIdx];
            this.values[childIdx] = temp;
            currentIdx = childIdx;
            childIdx = this.values[(currentIdx * 2) + 1] > this.values[(currentIdx * 2) + 2] ? (currentIdx * 2) + 1 : (currentIdx * 2) + 2;
        }
        return max;
    }
}


mbh = new MaxBinaryHeap();
mbh.values = [41, 39, 33, 18, 27, 12]
mbh.insert(55);
mbh.insert(1);
mbh.insert(45);
mbh.insert(199);
console.log(mbh.values);
console.log(mbh.ExtractMax());
console.log(mbh.values);