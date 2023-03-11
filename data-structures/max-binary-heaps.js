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
        // Edge cases like empty values array or values array with only one element are automatically
        // handled properly!
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
        // In a MaxBinaryHeap, the root always has the maximum / highest value
        // Swap the value at index 0 (root) with the value at the last index of the MaxBinaryHeap values array.
        // Pop from the values property so you can return the swapped root (maximum value of the MaxBinaryHeap)
        // Have the new swapped root sink down to its proper spot in the values array of the MaxBinaryHeap!
        // Your parent index starts at 0 (the root)
        // find the indices of the two children of the parent: ((2 * parent index) + 1) and ((2 * parent index) + 2),
        // and make sure the child indices are not out of bounds!
        // If the left or right child is greater than the parent element, SWAP them with the parent element! If both
        // the child elements are larger than the parent element, SWAP with the largest child element! 
        // The child element index you swapped to, now becomes the new parent index
        // Keep looping and swapping until neither child of the parent element is larger than the parent element!
        // Finally, return the old root!
        // KEEP IN MIND THAT THERE IS AN INHERENT ASSUMPTION IN THE MaxBinaryHeap THAT THE values PROPERTY
        // WILL BE USED TO FILL N THE MaxBinaryHeap IN A PARTICULAR ORDER: ROOT FIRST, THEN LEFT CHILD, THEN
        // RIGHT CHILD, THEN LEFT CHILD'S CHILDREN AND THEN RIGHT CHILD'S CHILDREN AND SO ON ....

        // Handle edge cases when the values array is empty, has only one element
        if (this.values.length <= 1) return this.values.pop();
        // extract the root (maximum or highest value in the MaxBinaryHeap values array)
        const max = this.values[0];
        // take the last element in the MaxBinaryHeap and make it the new root
        this.values[0] = this.values.pop();
        let currentIdx = 0; // the newly inserted root
        let childIdx = null;
        // sinking down: sift down the newly inserted root to its correct position within the MaxBinaryHeap
        while (true) {
            // get the index of the child with the highest value for the current parent index
            // also make sure that the child index falls within 0 to this.values.length - 1
            let leftChildIdx = (currentIdx * 2) + 1;
            let rightChildIdx = (currentIdx * 2) + 2;
            if ((leftChildIdx < this.values.length) && (rightChildIdx < this.values.length)) {
                childIdx = this.values[leftChildIdx] > this.values[rightChildIdx] ? leftChildIdx : rightChildIdx;
            }
            else if (leftChildIdx < this.values.length) childIdx = leftChildIdx;
            else if (rightChildIdx < this.values.length) childIdx = rightChildIdx;
            else break;
            // swap the newly inserted root value with its highest valued child. Repeat iteratively while
            // keeping track of the index of this new root value until it gets placed in its appropriate
            // position in the MaxBinaryHeap where, its value is > Both its children's values.
            if (this.values[childIdx] >= this.values[currentIdx]) {
                let temp = this.values[currentIdx];
                this.values[currentIdx] = this.values[childIdx];
                this.values[childIdx] = temp;
                currentIdx = childIdx;
            }
            else break;
        }
        return max; // return the extracted maximum / highest value
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
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
// console.log(mbh.ExtractMax());
console.log(mbh.values);


// TIME COMPLEXITY:
// INSERTION - O(logN) - Because of the order followed in insertion of children - one level is fully filled
// before the next level of depth is started for filling
// REMOVAL - O(logN) - ExtractMax() to remove the highest/maximum element from the root
// SEARCH - O(N) - Due to lack of ordering compared to a BST