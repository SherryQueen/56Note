#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : validMountainArray.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/valid-mountain-array/
"""
from typing import List


class Solution:
    def validMountainArray(self, A: List[int]) -> bool:
        l = len(A)
        if l < 3:
            return False
        top = -1
        for i in range(1, l):
            if A[i] == A[i-1]:
                return False
            if A[i] < A[i-1]:
                top = i-1
                break
        if top == 0 or top == -1:
            return False

        for i in range(top+1, l):
            if A[i] == A[i-1]:
                return False
            if A[i] > A[i-1]:
                return False

        return True


if __name__ == "__main__":
    print(Solution().validMountainArray([1, 2, 3, 4, 5]))
    print(Solution().validMountainArray([5, 4, 3, 2, 1]))
