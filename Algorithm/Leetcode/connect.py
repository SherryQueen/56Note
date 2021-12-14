#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : connect.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/
"""

from typing import List


# Definition for a binary tree node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next


class Solution:
    def connect(self, root: Node) -> Node:
        if root == None:
            return root

        queue = [root]
        while len(queue) > 0:
            new_queue = []
            qLen = len(queue)
            for i, node in enumerate(queue):
                if i < qLen - 1:
                    node.next = queue[i+1]
                if node.left != None:
                    new_queue.append(node.left)
                if node.right != None:
                    new_queue.append(node.right)
            queue = new_queue

        return root
