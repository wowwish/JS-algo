// GRAPHS

// Graphs are data structures that consists of a finite (and possibly mutable) set of 
// vertices or nodes or points, together with a set of unordered pairs of these 
// vertices (for an UNDIRECTED GRAPH) or a set of ordered pairs (for a DIRECTED GRAPH) called connections
// or edges. Graphs can be directed or undirected, meaning that edges have a specific direction or they do not. 
// A directed graph is also known as a digraph. Graphs can also have weighted edges, where each edge has a weight 
// or cost associated with it.

// Trees and linked-list are also graphs. A graph can be connected or disconnected, can have cycles or loops, 
// and does not necessarily have a root node. Trees are connected acyclic graphs, meaning that there are no 
// cycles in the graph. In a tree, there is a unique path between any two vertices, and there is a single
// vertex called the root that is used as the starting point for traversing the tree. Graphs donot have a root!
// While the Edges of a Graph can be Directed or Undirected, the Edges of a Tree are always directed!
// In a graph, nodes can have any number of connections to other nodes, and there is no strict 
// parent-child relationship. However, In a tree, each node (except the root node) has a parent node 
// and zero or more child nodes. 


// USES FOR GRAPHS
// * Social Networks
// * Location / Mapping
// * Routing Alorithms
// * Visual Hierarchy
// * File System Optimizations
// * Recommendation engines

// ESSENTIAL GRAPH TERMS
// Vertex - a node
// Edge - connection between nodes
// Weighted/Unweighted - values assigned to distances between vertices
// Directed/Undirected - directions assigned to distances between vertices


// STORING GRAPHS
// * Adjacency Matrix - A presence/absence matrix where rows and columns represent the nodes of the graph
//   and values 1 and 0 represent the presence or absence of an edge between the corresponding nodes of the
//   graph. Undirected graphs will have symmetric adjacency matrix whereas Directed graphs will have asymmetric
//   adjacency matrix.
// * Adjacency List - If nodes are numeric, an array is used to store sub-arrays for each node where each 
//   sub-array stores the nodes to which the current node is connected via edges.
//   If the nodes are strings, a hash-table where keys represent the current node and the value is an
//   array of the strings - the other nodes to which the current node is connected to via edges. 

// DIFFERENCES IN BIG O BETWEEN ADJACENCY MATRIX AND ADJACENCY LIST
// HERE, 'V' REPRESENTS THE NUMBER OF VERTICES IN THE GRAPH AND 'E' REPRESENTS THE NUMBER OF EDGES
// IN THE GRAPH.

// ADJACENCY LIST:
//  *   It is faster to iterate over all Edges of the Graph
//  *   ADD VERTEX - O(1)
//  *   ADD EDGE - O(1)
//  *   REMOVE VERTEX - O(V + E) for an array of sub arrays and  O(E) for a hash table
//  *   REMOVE EDGE - O(E)
//  *   QUERY - O(V + E) - slower to lookup specific edge
//  *   STORAGE (SPACE COMPLEXITY) - O(V + E) - Takes up less space in sparse graphs

// ADJACENCY MATRIX:
//  *   It is slower to iterate over all Edges of the Graph
//  *   ADD VERTEX - O(V^2) - adding an entire row and entire column to the adjacency matrix
//  *   ADD EDGE - O(1)
//  *   REMOVE VERTEX - O(V^2)
//  *   REMOVE EDGE - O(1)
//  *   QUERY - O(1) - faster to lookup specific edge
//  *   STORAGE (SPACE COMPLEXITY) - O(V^2) - takes up more space (especially in sparse graphs)

// THE ADJACENCY LIST TENDS TO BE USED MORE OFTEN BECAUSE MOST REAL-WORLD DATA ARE SPARSE
// AND FORM LARGE GRAPHS.


// GRAPH TRAVERSAL - Depth-First Traversal AND Breadth-First Traversal
// Graph Traversal refers to visiting/updating/checking every vertex in a Graph
// Graph Traversal is used in:
//  *   Peer to peer networking
//  *   Web Crawlers
//  *   Finding "closest" matches/recommendations
//  *   Shortest Path Problems - GPS Navigation, Solving Mazes, AI (shortest path to win a game)


// In Depth-First Traversal of a Graph, we explore as far as possible down one branch of the Graph
// before "backtracking".
// In Breadth-First Traversal of a Graph, we explore the all the connected neighbors of the current 
// Vertex first before moving to the next Vertex.




// UNDIRECTED GRAPH IMPLEMENTATION:
class Graph {
    constructor() {
        // initialize the adjacency list for the undirected graph as an empty JS object
        this.adjacencyList = {};
    }
    // instance method to add a vertex to the graph
    addVertex(vertex) {
        // add a key to the adjacency list with the given vertex name and set its value
        // to an empty array. You can also throw an Exception when a duplicate vertex addition
        // is attempted! Here, we simply ignore the addition of the duplicate vertex!
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    // instance method to add an Edge connecting two Vertices in the Graph
    addEdge(vertex1, vertex2) {
        // find in the adjacency list, the key of vertex1 and push vertex2 to the corresponding
        // array. For a Directed Graph, we would stop here. But, since this is an undirected Graph, 
        // find the array for vertex2 as the key in the adjacency list and push vertex1 into the array.
        // You can additionally take care of invalid Vertex names and Duplicate Edges with Exceptions!
        this.adjacencyList[vertex1].push(vertex2);
        // Since this is an Undirected Graph, Edges go both ways
        this.adjacencyList[vertex2].push(vertex1);
    }
    // instance method to remove an Edge connecting the given two Vertices from the Graph
    removeEdge(vertex1, vertex2) {
        // reassign the key of vertex1 to an array that contains all the connected vertices of 
        // vertex1 except vertex2. For a Directed Graph, we would stop here. Since, we have an
        // Undirected Graph, we also need to remove vertex1 from the array corresponding to vertex2
        // as key.
        // You can additionally take care of invalid Vertex names with Exceptions!
        // Here, we use the in-built JS filter() method to remove vertex from an array!
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
    }
    // instance method to remove a Vertex from the Graph
    removeVertex(vertex) {
        // loop through all the vertices in the adjacency list for the given vertex to be removed
        // and remove all connections / Edges connecting the given Vertex from each of them using the
        // removeEdge() method.
        // Then, delete the key for the given Vertex in the adjacency list
        for (let v of this.adjacencyList[vertex]) {
            this.removeEdge(v, vertex);
        }
        delete this.adjacencyList[vertex];
    }
    // recursive instance method for Depth-First Traversal of the Graph from a given start Vertex
    recursiveDFS(start) {
        // If the vertex is empty, return undefined (base case). Else, add the vertex
        // to results list and mark it as visited. Continue on recursively for each neighbor of
        // in the visited Vertex's neighbors. If a neighbor is not visited, recursively call DFS
        // on the neighbor.
        // The method accepts a starting node. Create an array to store the end result to be
        // returned at the very end. Also, create an object to store the visited vertices.
        // Then, create a helper function that accepts a Vertex. This helper function should
        // return early if the Vertex passed to it is empty. Otherwise, the helper function should
        // push the Vertex passed to it into the result array and also place the Vertex passed to it
        // in the object of visited Vertices. Next, loop over all the connected Vertices in the adjacency 
        // list for the helper function argument Vertex. If any of these connected Vertices are not yet
        // visited, recursively call the helper function with that non-visited Vertex. 
        // Invoke the helper function with the starting vertex and finally return the result array.
        let result = [];
        let visited = {};
        // to make the adjacency list available inside the scope of the recursive helper function
        const adjacencyList = this.adjacencyList; 
        let helper = function(v) {
            // handle falsy vertices such as undefined
            if (!v) return null;
            visited[v] = true;
            result.push(v);
            for (let neighbor of adjacencyList[v]) {
                // for an neighbor that has not been visited yet, visited[neighbor] will be undefined
                // and undefined is falsy
                if (!visited[neighbor]) {
                    helper(neighbor);
                }
            }
        }
        helper(start);
        return result;
    }
    // iterative instance method to perform depth-first traversal of the graph from a given starting Vertex
    iterativeDFS(start) {
        // Initialize a result array to be returned at the end, and an object to store visited Vertices.
        // Initialize a Stack (we will be using an array as a stack). Push the passed starting Vertex
        // into the Stack. Use a while loop to pop a Vertex from the stack, add the popped Vertex to the
        // result array, mark the popped Vertex in the visited object as discovered and finally, push
        // the neighbors of the popped Vertex into the Stack. Run this while loop until the stack is empty.
        // finally, return the result array.
        let result = [];
        let visited = {};
        // REMEMBER: A stack follows First-In-First-Out
        let stack = [start]; // initialize the stack with the starting Vertex
        let currentVertex; // Variable to store the Vertex popped from the stack
        // Run the while loop till the stack has a truthy length ( stack.length > 0 )
        while(stack.length) {
            currentVertex = stack.pop();
            // if the popped Vertex from the stack is not already visited, add it to the result array
            // amd mark it as discovered. Remember that an undiscovered Vertex v will return undefined
            // (falsy value) for visited[v]
            if (!visited[currentVertex]) {
                result.push(currentVertex);
                visited[currentVertex] = true;
                // add undiscovered neighbors of the popped Vertex to the stack
                for (let neighbor of this.adjacencyList[currentVertex]) {
                    if (!visited[neighbor]) stack.push(neighbor);
                }
            }
        }
        return result;
    }
    // instance method for iterative Breadth-First Traversal of the Graph from a given start Vertex
    iterativeBFS(start) {
        // Create a queue (we will use an array here as a queue) and place the starting Vertex
        // in it. Also create a result array to store Vertices in the visiting order at the end.
        // Create an object to store and mark the visited Vertices.
        // Mark the start Vertex that was passed to the method as discoveed.
        // Use a while loop to iterate until the queue is non-empty.
        // Remove the first Vertex from the queue, add it to the result array and mark it as visited. 
        // Loop over all the connected neighbors of this removed Vertex and if the neighbor is not 
        // visited, add it to the queue.
        let queue = [start]; // REMEMBER: A queue follow Last-In-First-Out
        let result = [];
        let visited = {};
        visited[start] = true; // Mark the starting Vertex as discovered
        let currentVertex; // Variable that stores the Vertex removed from the queue
        while (queue.length) {
            currentVertex = queue.shift(); // Remove the first Vertex from the queue
            result.push(currentVertex);
            // To shift the order of traversal, you can simply use: 
            // this.adjacencyList[currentVertex].slice().reverse() to create a copy and reverse the copy
            // without reversing the original neighbor list
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        } 
        return result;
    }
    // instance method for pseudo-recursive Breadth-First Traversal of the Graph from a given start Vertex
    recursiveBFS(start) {
        // Create a result array to add all the Vertices in the order that they are visited and
        // return at the end. Create an object to store and mark visited Vertices. Also create a
        // queue to store the Vertices to visit next. Create a helper method that takes the queue as
        // input. If the queue is empty, this helper method should return the result array. Otherwise, 
        // the helper method will remove the first Vertex from the queue and check it. If this first
        // Vertex from the queue is not already visited, it should be pushed to the result array and 
        // should be marked as discovered in the visited Vertices object. Then, the undiscovered 
        // neighbors of this first Vertex from the queue should be added to the queue. Finally, the
        // helper method should call itself recursively with the updated quque.
        let result = [];
        let visited = {};
        let queue = [start]; // queue to store all undiscovered neighbors of current Vertex
        let currentVertex; // variable to store the removed Vertex from the queue
        const adjacencyList = this.adjacencyList;
        let helper = function(q) {
            if (!q.length) return result;
            let currentVertex = q.shift(); // take the first Vertex from the queue
            if (!visited[currentVertex]) {
                result.push(currentVertex);
                visited[currentVertex] = true;
                for (let neighbor of adjacencyList[currentVertex]) {
                    if (!visited[neighbor]) q.push(neighbor);
                }
            }
            helper(q);
        }
        helper(queue);
        return result;
    }
}


// let g = new Graph();
// g.addVertex("Tokyo");
// g.addVertex("San Francisco");
// g.addVertex("Dallas");
// g.addVertex("Los Angeles");
// g.addVertex("Hong Kong");
// g.addEdge("Dallas", "Tokyo");
// g.addEdge("Dallas", "San Francisco");
// g.addEdge("Hong Kong", "Tokyo");
// g.addEdge("Hong Kong", "Dallas");
// g.addEdge("Los Angeles", "Hong Kong")
// g.addEdge("Los Angeles", "Dallas")
// console.log(g);
// g.removeVertex("Hong Kong");
// console.log(g)

g2 = new Graph();
g2.addVertex("A");
g2.addVertex("B");
g2.addVertex("C");
g2.addVertex("D");
g2.addVertex("E");
g2.addVertex("F");

g2.addEdge("A", "B");
g2.addEdge("A", "C");
g2.addEdge("B", "D");
g2.addEdge("C", "E");
g2.addEdge("D", "E");
g2.addEdge("D", "F");
g2.addEdge("E", "F");


        //     A
        //   /   \
        //  B     C
        //  |     |
        //  D --- E
        //   \   /
        //     F
         

console.log(g2.recursiveDFS("A"));
console.log(g2.iterativeDFS("A"));
console.log();
console.log(g2.iterativeBFS("A"));
console.log(g2.recursiveBFS("A"));
