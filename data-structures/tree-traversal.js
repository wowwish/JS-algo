// TREE TRAVERSAL OF A BINARY TREE 
// How do we visit every Node of the tree one time ?

// TWO MAIN WAYS OF TRAVERSING A BINARY SEARCH TREE:
//  * BREADTH-FIRST SEARCH (BFS) - Visit sibling nodes first, then move down the tree towards the leaf nodes
//  * DEPTH-FIRST SEARCH (DFS) (sub-approaches are InOrder, PreOrder and PostOrder) - Visit down a node
//    till the leaf Node in reached, then start visit the sibling nodes.

// BREADTH - FIRST SEARCH (BFS) - VISIT ALL NODES ON THE SAME DEPTH OF THE TREE FIRST, THEN MOVE TO THE
// NEXT DEPTH / LEVEL

// BFS Pseudocode:
// Create a queue (this can be an array treated as a queue) and an array to store the values of nodes visited.
// Place the root node in the queue.
// Loop as long as there queue is not empty - dequeue a node from the queue and add it to the array that
// stores the visited nodes
// If there is a left and / or right property in the node that was visited (siblings), add it to the queue.
// Finally, when the queue is empty, return the array that stores all the visited nodes.

class Node {
    constructor(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }
}

// Using the Binary Search Tree to practice traversal
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
    // instance method to insert values into the Binary Search Tree
    insert(val) {
        let newNode = new Node(val);
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let currentNode = this.root;
        while (currentNode) {
            if (val < currentNode.value) {
                if (!currentNode.left) {
                    currentNode.left = newNode;
                    return this;
                }
                currentNode = currentNode.left;
            }
            else if (val > currentNode.value) {
                if (!currentNode.right) {
                    currentNode.right = newNode;
                    return this;
                }
                currentNode = currentNode.right;
            }
            else if (val === currentNode.value) {
                return undefined;
            }
        }
    }
    // Instance method to perform Breadth-First-Search
    BFS() {
        // return an empty list for visited nodes if the tree has no root (empty tree)
        if (!this.root) return [];
        let queue = []; // 
        let visited = []; // array that will be populated with values from visited Nodes
        let currentNode = null; // currently visited Node
        // first put the root node into the queue
        queue.push(this.root);
        while (queue.length > 0) {
            currentNode = queue.shift(); // removing from the begining of the queue
            // add the currently visited Node to the visited nodes array
            visited.push(currentNode.value);
            // check if the currently visited Node has any left or right
            // if so, add it to the queue to be visited. If the tree was not  Binary and
            // had many children, we would follow the same method, by just appending all
            // the children of the currentNode to the queue.
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
        }
        return visited;
    }
    // recursive solution to Breadth-First-Search
    BFSRecursive(queue=[this.root], visited=[]) {
        // if queue is empty return the accumulated node list
        if (queue.length < 1) return visited;
        else {
            // get the first element from the queue
            let currentNode = queue.shift();
            // if the current Node has left and right Nodes, add them to the queue
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            // push the value of the current Node to the list of visited Nodes
            visited.push(currentNode.value);
            return this.BFSRecursive(queue, visited);
        }
    }
    // Recursive instance method to traverse the Binary Search Tree in Depth-First-Search mode in
    // pre-order
    // PRE-ORDER TRAVERSAL IS USEFUL FOR "EXPORTING" OR "CLONING" A TREE STRUCTURE SO THAT IT
    // CAN BE EASILY RECONSTRUCTED OR COPIED!
    preOrderDFS() {
        // GIVEN ANY NODE, VISIT IT FIRST AND THEN ITS CHILD NODES!
        // Create an array to store the values of the Nodes visited
        // Use a helper function that takes a node as argument which, will store the values of the
        // visited Nodes and call itself recursively on the left, and then right of the visited Node 
        // if they exist. Invoke the helper function with the root of the tree.
        // Finally return the array of values of visited Nodes.
        let visited = [];
        // if the root is null (tree is empty) return an empty list
        if (!this.root) return visited;
        let helperDFS = function (node) {
            // add the value of the visited node
            visited.push(node.value);
            // visit the left and add its values and its children's values, recursively to visited nodes list
            if (node.left) helperDFS(node.left);
            // visit the right and add its values and its children's values, recursively to visited nodes list.
            if (node.right) helperDFS(node.right);
        }
        helperDFS(this.root);
        return visited;
    } 
    // Recursive instance method to traverse the Binary Search Tree in Depth-First-Search mode in
    // post-order
    postOrderDFS() {
        // GIVEN A NODE, VISIT ALL THE CHILDREN OF THE NODE BEFORE VISITING THE NODE ITSELF!
        let visited = [];
        // if the root is null (tree is empty) return an empty list
        if (!this.root) return visited;
        let traverse = function (node) {
            // visit the left node and then explore all the way down, add the last node 
            // value to visited nodes list, then traverse to the top, adding all the visited node values
            // on the way to the visited nodes list
            if (node.left) traverse(node.left);
            // visit the right node and then explore all the way down, add the last node value 
            // to visited nodes list, then traverse to the top, adding all the visited node values
            // on the way to the visited nodes list
            if (node.right) traverse(node.right);
            // add the value of the current Node to visited nodes list
            visited.push(node.value);
        }
        traverse(this.root);
        return visited;
    }
    // Recursive instance method to traverse the Binary Search Tree in Depth-First-Search mode in
    // in-order
    inOrderDFS() {
        // GIVEN A NODE, VISIT ALL THE CHILDREN ON THE LEFT OF NODE BEFORE VISITING THE CHILDREN
        // ON THE RIGHT OF NODE. FINALLY, VISIT THE NODE ITSELF!
        // IN-ORDER DFS GIVES BACK THE VALUES IN A BINARY SEARCH TREE IN ASCENDING ORDER!
        let visited = [];
        // if the root is null (tree is empty) return an empty list
        if (!this.root) return visited;
        let traverse = function (node) {
            // visit the left node and then explore all the way down, add all the values of the children
            // of right recursively in the same in-order traversal way to the visited nodes list.
            node.left && traverse(node.left); // traverse the left side if the left child exists
            // add the value of the current Node to visited nodes list
            visited.push(node.value);
            // visit the right node and then explore all the way down, add all the values of the children
            // of right recursively in the same in-order traversal way to the visited nodes list.
            node.right && traverse(node.right); // traverse the right side if the right child exists
        }
        traverse(this.root);
        return visited;
    }
}


let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
// console.log(tree.BFSRecursive());
console.log(tree.preOrderDFS());
console.log(tree.postOrderDFS());
console.log(tree.inOrderDFS());



// DFS VS BFS, WHICH IS BETTER ??
// The application of the traversing method really depends on the tree. BFS is suitable for trees
// with lots of sibling nodes at each level of depth.
// THE TIME COMPLEXITY OF BFS AND DFS IS THE SAME O(N). BUT THE SPACE COMPLEXITY OF BFS > DFS FOR A 
// VERY WIDE TREE WITH LOTS OF SIBLING NODES AT EACH LEVEL OF DEPTH.
// ON A MORE LONG ONE-SIDED TREE WITH ONLY ONE NODE PER DEPTH LEVEL (A LINKED-LIST AS A TREE FOR EXAMPLE)
// WHICH MAY HAVE A LOT OF DEPTH, THEN SPACE COMPLEXITY OF DFS > BFS.
