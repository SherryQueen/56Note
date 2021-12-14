#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : arrayPairSum.py
@Author     : 56
@Date       : 2020/5/12
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/201/two-pointer-technique/784/
"""
from typing import List


def arrayPairSum(nums: List[int]) -> int:
    nums.sort()
    return sum(nums[::2])
