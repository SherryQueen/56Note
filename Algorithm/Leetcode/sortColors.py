#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : sortColors.py
@Author     : 56
@Date       : 2020-10-07
@Description: https://leetcode-cn.com/problems/sort-colors/
"""
from typing import List


class Solution:
    def sortColors(self, nums: List[int]) -> None:
        _len = len(nums)
        if _len <= 1:
            return

        l, r = 0, _len - 1
        while l < _len and nums[l] == 0:
            l += 1
        while r >= 0 and nums[r] == 2:
            r -= 1

        i = l
        while i <= r:
            if nums[i] == 0 and i > l:
                nums[i], nums[l] = nums[l], nums[i]
                l += 1
            elif nums[i] == 2:
                nums[i], nums[r] = nums[r], nums[i]
                r -= 1
            else:
                i += 1
            if l >= r:
                break
        return nums


if __name__ == "__main__":
    print(Solution().sortColors([0, 0]))
    print(Solution().sortColors([2, 2]))
    print(Solution().sortColors([0, 0, 1, 2, 2, 2]))
    print(Solution().sortColors([0, 0, 1, 2, 1, 2]))
    print(Solution().sortColors([2, 1, 0]))
    print(Solution().sortColors([2, 1, 2, 0, 1, 2, 0]))
