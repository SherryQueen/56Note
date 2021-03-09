#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : permute.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/permute/
"""

from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        if len(nums) == 0:
            return []

        nums.sort()
        result = [[nums[0]]]

        for n in nums[1:]:
            arrays: List[List[int]] = []

            for array in result:
                for i in range(0, len(array)+1):
                    arr = array[:]
                    arr.insert(i, n)
                    arrays.append(arr)
            result = arrays
        return result
