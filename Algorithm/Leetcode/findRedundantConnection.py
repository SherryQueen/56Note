#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : findRedundantConnection.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/redundant-connection/
"""

from typing import List


# class UnionFind:
#     def __init__(self, n: int):
#         self.ancestors = list(range(n))

#     def findRoot(self, target: int, count: int = 0):
#         value = self.ancestors[target]
#         num = count
#         if value != target:
#             value, num = self.findRoot(value, count+1)  # 累计当前层数
#         return value, num

#     def union(self, node1: int, node2: int):
#         root1, count1 = self.findRoot(node1)
#         root2, count2 = self.findRoot(node2)
#         # 小树并入大树
#         if root1 != root2:
#             if count1 > count2:
#                 self.ancestors[root2] = root1
#             else:
#                 self.ancestors[root1] = root2

class UnionFind:
    def __init__(self, n: int):
        self.ancestors = list(range(n))

    def findRoot(self, target: int):
        value = self.ancestors[target]
        if value != target:
            # 将节点直接挂在根节点下方
            self.ancestors[target] = value = self.findRoot(value)
        return value

    def union(self, node1: int, node2: int):
        root1 = self.findRoot(node1)
        root2 = self.findRoot(node2)
        if root1 != root2:
            # 判断是 root1, root2 哪个为根节点
            if node1 == root1:
                self.ancestors[root2] = root1
            else:
                self.ancestors[root1] = root2


class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        uf = UnionFind(len(edges)+1)
        for i, [node1, node2] in enumerate(edges):
            r1 = uf.findRoot(node1)
            r2 = uf.findRoot(node2)
            if r1 == r2:
                # 二者拥有共同祖先。即已形成一个环
                return [node1, node2]
            else:
                uf.union(r1, r2)
        return []


if __name__ == "__main__":
    print(Solution().findRedundantConnection([[1, 2], [1, 3], [2, 3]]))
    print(Solution().findRedundantConnection(
        [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]))
    print(Solution().findRedundantConnection(
        [[1, 5], [3, 4], [3, 5], [4, 5], [2, 4]]))
