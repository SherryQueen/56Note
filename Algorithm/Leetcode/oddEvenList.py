#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : oddEvenList.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/odd-even-linked-list/
"""


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def oddEvenList(self, head: ListNode) -> ListNode:
        if head == None or head.next == None:
            return head

        oddHead = odd = head
        eventHead = event = head.next

        p = eventHead.next
        odd.next = None
        event.next = None

        flag = True
        while p != None:
            q = p.next
            p.next = None
            if flag:
                odd.next = p
                odd = odd.next
                flag = False
            else:
                event.next = p
                event = event.next
                flag = True

            p = q
        odd.next = eventHead
        return oddHead
