#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : plusOne.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/198/introduction-to-array/772/
"""
from typing import List


def plusOne(digits: List[int]) -> List[int]:
    if len(digits) == 0: return [1]
    hasCarry = True

    for i in range(len(digits) - 1, -1, -1):
        digits[i] += 1
        if digits[i] == 10:
            digits[i] -= 10
            hasCarry = True
        else:
            hasCarry = False
            break

    if hasCarry: digits.insert(0, 1)
    return digits


if __name__ == '__main__':
    print(plusOne([9]))
    print(plusOne([1, 9]))
    print(plusOne([1, 0]))
    print(plusOne([5, 0, 9]))
    print(plusOne([0, 1, 0]))
