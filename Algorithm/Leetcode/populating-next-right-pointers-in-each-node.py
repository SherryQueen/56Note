#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : connect.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
"""


# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next


class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if root == None or root.left == None:
            return root

        root.left.next = root.right
        root.right.next = root.next.left if root.next != None else None
        self.connect(root.left)
        self.connect(root.right)
        return root

    def connect1(self, root: 'Node') -> 'Node':
        queue = [root]
        while len(queue) != 0:
            q = []

            for n in queue:
                if n.left != None:
                    q.append(n.left)
                if n.right != None:
                    q.append(n.right)

            for i, n in enumerate(q[:-1]):
                n.next = q[i]
            queue = q
            print(queue)

        return root


if __name__ == "__main__":
    root = Node(1)
    l = Node(2)
    r = Node(3)
    root.left = l
    root.right = r
    Solution().connect(root)
    print(l.next == r)
