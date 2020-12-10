#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : minSubArrayLen.py
@Author     : 56
@Date       : 2020/5/13
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/201/two-pointer-technique/789/
"""
from typing import List


class Solution:
    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        length = len(nums)
        result = length + 1
        x = y = 0

        temp = 0
        while y < length:
            num = nums[y]
            if num >= s:
                result = 1
                break

            temp += num
            while temp >= s:
                r = y - x + 1
                if r < result: result = r
                temp -= nums[x]
                x += 1
            y += 1

        return 0 if result == length + 1 else result

    def minSubArrayLen1(self, s: int, nums: List[int]) -> int:
        length = len(nums)
        result = length + 1

        for x, n in enumerate(nums):
            if n >= s:
                result = 1
                break

            temp = n
            y = 1
            for num in nums[x + 1:]:
                temp += num
                y += 1
                if temp >= s:
                    if y < result:
                        result = y
                        break

        return 0 if length + 1 == result else result


if __name__ == '__main__':
    print(Solution().minSubArrayLen(11, [1, 2, 3, 4, 5, 6]))
