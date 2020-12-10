#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : updateMatrix.py
@Author     : 56
@Date       : 2020/5/9
@Description: https://leetcode-cn.com/explore/learn/card/queue-stack/220/conclusion/892/
"""
from typing import List


def updateMatrix(matrix: List[List[int]]) -> List[List[int]]:
    cols = len(matrix)
    if cols == 0: return matrix
    rows = len(matrix[0])
    if rows == 0: return matrix

    def findDistance(dx: int, dy: int) -> int:
        count = -1
        queue: List[List[int, int]] = [[dx, dy]]
        visited = {}
        found = False

        while found is False and len(queue) != 0:
            array = queue
            queue = []

            for p in array:
                a, b = p
                if a < 0 or a >= cols or b < 0 or b >= rows or visited.get('%d|%d' % (a, b)) is True: continue
                if matrix[a][b] == 0:
                    found = True
                    break

                visited['%d|%d' % (a, b)] = True
                queue.append([a + 1, b])
                queue.append([a - 1, b])
                queue.append([a, b + 1])
                queue.append([a, b - 1])
            count += 1

        return count

    for x, arr in enumerate(matrix):
        for y, val in enumerate(arr):
            if val == 0: continue
            matrix[x][y] = findDistance(x, y)

    return matrix


if __name__ == '__main__':
    print(updateMatrix([[0, 0, 0], [0, 1, 0], [0, 0, 0]]))
    print(updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]]))
    print(updateMatrix([[0, 1, 0, 1, 1], [1, 1, 0, 0, 1], [0, 0, 0, 1, 0], [1, 0, 1, 1, 1], [1, 0, 0, 0, 1]]))
    print(updateMatrix([[3], [2], [1], [0], [0], [1], [1], [1]]))
