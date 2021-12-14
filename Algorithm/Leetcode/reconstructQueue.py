#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : reconstructQueue.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/queue-reconstruction-by-height/
"""
from typing import List


class Solution:
    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:
        if people == None or len(people) <= 1:
            return people

        # 按身高降序排列，若相等身高，则按前方数量做减法
        people.sort(key=lambda p: p[0]*1000-p[1], reverse=True)
        result = []
        for p in people:
            result.insert(p[1], p)
        return result


if __name__ == "__main__":
    print(Solution().reconstructQueue(
        [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]))
