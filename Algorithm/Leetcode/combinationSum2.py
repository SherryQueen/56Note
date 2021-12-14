#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : combinationSum2.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/combination-sum-ii/
"""

from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        cLen = len(candidates)
        if cLen == 0:
            return []

        result: List[List[int]] = []
        candidates.sort()

        arr = []

        def dfs(i: int, temp: int):
            last = 0
            for j in range(i, cLen):
                c = candidates[j]
                if last == c:
                    continue

                last = c

                _sum = temp + c
                arr.append(c)

                if _sum == target:
                    result.append(arr[:])
                elif _sum > target:
                    arr.pop()
                    break
                else:
                    dfs(j+1, _sum)
                arr.pop()

        dfs(0, 0)
        return result


if __name__ == "__main__":
    print(Solution().combinationSum2([], 1))
    print(Solution().combinationSum2([2, 5, 2, 1, 2], 5))
    print(Solution().combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))
