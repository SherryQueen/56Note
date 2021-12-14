#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : sumNumbers.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/
"""


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def sumNumbers(self, root: TreeNode) -> int:
        if root == None:
            return 0

        def dfs(node: TreeNode, num: int = 0) -> int:
            value = num * 10 + node.val
            if node.left == None and node.right == None: return value

            res = 0
            if node.left != None:
                res += dfs(node.left, value)
            if node.right != None:
                res += dfs(node.right, value)
            return res

        return dfs(root)


if __name__ == "__main__":
    n1 = TreeNode(1)
    n2 = TreeNode(2)
    n3 = TreeNode(3)
    n1.left = n2
    n1.right = n3
    print(Solution().sumNumbers(n1))
