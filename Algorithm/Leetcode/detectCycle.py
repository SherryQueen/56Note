#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : detectCycle.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/linked-list-cycle-ii/
"""

# Definition for singly-linked list.


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        p = head
        s = set()
        while p != None:
            if p in s:
                return p
            s.add(p)
            p = p.next
        return None
