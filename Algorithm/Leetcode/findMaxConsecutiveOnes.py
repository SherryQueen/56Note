#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : findMaxConsecutiveOnes.py
@Author     : 56
@Date       : 2020/5/13
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/201/two-pointer-technique/788/
"""
from typing import List


class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        if len(nums) == 0: return 0

        m = 0
        ans = 0
        for num in nums:
            if num == 1:
                ans += 1
            else:
                m = max(m, ans)
                ans = 0

        if ans != 0: max(m, ans)

        return m
