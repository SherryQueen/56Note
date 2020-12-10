#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : postorderTraversal.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/binary-tree-postorder-traversal/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def postorderTraversal(self, root: TreeNode) -> List[int]:
        if root == None:
            return []

        result = []

        def dfs(node: TreeNode):
            if node.left != None:
                dfs(node.left)
            if node.right != None:
                dfs(node.right)
            result.append(node.val)

        dfs(root)
        return result
