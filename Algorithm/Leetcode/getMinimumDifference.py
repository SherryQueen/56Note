#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : getMinimumDifference.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/
"""

# Definition for a binary tree node.


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


# 二叉搜索树的特性，在中序遍历下 可形成一个有序数组， 我们即可遍历数组得到差值
# 我们也能记录上一个节点的值，从而抽象为一个有序数组
class Solution:
    def getMinimumDifference(self, root: TreeNode) -> int:
        diff = 65535
        pre: TreeNode = None

        node = root
        stack = []
        while node != None or len(stack) != 0:
            while node != None:
                stack.append(node)
                node = node.left
            node = stack.pop()

            if pre != None:
                diff = min(diff, node.val - pre.val)
            pre = node

            node = node.right

        return diff
