#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : sumOfLeftLeaves.py
@Author     : 56
@Date       : 2020-09-19
@Description: https://leetcode-cn.com/problems/sum-of-left-leaves/
"""

from typing import List

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def sumOfLeftLeaves(self,root: TreeNode) -> int:
        if root == None: return 0

        def dfs(node: TreeNode, valid:bool,  result = 0):
            if valid and node.left == None and node.right == None: return result + node.val
            if node.left != None: result = result + dfs(node.left, True)
            if node.right != None: result = result + dfs(node.right, False)
            return result

        return dfs(root, False)
