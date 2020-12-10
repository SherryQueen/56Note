#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : addBinary.py
@Author     : 56
@Date       : 2020/5/11
@Description: https://leetcode-cn.com/explore/learn/card/array-and-string/200/introduction-to-string/779/
"""
from typing import List


def addBinary(a: str, b: str) -> str:
    aLen = len(a)
    bLen = len(b)
    if aLen == 0: return b
    if bLen == 0: return a

    if aLen < bLen:
        [a, b] = [b, a]
        [aLen, bLen] = [bLen, aLen]

    hasCarry = False
    ans: List[str] = []
    for i in range(-1, -bLen - 1, -1):
        ac = a[i]
        bc = b[i]

        if ac == bc:
            ans.append('1' if hasCarry else '0')
            hasCarry = ac == '1'
        else:
            ans.append('0' if hasCarry else '1')

    for i in range(-bLen - 1, -aLen - 1, -1):
        ac = a[i]

        if ac == '1':
            ans.append('0' if hasCarry else '1')
        else:
            ans.append('1' if hasCarry else '0')
            hasCarry = False

    if hasCarry: ans.append('1')
    ans.reverse()
    return ''.join(ans)


if __name__ == '__main__':
    print(addBinary('1', '1001'))
    print(addBinary('110', '1001'))
    print(addBinary('11010', '1001'))
