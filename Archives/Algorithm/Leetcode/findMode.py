#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : findMode.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/
"""

from typing import List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def findMode1(self, root: TreeNode) -> List[int]:
        if root == None:
            return []
        d = {}

        def dfs(node: TreeNode):
            d[node.val] = d.get(node.val, 0) + 1
            if node.left != None:
                dfs(node.left)
            if node.right != None:
                dfs(node.right)

        dfs(root)
        count = max(d.values())
        return [x for x in d.keys() if d[x] == count]

    def findMode(self, root: TreeNode) -> List[int]:
        if root == None:
            return []

        sequence = []

        def dfs(node: TreeNode):
            if node.left != None:
                dfs(node.left)
            sequence.append(node.val)
            if node.right != None:
                dfs(node.right)
        dfs(root)

        maxCount = 0
        result = []

        count = 1
        last = sequence[0]
        for x in sequence[1:]:
            if x == last:
                count += 1
                continue

            if count > maxCount:
                result = [last]
                maxCount = count
            elif count == maxCount:
                result.append(last)

            last = x
            count = 1

        if count > maxCount:
            result = [last]
        elif count == maxCount:
            result.append(last)
        return result


if __name__ == "__main__":
    r = TreeNode(1)
    r1 = TreeNode(2)
    r2 = TreeNode(2)

    r.right = r1
    r1.right = r2
    print(Solution().findMode(r))
