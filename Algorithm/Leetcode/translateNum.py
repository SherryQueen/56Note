#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : translateNum.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
"""


class Solution:
    # 暴力递归
    def translateNum1(self, num: int) -> int:
        if num < 10: return 1
        if num < 26: return 2
        if num < 100: return 1

        def getNum(c: chr) -> int:
            return ord(c) - 48

        def translate(count: int, string: str) -> int:
            length = len(string)
            if length <= 1: return count
            n = getNum(string[0])
            nextN = getNum(string[1])
            if n == 0 or n > 2 or (n == 2 and nextN > 5):
                return translate(count, string[1:])
            return translate(count, string[1:]) + translate(count, string[2:])

        return translate(1, str(num))

    # 暴力递归简化版. 判断两数是否在 10~26 之间
    def translateNum2(self, num: int) -> int:
        def translate(num: int) -> int:
            if num < 10: return 1
            if (num % 100) < 26 and (num % 100) > 9:
                print(num % 100)
                return translate(int(num / 10)) + translate(int(num / 100))
            return translate(int(num / 10))

        return translate(num)

    # 动态规划:
    # if 10 < [i-1]+[i] < 26:
    #    dp[i] = dp[i-1] + dp[i-2]
    # else: dp[i] = dp[i-1]
    def translateNum(self, num: int) -> int:
        dp = [0, 1]
        numStr = str(num)

        i = 1
        for i in range(1, len(numStr)):
            t = numStr[i - 1]
            n = numStr[i]

            if t == '1' or (t == '2' and n < '6'):
                print(i)
                print(t, n)
                dp.append(1 + dp[i] + dp[i - 1])
            else:
                dp.append(dp[i])

        print(dp)
        return dp[-1]


if __name__ == "__main__":
    # print(Solution().translateNum(502))
    # print(Solution().translateNum(0))
    # print(Solution().translateNum(12258))
    # print(Solution().translateNum(262626))
    print(Solution().translateNum(252525))
    # print(Solution().translateNum(222222))
    # print(Solution().translateNum(648006092))
