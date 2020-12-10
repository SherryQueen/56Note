#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : generateTriangle.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/199/introduction-to-2d-array/776/
"""
from typing import List


def generateTriangle(numRows: int) -> List[List[int]]:
    if numRows == 0: return []
    if numRows == 1: return [[1]]

    result: List[List[int]] = [[1]]

    for i in range(numRows - 1):
        array = result[i].copy()
        array.append(0)
        result.append([array[x] + array[x - 1] for x in range(len(array))])

    return result


if __name__ == '__main__':
    print(generateTriangle(2))
    print(generateTriangle(5))
    print(generateTriangle(10))
