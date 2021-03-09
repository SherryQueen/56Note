#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : canVisitAllRooms.py
@Author     : 56
@Date       : 2020/5/9
@Description: https://leetcode-cn.com/explore/learn/card/queue-stack/220/conclusion/893/
"""
from typing import List


def canVisitAllRooms(rooms: List[List[int]]) -> bool:
    visible = [False for x in range(len(rooms))]

    visible[0] = True

    def openRooms(keys: List[int]):
        for k in keys:
            if visible[k] is False:
                visible[k] = True
                openRooms(rooms[k])

    openRooms(rooms[0])

    return (False in visible) is False


if __name__ == '__main__':
    print(canVisitAllRooms([[2], [], []]))
    print(canVisitAllRooms([[2], [], [1]]))
