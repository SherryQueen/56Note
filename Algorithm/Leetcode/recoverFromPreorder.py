#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : recoverFromPreorder.py
@Author     : 56
@Date       : 2020-06-18
@Description: https://leetcode-cn.com/problems/recover-a-tree-from-preorder-traversal/
"""


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def recoverFromPreorder(self, S: str) -> TreeNode:
        _len = len(S)
        if _len == 0:
            return None

        stack = []

        def getNum(i: int):
            s = ''
            while i < _len and S[i] != '-':
                s += S[i]
                i += 1
            return s, i

        v, i = getNum(0)
        root = TreeNode(v)
        stack.append(root)

        while i < _len:
            dep = 0
            while S[i] == '-':
                dep += 1
                i += 1
            num, i = getNum(i)
            node = TreeNode(num)

            while len(stack) > dep:
                stack.pop()
            parent = stack[-1]
            if parent.left is None:
                parent.left = node
            else:
                parent.right = node
            stack.append(node)

        return root
