/**
 * @filename    pathInZigZagTree.js
 * @author      56
 * @description https://leetcode-cn.com/problems/path-in-zigzag-labelled-binary-tree/
 */
/**
 * 我们根据完整二叉树的性质, 可知 当到第n层是, 节点数将为 2**n-1 个 n层的起始值到结束值为 2**(n-1) 2**n-1
 * 在正常的从左到右的遍历中, 二叉树每个节点(v)的左右节点值分别为v*2,v*2+1.
 * 在题目中, 在偶数层的遍历顺序反转了, 我们可以通过原值 val, 通过 r - (val - l) 得到反转后的值
 * 故 我们首先找到 label 所在的层级n, 并根据n是否为偶数层 得到其在正常的完整二叉树中所对应的值val
 *   按照二叉树的性质, 我们可以根据子节点得到父节点的值为 Math.floor(val/2). 如果该节点位于偶数层 则进行一次反转
 * 按照上述步骤, 我们即可完成一次寻址过程
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  if (label === 1) return [1]
  let n = 1
  let ans = 1
  while (ans * 2 <= label) {
    n++
    ans *= 2
  }

  const reverse = (n, val) => {
    const [l, r] = [2 ** (n - 1), 2 ** n - 1]
    return r - (val - l)
  }

  const paths = [label]

  let val = label
  if ((n & 1) === 0) val = reverse(n, val)

  while (--n) {
    val >>= 1
    if (n & 1) paths.unshift(val)
    else paths.unshift(reverse(n, val))
  }

  return paths
}
