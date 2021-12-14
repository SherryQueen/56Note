#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : strStr.py
@Author     : 56
@Date       : 2020/5/12
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/200/introduction-to-string/780/
"""


def strStr(haystack: str, needle: str) -> int:
    if len(needle) == 0: return 0
    if len(haystack) == 0: return -1

    index = -1
    for i in range(0, len(haystack) - len(needle), 1):
        if haystack[i] == needle[0]:
            flag = True
            for j in range(1, len(needle), 1):
                if haystack[i + j] != needle[j]:
                    flag = False
                    break
            if flag:
                index = i
                break

    return index


if __name__ == '__main__':
    print(strStr('hello', ''))
    print(strStr('hello', 'll'))
    print(strStr('hello', 'oll'))
