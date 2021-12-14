#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : BinaryTree.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/minesweeper/
"""

from typing import List


class Solution:
    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
        rows = len(board)
        if rows == 0:
            return board
        cols = len(board[0])
        if cols == 0:
            return board

        def isOutOfRange(x: int, y: int) -> bool:
            if x < 0 or x >= rows:
                return True
            if y < 0 or y >= cols:
                return True
            return False

        def isMine(x: int, y: int) -> int:
            if isOutOfRange(x, y):
                return 0
            return 1 if board[x][y] == 'M' else 0

        def hasMines(x: int, y: int):
            if isOutOfRange(x, y) or board[x][y] != 'E':
                return

            mines = 0
            mines += isMine(x-1, y)
            mines += isMine(x-1, y-1)
            mines += isMine(x-1, y+1)
            mines += isMine(x, y-1)
            mines += isMine(x, y+1)
            mines += isMine(x+1, y-1)
            mines += isMine(x+1, y)
            mines += isMine(x+1, y+1)
            board[x][y] = 'B' if mines == 0 else str(mines)
            if mines == 0:
                hasMines(x-1, y-1)
                hasMines(x-1, y)
                hasMines(x-1, y+1)
                hasMines(x, y-1)
                hasMines(x, y+1)
                hasMines(x+1, y-1)
                hasMines(x+1, y)
                hasMines(x+1, y+1)

        [x, y] = click
        if isOutOfRange(x, y):
            return board
        if isMine(x, y) == 1:
            board[x][y] = 'X'
            return board

        hasMines(x, y)
        return board


if __name__ == "__main__":
    # print(Solution().updateBoard([['E', 'E', 'E'], ['E', 'E', 'E'], ['E', 'M', 'E']], [0, 0]))
    print(Solution().updateBoard([['B', '1', 'E', '1', 'B'],
                                  ['B', '1', 'M', '1', 'B'],
                                  ['B', '1', '1', '1', 'B'],
                                  ['B', 'B', 'B', 'B', 'B']], [1, 2]))
