#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : floodFill.py
@Author     : 56
@Date       : 2020/5/9
@Description: https://leetcode-cn.com/explore/learn/card/queue-stack/220/conclusion/891/
"""
from typing import List


def floodFill(image: List[List[int]], sr: int, sc: int, newColor: int) -> List[List[int]]:
    cols = len(image)
    if cols == 0: return image
    rows = len(image[0])
    if rows == 0: return image

    def isOutOfBounds(x, y) -> bool:
        return x < 0 or x >= cols or y < 0 or y >= rows

    if isOutOfBounds(sr, sc): return image
    oldColor = image[sr][sc]
    if oldColor is newColor: return image

    def fill(x, y):
        if isOutOfBounds(x, y) or image[x][y] is not oldColor: return
        image[x][y] = newColor
        fill(x + 1, y)
        fill(x - 1, y)
        fill(x, y + 1)
        fill(x, y - 1)

    fill(sr, sc)

    return image


if __name__ == '__main__':
    print(floodFill([[1, 1, 1, 1], [1, 1, 0, 1], [1, 0, 1, 1]], 1, 1, 2))
    print(floodFill([[0, 0, 0], [0, 1, 1]], 1, 1, 1))
    exit()
