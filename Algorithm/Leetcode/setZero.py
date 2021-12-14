#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : setZero.py
@Author     : 56
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/199/introduction-to-2d-array/1415/
"""
from typing import List


class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        rows = len(matrix)
        if rows == 0: return
        cols = len(matrix[0])
        if cols == 0: return

        rowMap = {}
        colMap = {}

        for r in range(rows):
            for c in range(cols):
                if matrix[r][c] == 0:
                    rowMap[r] = True
                    colMap[c] = True
                    # 补偿赋值
                    for i in range(0, r):
                        matrix[i][c] = 0
                    for i in range(0, c):
                        matrix[r][i] = 0
                elif rowMap.get(r) is True or colMap.get(c) is True:
                    matrix[r][c] = 0
        return


if __name__ == "__main__":
    matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
    Solution().setZeroes(matrix)
    print(matrix)
