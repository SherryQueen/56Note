#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : hasPathSum.py
@Author     : 56
@Date       : 2020-07-07
@Description: https://leetcode-cn.com/problems/path-sum/
"""


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if root is None:
            return False

        def hasResult(root: TreeNode, result: int) -> bool:
            if root.left is None and root.right is None:
                return result == root.val
            left = False if root.left is None else hasResult(
                root.left, result - root.val)
            right = False if root.right is None else hasResult(
                root.right, result - root.val)
            return left or right
        return hasResult(root, sum)
