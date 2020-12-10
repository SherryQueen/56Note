#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : backspaceCompare.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/backspace-string-compare/
"""


class Solution:
    def backspaceCompare(self, S: str, T: str) -> bool:
        sStack = []
        tStack = []

        for s in S:
            if s == '#':
                if len(sStack) != 0:
                    sStack.pop()
            else:
                sStack.append(s)

        for t in T:
            if t == '#':
                if len(tStack) != 0:
                    tStack.pop()
            else:
                tStack.append(t)

        return ''.join(sStack) == ''.join(tStack)
