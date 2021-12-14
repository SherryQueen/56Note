#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : mergeTrees.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/merge-two-binary-trees/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def mergeTrees(self, t1: TreeNode, t2: TreeNode) -> TreeNode:
        def dfs(node1: TreeNode, node2: TreeNode) -> TreeNode:
            if node1 == None and node2 == None:
                return None

            # 只有一棵树有子树，直接返回该子树即可
            if node1 == None:
                return node2
            if node2 == None:
                return node1

            # 合并两棵树
            node1.val = node1.val + node2.val
            node1.left = dfs(node1.left, node2.left)
            node1.right = dfs(node1.right, node2.right)
            return node1

        return dfs(t1, t2)
