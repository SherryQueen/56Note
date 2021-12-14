#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : uniqueOccurrences.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/unique-number-of-occurrences/
"""
from typing import List


class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        if len(arr) == 1:
            return True

        _map = {}
        for n in arr:
            count = _map.get(n, 0)
            _map[n] = count + 1

        result = _map.values()
        return len(result) == len(set(result))


if __name__ == "__main__":
    print(Solution().uniqueOccurrences([1, 2, 2, 2, 3, 3]))
    print(Solution().uniqueOccurrences([1, 2, 3, 3]))
