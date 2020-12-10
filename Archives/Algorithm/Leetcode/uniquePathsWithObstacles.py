#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : uniquePathsWithObstacles.py
@Author     : 56
@Date       : 2020-07-06
@Description: https://leetcode-cn.com/problems/unique-paths-ii/
"""
from typing import List


class Solution:
    def uniquePathsWithObstacles2(self, obstacleGrid: List[List[int]]) -> int:
        rowLen = len(obstacleGrid)
        if rowLen == 0:
            return 0
        colLen = len(obstacleGrid[0])
        if colLen == 0:
            return 0

        if obstacleGrid[0][0] == 1:
            return 0
        dp = [[0 for j in range(colLen+1)] for i in range(rowLen+1)]
        dp[1][1] = 1

        for i in range(1, rowLen+1):
            for j in range(1, colLen+1):
                if i == 1 and j == 1:
                    continue
                dp[i][j] = dp[i-1][j] + \
                    dp[i][j-1] if obstacleGrid[i-1][j-1] == 0 else 0
        return dp[rowLen][colLen]

    def uniquePathsWithObstacles1(self, obstacleGrid: List[List[int]]) -> int:
        rowLen = len(obstacleGrid)
        if rowLen == 0:
            return 0
        colLen = len(obstacleGrid[0])
        if colLen == 0:
            return 0

        if obstacleGrid[0][0] == 1:
            return 0
        result = 0
        queue = [[0, 0]]
        while len(queue) > 0:
            q = []
            for point in queue:
                [x, y] = point
                if x == rowLen - 1 and y == colLen - 1:
                    result += 1
                    continue
                if x < rowLen - 1 and obstacleGrid[x+1][y] == 0:
                    q.append([x+1, y])
                if y < colLen - 1 and obstacleGrid[x][y+1] == 0:
                    q.append([x, y+1])
            queue = q
        return result


if __name__ == "__main__":
    print(Solution().uniquePathsWithObstacles([[]]))
    print(Solution().uniquePathsWithObstacles([[1]]))
    print(Solution().uniquePathsWithObstacles(
        [[0, 0, 0], [0, 1, 0], [0, 0, 0]]))
