#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : reverseString.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/reverse-string/
"""

from typing import List


class Solution:
    def reverseString(self, s: List[str]) -> None:
        _len = len(s)
        if _len <= 1:
            return
        if _len == 2:
            s[0], s[1] = s[1], s[0]
            return
        if _len == 3:
            s[0], s[2] = s[2], s[0]
            return

        l, r = 0, _len - 1
        while l <= r:
            s[l], s[r] = s[r], s[l]
            l += 1
            r -= 1
