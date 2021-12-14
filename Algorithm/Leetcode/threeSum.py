#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : threeSum.py
@Author     : 56
@Date       : 2020-06-12
@Description: https://leetcode-cn.com/problems/3sum/submissions/
"""
from typing import List


class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        _len = len(nums)
        if _len < 3:
            return []

        # 排序
        nums.sort()

        # 同号
        if nums[0] > 0 or nums[-1] < 0:
            return []

        result = []
        for i in range(_len - 1):
            num = nums[i]
            if i and num == nums[i - 1]:
                continue
            if num > 0:
                break

            l, r = i + 1, _len - 1
            while l < r:
                # 同号
                if num * nums[r] > 0:
                    break
                _sum = nums[l] + nums[r] + num

                if _sum == 0:
                    result.append([num, nums[l], nums[r]])
                    l += 1
                    r -= 1
                    while l < r and nums[l] == nums[l-1]:
                        l += 1
                    while l < r and nums[r] == nums[r+1]:
                        r -= 1
                elif _sum < 0:
                    l += 1
                    while l < r and nums[l] == nums[l-1]:
                        l += 1
                else:
                    r -= 1
                    while l < r and nums[r] == nums[r+1]:
                        r -= 1

        return result


if __name__ == "__main__":
    # print(Solution().threeSum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6]))
    print(Solution().threeSum([-2, 0, 0, 2, 2]))
    # print(Solution().threeSum([0, 0, 0]))
    # print(Solution().threeSum([1, -1, -1, 0]))
    # print(Solution().threeSum([-5, -1, -5, -4, 2, 1, -1, 2, -4, -3, -2, -4]))
