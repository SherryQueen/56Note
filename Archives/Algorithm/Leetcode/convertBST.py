#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : convertBST.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/convert-bst-to-greater-tree/
"""

from typing import List


class TreeNode:
    # Definition for a binary tree node.
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def convertBST(self, root: TreeNode) -> TreeNode:
        if root == None:
            return root

        cumulate = 0

        def dfs(node: TreeNode):
            nonlocal cumulate
            if node.right:
                dfs(node.right)
            cumulate = node.val = node.val + cumulate
            if node.left:
                dfs(node.left)

        dfs(root)
        return root
