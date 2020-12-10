#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : addTwoNumbers.py
@Author     : 56
@Date       : 2020-10-04
@Description: https://leetcode-cn.com/problems/add-two-numbers/
"""

# Definition for singly-linked list.


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        if l1 == None:
            return l2
        if l2 == None:
            return l1

        carry = 0
        head = current = ListNode()

        p1 = l1
        p2 = l2
        while p1 != None or p2 != None:
            res = carry
            node = p1 if p1 != None else p2
            if p1 != None:
                res += p1.val
                p1 = p1.next
            if p2 != None:
                res += p2.val
                p2 = p2.next

            if res >= 10:
                carry = 1
                res -= 10
            else:
                carry = 0

            node.val = res
            current.next = node
            current = node

        if carry != 0:
            current.next = ListNode(1)
        return head.next
