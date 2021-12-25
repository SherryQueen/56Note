/**
 * @filename    getKthFromEnd.js
 * @author      56
 * @description https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/
 */

/*
快慢指针, 因为是寻找倒数第k个节点. 我们通过保证两个指针之间的差值为k.
同时遍历整个列表, 当快指针到达尾部时,慢指针则为倒数第k个节点
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let p = head
  let q = head
  let i = 0
  while (i < k && p) {
    p = p.next
    i++
  }
  if (i < k) return null
  while (p) {
    p = p.next
    q = q.next
  }
  return q
}
