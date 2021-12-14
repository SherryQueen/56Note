  
#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : repeatedSubstringPattern.py
@Author     : 56
@Description: https://leetcode-cn.com/problems/repeated-substring-pattern/
"""

class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        sLen = len(s)
        subStr = s[0]

        def canRepeat() -> bool:
            subLen = len(subStr)
            if sLen == subLen:
                return False
            for index in range(subLen):
                for idx in range(subLen, sLen, subLen):
                    if subStr[index] != s[index+idx]:
                        return False
            return True

        for c in s[1:]:
            # Maybe is a valid sub string
            if c == subStr[0] and sLen % len(subStr) == 0:
                res = canRepeat()
                if res:
                    return True
            subStr += c
        return False


if __name__ == "__main__":
    print(Solution().repeatedSubstringPattern('a'))
    print(Solution().repeatedSubstringPattern('aa'))
    print(Solution().repeatedSubstringPattern('aba'))
    print(Solution().repeatedSubstringPattern('abba'))
    print(Solution().repeatedSubstringPattern('abcab'))
    print(Solution().repeatedSubstringPattern('abaaba'))
