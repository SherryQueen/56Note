#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : combinationSum3.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/combination-sum-iii/
"""

from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        result = []

        m = min(n, 9) + 1
        stack = []

        def dfs(now: int, temp: int):
            sLen = len(stack)
            if sLen == k - 1:
                missed = n - temp
                if now <= missed < m:
                    res = stack[:]
                    res.append(missed)
                    result.append(res)
                return

            for i in range(now, m):
                _all = temp + i
                if _all >= n:
                    break

                stack.append(i)
                dfs(i+1, _all)
                stack.pop()

        dfs(1, 0)
        return result


if __name__ == "__main__":
    print(Solution().combinationSum3(4, 15))
