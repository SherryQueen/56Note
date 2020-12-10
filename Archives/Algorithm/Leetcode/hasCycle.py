#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : hasCycle.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/linked-list-cycle/
"""

# Definition for singly-linked list.


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    # 快慢指针
    def hasCycle(self, head: ListNode) -> bool:
        if not head or not head.next:
            return False

        slow = head
        fast = head.next

        while slow != fast:
            if not fast or not fast.next:
                return False
            slow = slow.next
            fast = fast.next.next
        return True

    def hasCycle1(self, head: ListNode) -> bool:
        s = set()
        p = head
        while p != None:
            if p in s:
                return True
            s.add(p)
            p = p.next
        return False
