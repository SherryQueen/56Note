// Definition for a Node.
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val
  this.neighbors = neighbors === undefined ? [] : neighbors
}

const cloneGraph = function (node) {
  const records = {}
  const dfs = (node) => {
    if (records[node.val]) return records[node.val] // * Have visited the node

    const { val, neighbors } = node
    let cloneNode = new Node(val, []) // * Clone new node
    records[val] = cloneNode // * Record the node has been visited
    for (let i = 0, len = neighbors.length; i < len; i++) {
      cloneNode.neighbors.push(dfs(neighbors[i]))
    }
    return cloneNode
  }

  return node ? dfs(node) : node
}
