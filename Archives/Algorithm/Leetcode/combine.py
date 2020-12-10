#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : combine.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/combinations/
"""

from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        if k == 0:
            return [[]]
        if k == 1:
            return [[x] for x in range(1, n+1)]

        result = []
        stack = []

        def dfs(now: int):
            while now <= n:
                stack.append(now)
                if len(stack) == k:
                    result.append(stack[:])
                else:
                    dfs(now+1)

                stack.pop()
                now = now + 1

        dfs(1)
        return result


if __name__ == "__main__":
    print(Solution().combine(3, 0))
    print(Solution().combine(3, 1))
    print(Solution().combine(3, 2))
