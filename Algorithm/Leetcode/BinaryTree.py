#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
@FileName   : BinaryTree.py
@Author     : 56
@Description: Binary Tree related
"""


class Node:
    def __init__(self, value=None, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


def pre_order_traversal(node):
    print(node.value, end=" ")

    if node.left is not None:
        pre_order_traversal(node.left)
    if node.right is not None:
        pre_order_traversal(node.right)


def mid_order_traversal(node):
    if node.left is not None:
        mid_order_traversal(node.left)

    print(node.value, end=" ")

    if node.right is not None:
        mid_order_traversal(node.right)


def post_order_traversal(node):
    if node.left is not None:
        post_order_traversal(node.left)

    if node.right is not None:
        post_order_traversal(node.right)

    print(node.value, end=" ")


def bfs(_root):
    arr = [_root]
    while len(arr) != 0:
        array = arr
        arr = []

        for node in array:
            print(node.value, end=" ")
            if node.left:
                arr.append(node.left)
            if node.right:
                arr.append(node.right)


if __name__ == "__main__":
    root = Node(1, Node(2, Node(3), Node(4)), Node(5, Node(6, Node(7))))
    if root is None:
        raise Exception("Root is none")
    print("\nPreOrder")
    pre_order_traversal(root)
    print("\nMidOrder")
    mid_order_traversal(root)
    print("\nPostOrder")
    post_order_traversal(root)
    print("\nBfs")
    bfs(root)
    exit(0)
