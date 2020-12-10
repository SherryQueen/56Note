#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : merge.py
@Author     : 56
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/198/introduction-to-array/1413/
"""


class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if len(intervals) == 0: return []
        res = []
        # Sort the intervals by the value of left boundary
        origin = sorted(intervals, key=lambda l: l[0])

        [l, r] = origin[0]
        for o in origin:
            [x, y] = o

            # can't merge
            if x > r:
                res.append([l, r])
                l = x
                r = y
                continue

            # merge
            if x < l: l = x
            if y > r: r = y

        res.append([l, r])
        return res
