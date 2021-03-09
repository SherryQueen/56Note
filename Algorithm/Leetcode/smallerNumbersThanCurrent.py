#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : smallerNumbersThanCurrent.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/
"""
from typing import List


class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        counts = [[] for i in range(0, 100)]
        for i, n in enumerate(nums):
            counts[n].append(i)

        result = [0 for i in range(0, len(nums))]
        res = 0
        for i, c in enumerate(counts):
            cLen = len(c)
            for i in c:
                result[i] = res
            res += cLen
        return result


if __name__ == "__main__":
    Solution().smallerNumbersThanCurrent([8, 1, 2, 2, 3])
