#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : insertIntoBST.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
        if root == None:
            return TreeNode(val)

        node = root
        while True:
            if node.val > val:
                if node.left == None:
                    node.left = TreeNode(val)
                    break
                node = node.left

            elif node.val < val:
                if node.right == None:
                    node.right = TreeNode(val)
                    break
                node = node.right
            else:
                break
        return root
