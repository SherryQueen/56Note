#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : pivotIndex.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/featured/card/array-and-string/198/introduction-to-array/770/
"""
from typing import List


def pivotIndex(nums: List[int]) -> int:
    numLength = len(nums)
    if numLength == 0: return -1
    if numLength == 1: return 0

    total = sum(nums)
    ans = 0

    for idx, num in enumerate(nums):
        if (total - num) == ans * 2: return idx
        ans += num

    return -1
