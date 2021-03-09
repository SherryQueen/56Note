#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : dominantIndex.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/featured/card/array-and-string/198/introduction-to-array/771/
"""
from typing import List


def dominantIndex(nums: List[int]) -> int:
    numsLength = len(nums)
    if numsLength == 1: return 0

    maxIdx = 0
    subIdx = 1

    if nums[maxIdx] < nums[subIdx]: [maxIdx, subIdx] = [subIdx, maxIdx]

    for i in range(2, len(nums)):
        num = nums[i]
        if num > nums[maxIdx]:
            subIdx = maxIdx
            maxIdx = i
        elif num > nums[subIdx]:
            subIdx = i

    print(maxIdx, subIdx)
    return maxIdx if nums[maxIdx] >= 2 * nums[subIdx] else -1


if __name__ == '__main__':
    print(dominantIndex([0, 0, 1, 0]))
    print(dominantIndex([0, 0, 0, 1]))
