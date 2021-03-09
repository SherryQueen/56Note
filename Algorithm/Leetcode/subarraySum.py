#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : subarraySum.py
@Author     : 56
@Date       : 2020/5/15
@Description: https://leetcode-cn.com/problems/subarray-sum-equals-k/
"""
from typing import List


class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        # 公共前缀法: nums[i..j] = nums[0..j] - nums[0..i)
        #           记录 nums[0..i) 的值为map 并存储
        #           temp = sum - k 所以判定 temp 已经出现的次数， 即可知道当前有多少个符合的结果
        length = len(nums)
        if length == 0: return 0

        m = {0: 1}
        temp = 0
        result = 0

        for num in nums:
            temp += num
            cnt = temp - k
            if m.get(cnt) is not None: result += m[cnt]

            #  Save the count
            #  必须在计算数之前, 不然会增加一个无效的值  如: num = 5  temp - k = 5, 则会添加一个无效值
            if m.get(temp) is None:
                m[temp] = 1
            else:
                m[temp] += 1

        return result

        #  暴力, overtime
        # length = len(nums)
        # if length == 0: return 0
        #
        # result = 0
        # for i in range(length):
        #     ans = 0
        #     for j in range(i, length):
        #         ans += nums[j]
        #         if ans == k: result += 1
        #
        # return result


if __name__ == '__main__':
    print(Solution().subarraySum([-1, -1, 1], 0))
    print(Solution().subarraySum([1, 2, 3, 2, 1, 5], 6))
