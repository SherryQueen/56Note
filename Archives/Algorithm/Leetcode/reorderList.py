#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : reorderList.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/reorder-list/
"""

# Definition for singly-linked list.


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reorderList(self, head: ListNode) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        if head == None or head.next == None:
            return
        low, fast = head, head
        pre = ListNode()
        pre.next = head

        # Split list
        while fast != None:
            pre = low
            low = low.next
            fast = fast.next.next if fast.next != None else None
        l1, l2 = head, pre.next
        pre.next = None

        # Reverse list
        p = l2
        res = ListNode()
        while p != None:
            t = p.next

            p.next = res.next
            res.next = p

            p = t

        l1 = l1.next
        l2 = res.next

        # Merge list
        res = head
        while l1 != None and l2 != None:
            t1, t2 = l1.next, l2.next

            res.next = l2
            l2.next = l1
            res = l1

            l1, l2 = t1, t2

        # l1 和 l2 长度相差近似
        if l2 != None:
            res.next = l2
            res = res.next
        if l1 != None:
            res.next = l1
            res = res.next

        print(head)


if __name__ == "__main__":
    head = ListNode(1)
    n1 = ListNode(2)
    n2 = ListNode(3)
    n3 = ListNode(4)
    n4 = ListNode(5)
    n5 = ListNode(6)
    n6 = ListNode(7)
    head.next = n1
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    n5.next = n6
    Solution().reorderList(head)
