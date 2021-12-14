#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : islandPerimeter.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/island-perimeter/
"""


from typing import List


class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        rLen = len(grid)
        if rLen == 0:
            return 0
        cLen = len(grid[0])
        if cLen == 0:
            return 0

        dx = [-1, 0, 1, 0]
        dy = [0, -1, 0, 1]
        res = 0
        for i in range(0, rLen):
            for j in range(0, cLen):
                if grid[i][j] == 0:
                    continue
                for idx in range(0, 4):
                    x, y = i + dx[idx], j + dy[idx]
                    if x < 0 or y < 0 or x >= rLen or y >= cLen:
                        res += 1
                    else:
                        res += 0 if grid[x][y] == 1 else 1
        return res


if __name__ == "__main__":
    print(Solution().islandPerimeter([[0, 1, 0, 0],
                                      [1, 1, 1, 0],
                                      [0, 1, 0, 0],
                                      [1, 1, 0, 0]]))
