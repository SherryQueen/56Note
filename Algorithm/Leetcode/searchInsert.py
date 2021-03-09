#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : searchInsert.py
@Author     : 56
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/198/introduction-to-array/1412/
"""


class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        for idx, n in enumerate(nums):
            if target <= n: return idx
        return len(nums)
