#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : minStack.py
@Author     : 56
@Date       : 2020/5/12
@Description: https://leetcode-cn.com/problems/min-stack/
"""


class MinStack:
    def __init__(self):
        self.values = []

    def push(self, x: int) -> None:
        self.values.append(x)

    def pop(self) -> None:
        if len(self.values) == 0: return
        self.values.pop()

    def top(self) -> int:
        if len(self.values) == 0: return 0
        return self.values[-1]

    def getMin(self) -> int:
        if len(self.values) == 0: return 0
        return min(self.values)

# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
