#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : longestCommonPrefix.py
@Author     : 56
@Date       : 2020/5/12
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/200/introduction-to-string/781/
"""
from typing import List


def longestCommonPrefix(strs: List[str]) -> str:
    if len(strs) == 0: return ''
    length = min(map(lambda s: len(s), strs))
    if length == 0: return ''

    result: List[str] = []
    for i in range(length):
        c = strs[0][i]
        flag = all([s[i] == c for s in strs[1:]])
        if flag:
            result.append(c)
        else:
            break

    return ''.join(result)
