#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : singleNumber.py
@Author     : 56
@Date       : 2020/5/14
@Description: https://leetcode-cn.com/problems/single-number/
"""
from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        ans = 0
        for n in nums:
            ans ^= n
        return ans
        # m = {}
        # for n in nums:
        #     if m.get(n) is None:
        #         m[n] = 0
        #     else:
        #         m[n] += 1
        #
        # r = 0
        # for _, k in enumerate(m):
        #     if m[k] == 0:
        #         r = k
        #         break
        #
        # return r


if __name__ == '__main__':
    print(Solution().singleNumber([1, 2, 1, 2, 3]))
