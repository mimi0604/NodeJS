function DirectedGraph(adjacency_list) {
  this.adjacency_list = adjacency_list;
};


DirectedGraph.prototype.getNeighboursFor  = function(node) {
  if (this.adjacency_list[node]){
    return this.adjacency_list[node];
  } else {
    return "No information";
  }
}

DirectedGraph.prototype.pathBetween  = function(nodeA, nodeB, checked_nodes) {
  var that = this,
  checked_nodes = checked_nodes || {},
  res;

  if(this.adjacency_list[nodeA] && !checked_nodes[nodeA]) {
   console.log("checked" + nodeA + ": " + checked_nodes[nodeA]);
   console.log(checked_nodes);
   checked_nodes[nodeA] = 1;
   this.adjacency_list[nodeA].forEach(function(element, index, array) {
     if (element === nodeB) {
       console.log(nodeA + "->" + nodeB);
       res = true;
       console.log("res:" + res + " nodeA:" + nodeA + "nodeB: " + nodeB);
       return;
     } else {
      if (that.pathBetween(element,nodeB, checked_nodes)) {
        res = true;
        console.log("res:" + res + " nodeA:" + nodeA + "nodeB: " + nodeB);
      } else {
      // res = false;
       console.log("res:" + res + " nodeA:" + nodeA + "nodeB: " + nodeB);
     }
   }
 });
 }
 if (res!= true){
   res = false;
 }
 return res;
}
DirectedGraph.prototype.toString = function() {
  console.log(this.adjacency_list);
}



module.exports = DirectedGraph;
