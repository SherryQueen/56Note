#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : isPalindrome.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/palindrome-linked-list/
"""

# Definition for singly-linked list.


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        if head == None:
            return True

        f, l = head, head
        stack = []
        while f != None:
            if f.next == None:
                # 奇数个节点
                f = None
            else:
                # 偶数个节点
                f = f.next.next
                stack.append(l.val)

            l = l.next

        while l != None and len(stack) != 0:
            v = stack.pop()
            if l.val != v:
                return False
            l = l.next

        return len(stack) == 0 and l == None


if __name__ == "__main__":
    print(Solution().isPalindrome(None))
    print(Solution().isPalindrome(ListNode(1)))
    n1 = ListNode(1)
    n2 = ListNode(2)
    n3 = ListNode(3)
    n4 = ListNode(2)
    n5 = ListNode(1)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    print(Solution().isPalindrome(n1))
    n2.next = n4
    print(Solution().isPalindrome(n1))
