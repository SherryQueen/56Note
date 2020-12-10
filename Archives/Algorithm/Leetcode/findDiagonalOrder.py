#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : findDiagonalOrder.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/199/introduction-to-2d-array/774/
"""
from typing import List


def findDiagonalOrder(matrix: List[List[int]]) -> List[int]:
    rows = len(matrix)
    if rows == 0: return []
    cols = len(matrix[0])
    if cols == 0: return []

    orders: List[int] = []
    x = y = 0
    direction = True  # True: Up False: Down
    while True:
        orders.append(matrix[x][y])
        if x == rows - 1 and y == cols - 1: break

        if direction:
            if x == 0 or y == cols - 1:
                direction = False
                if y == cols - 1:
                    x += 1
                else:
                    y += 1
            else:
                x -= 1
                y += 1
        else:
            if y == 0 or x == rows - 1:
                direction = True
                if x == rows - 1:
                    y += 1
                else:
                    x += 1
            else:
                x += 1
                y -= 1

    return orders


if __name__ == '__main__':
    print(findDiagonalOrder([]))
    print(findDiagonalOrder([[], []]))
    print(findDiagonalOrder([[1], [2]]))
    print(findDiagonalOrder([[1, 2], [3, 4]]))
    print(findDiagonalOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
