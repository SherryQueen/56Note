#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : inorderTraversal.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        if root == None:
            return []
        result = []

        def dfs(node: TreeNode):
            if node.left != None:
                dfs(node.left)
            result.append(node.val)
            if node.right != None:
                dfs(node.right)

        dfs(root)
        return result
