#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : LRU.py
@Author     : 56
@Date       : 2020-08-05
@Description: https://leetcode-cn.com/problems/lru-cache/
"""


class Node:
    def __init__(self, key: int, value: int) -> None:
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.head = Node(-1, -1)
        self.tail = Node(-1, -1)
        self.head.next = self.tail
        self.tail.prev = self.head

        self.capacity = capacity
        self.dict = dict()

    def get(self, key: int) -> int:
        node = self.dict.get(key, None)
        if node != None:
            self.raiseNode(node)
        return -1 if node == None else node.value

    def put(self, key: int, value: int) -> None:
        node = self.dict.get(key, None)
        if node == None:
            if len(self.dict) == self.capacity:
                self.removeTail()
            node = Node(key, value)
            self.insertHead(node)
            self.dict[key] = node
        else:
            self.dict[key].value = value
            self.raiseNode(node)

    def insertHead(self, node: Node) -> None:
        node.next = self.head.next
        node.next.prev = node

        node.prev = self.head
        self.head.next = node

    def removeNode(self, node: Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev
        node.prev = None
        node.next = None

    def raiseNode(self, node: Node) -> None:
        self.removeNode(node)
        self.insertHead(node)

    def removeTail(self) -> None:
        node = self.tail.prev
        self.removeNode(node)
        self.dict.pop(node.key)


if __name__ == "__main__":
    cache = LRUCache(2)
    cache.put(2, 1)
    cache.put(1, 1)
    cache.put(2, 3)
    cache.put(4, 1)
    print(cache.get(1))
    print(cache.get(2))

    # cache = LRUCache(2)
    # cache.put(1, 1)
    # cache.put(2, 2)
    # cache.get(1)       # 返回  1
    # cache.put(3, 3)    # 该操作会使得关键字 2 作废
    # cache.get(2)       # 返回 -1 (未找到)
    # cache.put(4, 4)    # 该操作会使得关键字 1 作废
    # cache.get(1)       # 返回 -1 (未找到)
    # cache.get(3)       # 返回  3
    # cache.get(4)       # 返回  4
