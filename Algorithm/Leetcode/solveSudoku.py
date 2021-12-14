#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : solveSudoku.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/sudoku-solver/
"""

from typing import List


class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        numbers = [str(x) for x in range(1, 10)]

        # 寻找当前空格可填写的数值
        def findNumbers(x, y):
            _set = set()
            for i in range(9):
                _set.add(board[x][i])  # 当前行
                _set.add(board[i][y])  # 当前列

            # 当前 3x3
            _x = x // 3
            _y = y // 3
            [_set.add(board[_x * 3 + i][_y*3+j])
             for i in range(3) for j in range(3)]

            return list(filter(lambda n: n not in _set, numbers))

        def dfs(i):
            # 所有空格都已经赋予值,结束递归
            if i == len(spaces):
                return True
            (x, y) = spaces[i]
            arr = findNumbers(x, y)

            # 尝试所有可填写的数值
            for n in arr:
                board[x][y] = n
                if dfs(i+1):
                    return True
                board[x][y] = '.'
            return False

        # 找出所有需要填写的位置
        spaces = []
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    spaces.append((i, j))

        dfs(0)


if __name__ == "__main__":
    sudoKu = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]
    Solution().solveSudoku(sudoKu)
    print(sudoKu)
