#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : swapPairs.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/swap-nodes-in-pairs/
"""


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        p = ListNode()
        p.next = head
        r = p

        while p.next != None and p.next.next != None:
            a, b = p.next, p.next.next

            # Swap
            p.next = b
            a.next = b.next
            b.next = a

            p = a
        return r.next
