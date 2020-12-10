class UnionFind:
    """
    并查集模板
    """

    def __init__(self, n: int):
        self.ancestors = list(range(n))

    def unionParent(self, parent: int, children: int):
        self.ancestors[children] = parent

    def find(self, target: int) -> int:
        value = self.ancestors[target]
        if value != target:
            value = self.find(value)
            return value
