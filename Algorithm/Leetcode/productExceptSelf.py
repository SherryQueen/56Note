#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : productExceptSelf.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/product-of-array-except-self/
"""
"""[Solved]
[i] = [0..i-1]*[i+1..n]
故计算所有的左值, 再从右往左, 即可得到 [i]的值
"""
from typing import List


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        result = []
        length = len(nums)

        product = 1
        for i in range(length):
            result.append(product)
            product = product * nums[i]

        product = 1
        for i in range(length - 1, -1, -1):
            result[i] = result[i] * product
            product = product * nums[i]

        return result


if __name__ == "__main__":
    print(Solution().productExceptSelf([1, 2, 3, 4]))
