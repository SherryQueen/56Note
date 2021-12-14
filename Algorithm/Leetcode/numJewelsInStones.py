#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : numJewelsInStones.py
@Author     : 56
@Date       : 2020-10-02
@Description: https://leetcode-cn.com/problems/jewels-and-stones/
"""


class Solution:
    def numJewelsInStones(self, J: str, S: str) -> int:
        jLen = len(J)
        sLen = len(S)

        if jLen == 0 or sLen == 0:
            return 0
        jMap = {j: True for j in J}
        jewels = 0
        for s in S:
            if jMap.get(s, False):
                jewels += 1

        return jewels


if __name__ == "__main__":
    print(Solution().numJewelsInStones('a', 'ab'))
