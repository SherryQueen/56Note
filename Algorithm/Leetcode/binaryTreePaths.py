#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : binaryTreePaths.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/binary-tree-paths/
"""

from typing import List


class TreeNode:
    # Definition for a binary tree node.
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        if root is None:
            return []

        res = []
        paths = []

        def dfs(node: TreeNode):
            paths.append(str(node.val))
            if node.left is None and node.right is None:
                res.append('->'.join(paths))
                paths.pop()
                return
            if node.left:
                dfs(node.left)
            if node.right:
                dfs(node.right)
            paths.pop()

        dfs(root)
        return res
