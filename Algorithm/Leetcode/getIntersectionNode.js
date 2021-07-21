/**
 * @filename    getIntersectionNode.js
 * @author      56
 * @description https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/
 */
/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * 快慢指针
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  if (headA === null || headB === null) return null
  let p = headA
  let q = headB

  while (p !== q) {
    p = p === null ? headA : p.next
    q = q === null ? headB : q.next
  }
  return p
}
