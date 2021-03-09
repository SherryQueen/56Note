#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : dailyTemperatures.py
@Author     : 56
@Date       : 2020-06-11
@Description: https://leetcode-cn.com/problems/daily-temperatures/
"""
from typing import List


class Node():
    def __init__(self, idx: int, val: int):
        self.idx = idx
        self.val = val


class Solution:
    def dailyTemperatures(self, T: List[int]) -> List[int]:
        result: List[int] = [0] * len(T)
        stack = []

        for i, t in enumerate(T):
            while len(stack) and T[stack[-1]] < t:
                idx = stack.pop()
                result[idx] = i - idx
            stack.append(i)
        return result

    def dailyTemperatures1(self, T: List[int]) -> List[int]:
        stack = []
        result: List[Node] = []
        for i, t in enumerate(T):
            while len(stack) and stack[-1].val < t:
                item = stack.pop()
                result[item.idx] = i - item.idx
            stack.append(Node(i, t))
            result.append(0)
        return result


if __name__ == "__main__":
    print(Solution().dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
