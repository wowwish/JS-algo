// DIJKSTRA'S SHORTEST PATH ALGORITHM

// Dijkstra's shortest path algorithm is one of the most widely used algorithm for finding
// the shortest path between two Vertices om a Graph.

// Applications of Dijkstra's shortest path algorithm:
//  *   GPS: finding fastest route
//  *   Network Routing: finds open shortest path for data
//  *   Biology: used to model the spread of viruses among humans
//  *   Airline Tickets: finding cheapest route to your destination

// CREATING A WEIGHTED UNDIRECTED GRAPH (you might want to refer code snippets from 'graphs.js')
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    // instance method to add a given Vertex to the Weighted Undirected Graph
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    // instance method to add a given Edge to the Weighted Undirected Graph
    addEdge(vertex1, vertex2, weight) {
        // push an object with the adjacent Vetex that the Edge connects and the corresponding weight
        // of the Edge. Here, the object added will be {"node": vertex, "weight": weight} - weight
        // will have the variable name itself as key and the corresponding value as the key's value
        // and this is a shortcut form of specifying it to be this way.
        this.adjacencyList[vertex1].push({"node": vertex2, weight});
        this.adjacencyList[vertex2].push({"node": vertex1, weight});
    }
    // instance method to remove a given Edge from the Weighted Undirected Graph
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v.node !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v.node !== vertex1);
    }
    // instance method to remove a given Edge from the Weighted Undirected Graph
    removeVertex(vertex) {
        for (let v of this.adjacencyList[vertex]) {
            this.removeEdge(v.node, vertex);
        }
        delete this.adjacencyList[vertex];
    }
    Dijkstra(start, finish) {
        // DIJKSTRA'S SHORTEST PATH ALGORITHM PSEUDOCODE:
        //  *   This function should accept a starting and an ending Vertex.
        //  *   Create an object (we'll call it 'distances') and set each key to be every Vertex in the adjacency
        //      list of the Graph, with a corresponding value of Infinity, except for the starting Vertex which
        //      should have a value of zero.
        //  *   After setting a value in the distances object, add each vertex with a priority of Infinity to 
        //      the priority queue, except the starting Vertex, which should have a priority of 0 because that's
        //      where we begin. This priority queue will always provide the Vertex with the shortest distance
        //      from the starting Vertex, from the available Vertices, when dequeued.
        //  *   Create another object called 'previous' and set each key to be every Vertex in the adjacency list 
        //  *   of the graph and set the corresponding value to null.
        //  *   Start looping as long as there is anything in the priority queue:
        //          - dequeue a Vertex from the priority queue
        //          - if that Vertex is the same as the ending Vertex, we are done!
        //          - Otherwise, loop through each connected neighbor in the adjacency list for that Vertex:
        //              > Calculate the distance to that Vertex from the starting Vertex
        //              > If this distance is less than what is currently stored in our 'distances' object: 
        //                  # update the 'distances' object with the new lower distance
        //                  # update the 'previous' object to contain this Vertex with the lowest distance
        //                  # emqueue the Vertex with the total distance from the starting Vertex
        //  *   The Vertices in the shortest path between the starting Vertex and ending Vertex should be returned as an
        //      array.

        // Build up initial state
        let distances = {}; // Store the smallest distance from the starting Vertex to all other Vertices
        let previous = {}; // Store the previous (neighbor) Vertex which corresponds to the path with the 
        // shortest distance from the starting Vertex for every other Vertex.
        let visited = {}; // An object to store and mark already processed Vertices of the Graph
        let nodes =  new optimizedPriorityQueue(); // A priority quque that always keeps the Vertex with the 
        // smallest distance with the starting Vertex at the highest priority for dequeueing.
        let smallest;
        let path = []; // result array to be returned at the end consisting of the order of Vertices to traverse
        // for the shortest path from the starting Vertex to the finishing Vertex!
        // loop through all the vertices of the Graph and initialize the data structures to be used.
        for (let v in this.adjacencyList) {
            if (v === start) {
                distances[v] = 0;
                nodes.enqueue(v, 0);
            }
            else {
                distances[v] = Infinity;
                nodes.enqueue(v, Infinity);
            }
            previous[v] = null;
        }
        // looping as long as the priority queue is not empty
        while (nodes.values.length) {
            // Get the highest priority Vertex (least distant Vertex of the remaining Vertices in the queue)
            // In the first iteration, the starting Vertex itself will be dequeued, as it's distance to 
            // itself is 0 and all other Vertices have a distance of Infinity (unprocessed/undiscovered).
            smallest = nodes.dequeue().value; // Get the highest priority (least priority number) Vertex from
            // the priority queue. This would be the starting Vertex in the first iteration of this loop.
            if (smallest === finish) {
                // If the next closest Vertex in the priority queue is the finish Vertex, then that means
                // that we already have gotten the shortest Distance to the finish Vertex (this is because,
                // we would have already processed some neighbor of the current shortest Vertex for it to
                // not have Infinity as its shortest distance from the start Vertex!).
                while(previous[smallest]) {
                    // REMEMBER: THE start VERTEX WILL ALWAYS HAVE null IN THE previous OBJECT
                    // At the begining of this while loop, smallest will be the finish Vertex.
                    // keep pushing all Vertices in the shortest path from the start Vertex
                    // to the finish Vertex, starting from the finish Vertex itself!
                    path.push(smallest);
                    // The new smallest will be the previous Vertex from the shortest path to the current
                    // smallest Vertex (from start Vertex) 
                    smallest = previous[smallest];
                }
                // We need to add the start Vertex itself to path as it will not be pushed into the
                // path array in the while loop (because previous[start] = null)!
                path.push(start);
                // return the path array in reverse order as we obtained the path from the finish to the
                // start Vertex, but need to return the order of Vertices from the start to the finish Vertex
                // in the shortest traversable Path in the Graph.
                return path.reverse();
            }
            visited[smallest] = true;
            if (smallest || distances[smallest] !== Infinity) { // sanity check
                for(let i = 0; i < this.adjacencyList[smallest].length; i++) { 
                    let neighborNode = this.adjacencyList[smallest][i];
                    // calculate distance to the neighbor from the current Vertex with the smallest
                    // distance to the starting Vertex.
                    let distanceToNeighbor = distances[smallest] + neighborNode.weight;
                    // If the calculated distance to the neighbor Vertex is less than what we have
                    // stored as the shortest distance to the neighbor Vertex in the priority queue,
                    // update the previous and the distance in priority queue for the neighbor node.
                    // Also, update the distance in the priority queue when this condition is true.
                    if (distanceToNeighbor < distances[neighborNode.node]) {
                        distances[neighborNode.node] = distanceToNeighbor;
                        previous[neighborNode.node] = smallest;
                        // updating the shortest distance for the neighbor Vertex in the priority queue
                        nodes.enqueue(neighborNode.node, distanceToNeighbor);
                    }
                }
            }
        }
    }
}


let graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B", 9);
graph.addEdge("A", "C", 5);
graph.addEdge("B", "C", 7);
// graph.removeEdge("B", "C", 7);
// graph.removeVertex("C");
console.log(graph.adjacencyList);


// A NAIVE (INEFFICIENT) ARRAY BASED PRIORITY QUEUE TO BE USED IN IMPLEMENTING THE ALGORITHM
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
    enqueue(value, priority) {
        // {value, priority} is shorthand syntax for {"value": value, "priority": priority}
        this.values.push({value, priority});
        // sort the oriority queue based on ascending order of priority so that the least priority
        // value is always at the first!
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    // sort the oriority queue based on ascending order of priority so that the least priority
    // value is always at the first!
    // This sorting has TIME COMPLEXITY: O(N * logN)
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// A BINARY-HEAP BASED EFFICIENT PRIORITY QUEUE (refer 'data-structures/priority-queue.js')
class optimizedPriorityQueue {
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


let q = new PriorityQueue();
q.enqueue("B", 3);
q.enqueue("C", 5);
q.enqueue("D", 2);
q.enqueue("Q", 20);
q.enqueue("P", 1.5);
console.log(q.values);
console.log(q.dequeue());


// THE APPROACH TO THE ALGORITHM:
//  *   Everytime we look to visit a new node, we pick the node with the smallest known distance 
//      (highest priority) to visit first.
//  *   Once we've moved to the node we're going to visit, we look at each of it's neighbors
//  *   For each neighboring node, we calculate the distance by summing the total Edges that lead to
//      the node we're checking from the starting node.
//  *   If the new distance to a node is less than the previous total, we store the new shorter distance
//      for that node. 


// DIJKSTRA'S SHORTEST PATH ALGORITHM PSEUDOCODE:
//  *   This function should accept a starting and an ending Vertex.
//  *   Create an object (we'll call it 'distances') and set each key to be every Vertex in the adjacency
//      list of the Graph, with a corresponding value of Infinity, except for the starting Vertex which
//      should have a value of zero.
//  *   After setting a value in the distances object, add each vertex with a priority of Infinity to 
//      the priority queue, except the starting Vertex, which should have a priority of 0 because that's
//      where we begin. This priority queue will always provide the Vertex with the shortest distance
//      from the starting Vertex, from the available Vertices, when dequeued.
//  *   Create another object called 'previous' and set each key to be every Vertex in the adjacency list 
//  *   of the graph and set the corresponding value to null.
//  *   Start looping as long as there is anything in the priority queue:
//          - dequeue a Vertex from the priority queue
//          - if that Vertex is the same as the ending Vertex, we are done!
//          - Otherwise, loop through each connected neighbor in the adjacency list for that Vertex:
//              > Calculate the distance to that Vertex from the starting Vertex
//              > If this distance is less than what is currently stored in our 'distances' object: 
//                  # update the 'distances' object with the new lower distance
//                  # update the 'previous' object to contain this Vertex with the lowest distance
//                  # emqueue the Vertex with the total distance from the starting Vertex
//  *   The Vertices in the shortest path between the starting Vertex and ending Vertex should be returned as an
//      array.

let g = new WeightedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "E", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

console.log(g.Dijkstra("A", "E"));





