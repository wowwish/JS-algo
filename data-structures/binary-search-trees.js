// TREES

// Trees are data structures that consist of Nodes in a Parent-Child relationship. 
// Unlike lists, trees are NON-LINEAR. A singly-linked list is a special case of a tree.
// In a tree, a Node CANNOT REFERENCE other Nodes in the same level (sibling Nodes) or above them (parent Node). 
// Nodes can only reference other Nodes BELOW them (child Nodes). Evey Node moves away from the root Node
// (The single Node at the topmost level of the Tree). A tree can only have ONE root Node.

// TREE TERMINOLOGY
// ROOT - the top Node in the tree
// CHILD - A Node directly connected to another Node when moving away from the Root
// PARENT - The converse notion of a Child
// SIBLINGS - A group of Nodes with the same Parent
// LEAF - A Node with no Child (Terminal Nodes)
// EDGE - The connection between one Node and another

// The root node can never be a child. leaf nodes can never be a parent. other nodes can be both parent and child


// REAL WORLD USE-CASES FOR TREES
// * HTML Document Object Model
// * Network Routing
// * Abstract Syntax Trees
// * Artificial Intelligence
// * Computer File System Hierarchy
// * JSON parsing


// BINARY TREE

// A Binary Tree follow a special rule where EACH NODE CAN ATMOST HAVE ONLY TWO CHILDREN. THUS, A NODE IN A
// BINARY TREE CAN HAVE 0 CHILDREN, 1 CHILD OR 2 CHILDREN.



// BINARY SEARCH TREES (BST)

// A Binary Search Tree is a special case of a Binary Tree, which keeps data in a ordered or sorted way that allows
// for the two chilren of a Parent Node to be compared. They are mainly used for fast Searching and Insertion 
// of data. Insertion into and Searching the Binary Search Tree has the same complexity of Binary Search 
// Algorithm (Hence, the name).

// In a BST:
// * Every Node to the left of the Parent is always LESS than the Parent.
// * Every Node to the right of a Parent is always GREATER than the Parent.

// Blueprint for each Node of our BST
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        // A frequency counter can be used to count the number of duplicates of each value in the tree
        // this.freq = 1;
    }
}

// Blueprint for a BST
class BinarySearchTree {
    constructor() {
        // the root Node of the BST
        this.root = null;
    }
    // instance method to insert a value into the BST (Iterative approach)
    insert(val) {
        // create a new Node with the passed value
        // start at the root and check if the root is not null. If the root is null (empty tree), 
        // set the new Node as the root.
        // if there root is not null, compare the passed value with the value of the root.
        // if the passed value > root value, check if there is a Node to the right of root. If there is,
        // then move to that right Node and repeat these steps. If there is not, add the new Node as the
        // right property.
        // If the passed value is less than the root Node value, check to see if there is a Node to the left
        // of the root. If not, then set the new Node as the left for the root Node. If there is a Node to the
        // left of the root, then move to that Node and repeat these steps.
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
                // currentNode.freq++;
                return undefined;
            }
        }
    }
    // recursive insertion method
    insertRecursive(val) {
        // create new Node with the passed in value
        let newNode = new Node(val);
        // helper function for recursion
        let insertHelper = function (val, node) {
            // if passed in value is less than the node value
            if (val < node.value) {
                // create a new Node with the passed in value and set it as the left
                // of the passed in node if it is null
                if (!node.left) {
                    node.left = newNode;
                    return this;
                }
                // else, call the helper function on the left Node of the passed in node
                else insertHelper(val, node.left);
            }
            // if the passed in value > passed node's value
            else if (val > node.value) {
                // create a new Node with the passed in value and set it as the right
                // of the passed in node if it is null
                if (!node.right) {
                    node.right = newNode;
                    return this;
                }
                // else, call the helper function on the right Node of the passed in node
                else insertHelper(val, node.right);
            }
            else if (val === node.value) {
                // node.freq++;
                return undefined;
            }
        }
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        else insertHelper(val, this.root);
    }
    // instance method to find a Node in the Binary Search Tree
    find(val) {
        // If the root is null, We're done searching
        // otherwise, check if the value of root is the value we are looking for. If it is the case, we are done.
        // If not, check if the search value is greater than or less than the value of the root Node.
        // if the search value > value of root node, check if root Node has a right. If yes, move to that right
        // Node and repeat the steps. Else, we're done searching.
        // if the search value < value of root node, check if root Node has left. If yes, move to that left
        // Node and repeat the steps. Else, we're done searching.
        if (!this.root) return false;
        let currentNode = this.root;
        while (currentNode) {
            if (val === currentNode.value) return true;
            else if (val > currentNode.value) {
                if (!currentNode.right) return false;
                currentNode = currentNode.right;
            }
            else if (val < currentNode.value) {
                if (!currentNode.left) return false;
                currentNode = currentNode.left;
            }
        }
    }
    // instance method to find a value in a BST using Recursion
    findRecursive(val) {
        if (!this.root) return false;
        let findHelper = function(val, node) {
            // if search value is equal to node value, return true
            if (val === node.value) return true;
            // if search value is > node value, check if node has right, if so, call the function
            // recursively on the right of the node. else, return false.
            else if (val > node.value) {
                if (!node.right) return false;
                else {
                    return findHelper(val, node.right);
                 }
            }
            // if search value is < node value, check if node has left, if so, call the function
            // recursively on the left of the node. else, return false.
            else if (val < node.value) {
                if (!node.left) return false;
                else {
                    return findHelper(val, node.left);
                }
            }
        }
        return findHelper(val, this.root);
    }
}


// let tree = new BinarySearchTree();
// tree.root = new Node(10);
// tree.root.right = new Node(15);
// tree.root.left = new Node(7);
// tree.root.left.right = new Node(9);
// console.log(tree);


let tree2 = new BinarySearchTree();
tree2.insert(4);
tree2.insert(8);
tree2.insert(3);
tree2.insert(12);
tree2.insert(6);
tree2.insert(6);
tree2.insert(9);
// tree2.insertRecursive(4);
// tree2.insertRecursive(8);
// tree2.insertRecursive(3);
// tree2.insertRecursive(12);
// tree2.insertRecursive(6);
// console.log(tree2);
console.log(tree2.findRecursive(4));




// TIME COMPLEXITY OF BINARY SEARCH TREES (BST)
// even if you double the number of nodes in the BST, you only increase the number of steps in insert/search
// by just 1! 4x number of nodes = 2 extra steps! 8x number of nodes = 3 extra steps!
// INSERTION - O(logN) - similar to Binary Search algorithm (NOT GUARANTEED!! - APPLICABLE ONLY FOR AVERAGE AND BEST CASES)
// SEARCHING - O(logN) - similar to Binary Search algorithm (NOT GUARANTEED!! - APPLICABLE ONLY FOR AVERAGE AND BEST CASES)
// HOWEVER, THERE ARE BINARY SEARCH TREES CONFIGURATIONS WHICH HAVE O(N) TIME COMPLEXITY FOR INSERTION AND
// SEARCHING - AN EXAMPLE IS A BST THAT RESEMBLES A SINGLY-LINKED LIST.