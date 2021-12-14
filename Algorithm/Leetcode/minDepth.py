#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : minDepth.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/submissions/
"""
from typings import List

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def bfs(self, nodes: List[TreeNode], step=1) -> int:
        result = []
        for node in nodes:
            if node.left is None and node.right is None:
                return step
            else:
                if node.left is not None:
                    result.append(node.left)
                if node.right is not None:
                    result.append(node.right)
        return self.bfs(result, step+1)

    def minDepth(self, root: TreeNode) -> int:
        if root is None:
            return 0
        return self.bfs([root])
