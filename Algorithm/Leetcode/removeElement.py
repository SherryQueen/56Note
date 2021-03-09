#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : removeElement.py
@Author     : 56
@Date       : 2020/5/13
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/201/two-pointer-technique/787/
"""
from typing import List


class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        if len(nums) == 0: return 0

        i = 0
        while i < len(nums):
            if nums[i] == val:
                nums.pop(i)
            else:
                i += 1

        return i
