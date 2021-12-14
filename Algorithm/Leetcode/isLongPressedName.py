#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : isLongPressedName.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/long-pressed-name/
"""


class Solution:
    def isLongPressedName(self, name: str, typed: str) -> bool:
        nameLen, typeLen = len(name), len(typed)
        i, j = 0, 0

        while j < typeLen:
            if i < nameLen and name[i] == typed[j]:
                i += 1
                j += 1
            elif i > 0 and name[i - 1] == typed[j]:
                j += 1
            else:
                return False

        return i == nameLen


if __name__ == "__main__":
    print(Solution().isLongPressedName("vtkgn", "vttkgnn"))
    print(Solution().isLongPressedName("alex", "aaleex"))
    print(Solution().isLongPressedName("aabc", "aab"))
