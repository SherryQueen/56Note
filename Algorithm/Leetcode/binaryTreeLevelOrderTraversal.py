#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : binaryTreeLevelOrderTraversal.py
@Author     : 56
@Date       : 2020/5/13
@Description: https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if root is None: return []
        result: List[List[int]] = []
        queue: List[TreeNode] = [root]
        while len(queue) != 0:
            values: List[int] = []
            newQueue: List[TreeNode] = []

            for node in queue:
                values.append(node.val)
                if node.left is not None: newQueue.append(node.left)
                if node.right is not None: newQueue.append(node.right)
            result.append(values)
            queue = newQueue
        return result
