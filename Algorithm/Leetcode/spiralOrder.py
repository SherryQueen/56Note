#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : spiralOrder.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/199/introduction-to-2d-array/775/
"""
from typing import List


def spiralOrder(matrix: List[List[int]]) -> List[int]:
    rows = len(matrix)
    if rows == 0: return []
    cols = len(matrix[0])
    if cols == 0: return []

    orders: List[int] = []
    x = y = 0
    total = rows * cols

    direction = 4  # 1: Up 2: Down 3: Left 4: Right

    top = 1
    bottom = 0
    left = 0
    right = 0

    while len(orders) != total:
        orders.append(matrix[x][y])

        if direction == 1:
            if x == top:
                y += 1
                direction = 4
                top += 1
            else:
                x -= 1
        elif direction == 2:
            if x == rows - 1 - bottom:
                y -= 1
                direction = 3
                bottom += 1
            else:
                x += 1
        elif direction == 3:
            if y == left:
                x -= 1
                direction = 1
                left += 1
            else:
                y -= 1
        elif direction == 4:
            if y == cols - 1 - right:
                x += 1
                direction = 2
                right += 1
            else:
                y += 1
    return orders


if __name__ == '__main__':
    print(spiralOrder([[1, 2, 3]]))
    print(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
    print(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]))
