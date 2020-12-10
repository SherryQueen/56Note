#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : sortArrayByParityII.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/sort-array-by-parity-ii/
"""
from typing import List


class Solution:
    def sortArrayByParityII(self, A: List[int]) -> List[int]:
        res = [0]*len(A)
        odd = 1
        even = 0

        for n in A:
            if n & 1 == 0:
                res[even] = n
                even += 2
            else:
                res[odd] = n
                odd += 2
        return res
