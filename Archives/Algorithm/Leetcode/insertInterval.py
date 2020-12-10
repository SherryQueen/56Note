#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : insertInterval.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/insert-interval/
"""
from typing import List


class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        if len(intervals) == 0:
            return [newInterval]

        intervals.append(newInterval)
        intervals.sort(key=lambda i: i[0])
        res = [intervals[0]]
        last = -1
        for l, r in intervals[1:]:
            # 新区间
            if l > res[-1][1]:
                res.append([l, r])
            # 与上一个区间重叠
            elif r > res[-1][1]:
                res[-1][1] = r
            # 上一个区间内
            # elif r <= res[-1][1]:
                # break
        return res


if __name__ == "__main__":
    Solution().insert([[1, 2], [3, 4]], [1, 3])
