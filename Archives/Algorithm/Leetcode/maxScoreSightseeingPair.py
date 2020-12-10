#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : maxScoreSightseeingPair.py
@Author     : 56
@Date       : 2020-06-17
@Description: https://leetcode-cn.com/problems/best-sightseeing-pair/
"""
from typing import List


class Solution:
    # (A[j] - j) + (A[i] + i)
    def maxScoreSightseeingPair(self, A: List[int]) -> int:
        result = A[0]
        _maxView = A[0]
        for i in range(1, len(A)):
            result = max(result, _maxView + A[i] - i)
            _maxView = max(_maxView, i + A[i])
        return result


if __name__ == "__main__":
    print(Solution().maxScoreSightseeingPair([8, 1, 5, 2, 6]))
