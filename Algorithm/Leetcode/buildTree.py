#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : buildTree.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        def build(left: int, right: int) -> TreeNode:
            if left > right:
                return None

            rootVal = postorder.pop()
            rootIdx = idxMap[rootVal]
            root = TreeNode(rootVal)

            root.right = build(rootIdx+1, right)
            root.left = build(left, rootIdx-1)
            return root

        idxMap = {val: idx for idx, val in enumerate(inorder)}
        return build(0, len(inorder)-1)

    def buildTree1(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        tLen = len(postorder)
        if tLen == 0:
            return None

        rootVal = postorder[-1]
        root = TreeNode(rootVal)
        rootIdx = inorder.index(rootVal)

        leftTree = [] if rootIdx == 0 else inorder[:rootIdx]
        rightTree = [] if rootIdx == tLen - 1 else inorder[rootIdx+1:]

        root.left = self.buildTree(leftTree, postorder[:len(leftTree)])
        root.right = self.buildTree(rightTree, postorder[len(leftTree):-1])
        return root
