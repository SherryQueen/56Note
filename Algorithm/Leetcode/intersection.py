#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : intersection.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/intersection-of-two-arrays/
"""


from typing import List


class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        if len(nums1) == 0 or len(nums2) == 0:
            return []

        s1 = set(nums1)
        s2 = set(nums2)
        intersection = []

        for n in s2:
            if n in s1:
                intersection.append(n)
        return intersection
