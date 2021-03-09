#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : preorderTraversal.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
"""


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def preorderTraversal(self, root: TreeNode) -> List[int]:
        if root == None:
            return []
        stack = [root]
        result = []
        while len(stack) != 0:
            node = stack.pop()
            result.append(node.val)
            if node.right != None:
                stack.append(node.right)
            if node.left != None:
                stack.append(node.left)

        return result
