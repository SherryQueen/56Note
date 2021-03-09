#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : combinationSum.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/combination-sum/
"""

from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        if target <= 0:
            return []
        cLen = len(candidates)
        if cLen == 0:
            return []

        candidates.sort()
        result: List[List[int]] = []
        stack = []

        def dfs(i, _sum):
            for j in range(i, cLen):
                c = candidates[j]
                if c > target:
                    break

                _sum += c
                stack.append(c)

                if _sum == target:
                    result.append(stack[:])
                elif _sum < target:
                    dfs(j, _sum)

                stack.pop()
                _sum -= c

        dfs(0, 0)
        return result


if __name__ == "__main__":
    print(Solution().combinationSum([], 6))
    print(Solution().combinationSum([1, 2, 4, 3], 3))
    print(Solution().combinationSum([1, 2, 3, 4], 6))
