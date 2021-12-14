#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : subsets.py
@Author     : 56
@Date       : 2020-09-20
@Description: https://leetcode-cn.com/problems/subsets/
"""

from typing import List


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        _len = len(nums)
        if _len == 0:
            return [[]]

        result: List[List[int]] = [[]]
        temp: List[int] = []

        def dfs(i):
            if i == _len:
                return
            for j in range(i, _len):
                temp.append(nums[j])
                result.append(temp[:])
                dfs(j+1)
                temp.pop()

        dfs(0)
        return result


if __name__ == "__main__":
    print(Solution().subsets([1, 2, 3]))
    print(Solution().subsets([1]))
