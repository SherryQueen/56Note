#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : invertTree.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/invert-binary-tree/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def invertTree(self, root: TreeNode) -> TreeNode:
        if root == None:
            return root

        def dfs(node: TreeNode):
            node.left, node.right = [node.right, node.left]

            if node.left != None:
                dfs(node.left)
            if node.right != None:
                dfs(node.right)
            return node

        return dfs(root)
