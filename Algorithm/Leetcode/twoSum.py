#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : twoSum.py
@Author     : 56
@Date       : 2020/5/12
@Description: https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/
"""
from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        l, r = 0, len(numbers)-1
        while l < r:
            total = numbers[l]+numbers[r]
            if total == target:
                return [l+1, r+1]
            elif total < target:
                l += 1
            elif total > target:
                r -= 1
        return []
