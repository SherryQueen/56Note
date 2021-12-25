/**
 * @filename    accountsMerge.js
 * @author      56
 * @description https://leetcode-cn.com/problems/accounts-merge/
 */

class UnionFind {
  constructor(n) {
    this.ranks = [...Array(n)].fill(1)
    this.ancestors = [...Array(n)].map((_, i) => i)
  }
  find(t) {
    return this.ancestors[t] === t ? t : (this.ancestors[t] = this.find(this.ancestors[t]))
  }
  union(t1, t2) {
    if (t1 === t2) return
    let r1 = this.find(t1)
    let r2 = this.find(t2)
    if (this.ranks[r1] > this.ranks[r2]) [r1, r2] = [r2, r1]
    this.ancestors[r1] = r2
    this.ranks[r1] += this.ranks[r2]
  }
  groups() {
    const result = {}
    this.ancestors.forEach((p, idx) => {
      const root = this.find(p)
      if (!result[root]) result[root] = []
      result[root].push(idx)
    })
    return result
  }
}

/**
 * 使用并查集标记节点之间的连通性. 通过计算跟节点,得到
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const email2idx = new Map()
  const uf = new UnionFind(accounts.length)

  const result = []
  accounts.forEach((ac, idx) => {
    if (ac.length <= 1) return result.push(ac)

    // * 构建连接图
    let target = idx
    for (let i = 1, len = ac.length; i < len; i++) {
      const email = ac[i]
      if (email2idx.has(email)) {
        target = email2idx.get(email)
        if (target !== idx) uf.union(idx, target)
      }
      email2idx.set(email, idx)
    }
  })

  // * 构建下标与邮箱的对应关系
  const idx2Emails = {}
  for (let email of email2idx.keys()) {
    const idx = uf.find(email2idx.get(email))
    const arr = idx2Emails[idx] || []
    arr.push(email)
    idx2Emails[idx] = arr
  }

  // * 用户与邮箱对应
  for (let key of Object.keys(idx2Emails)) {
    const emails = idx2Emails[key]
    result.push([
      accounts[key][0],
      ...emails.sort((a, b) => {
        const s1 = a.toLocaleLowerCase()
        const s2 = b.toLocaleLowerCase()
        if (s1 < s2) return -1
        if (s1 > s2) return 1
        return 0
      }),
    ])
  }

  return result
}

console.info(
  accountsMerge([
    ['David', 'David0@m.co', 'David1@m.co'],
    ['David', 'David3@m.co', 'David4@m.co'],
    ['David', 'David4@m.co', 'David5@m.co'],
    ['David', 'David2@m.co', 'David3@m.co'],
    ['David', 'David1@m.co', 'David2@m.co'],
  ])
)
console.info(
  accountsMerge([
    ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
    ['John', 'johnsmith@mail.com', 'john00@mail.com'],
    ['Mary', 'mary@mail.com'],
    ['John', 'johnnybravo@mail.com'],
  ])
)
