#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : removeNthFromEnd.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
"""


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        front = head
        result = after = ListNode()
        after.next = head

        count = n
        while count != 0:
            front = front.next
            count -= 1

        while front != None:
            front = front.next
            after = after.next

        after.next = after.next.next
        return result.next
