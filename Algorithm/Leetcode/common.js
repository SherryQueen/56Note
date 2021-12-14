function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

const isValidValue = (val) => val !== null && val !== undefined

const generateBinaryTree = (nodes) => {
  if (!Array.isArray(nodes) || !nodes.length || !isValidValue(nodes[0])) return null

  const generateTreeNode = (idx) => {
    const val = nodes[idx]
    if (!isValidValue(val)) return null
    const node = new TreeNode(val)
    node.left = generateTreeNode(idx * 2 + 1)
    node.right = generateTreeNode(idx * 2 + 2)
    return node
  }
  return generateTreeNode(0)
}

exports.generateBinaryTree = generateBinaryTree
