#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : isPalindrome.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/palindrome-number/
"""


class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0: return False
        if x >= 0 and x < 10: return True
        string = str(x)
        l, r = 0, (len(string) - 1)
        while l < r:
            if string[l] != string[r]: return False
            l = l + 1
            r = r - 1
        return True


if __name__ == "__main__":
    print(Solution().isPalindrome(1231))
