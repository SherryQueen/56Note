// * 数字数组 number[]
const next_permutation = (ans) => {
  const len = ans.length

  let a, b
  let i = len - 1

  while (i > 0) {
    if (ans[i - 1] < ans[i]) {
      a = i - 1
      break
    }
    i--
  }
  if (i === 0) {
    // * 反转当前数组
    return ans.reverse()
  }

  i = a + 1
  while (i < len) {
    if (ans[a] > ans[i]) {
      b = i - 1
      break
    }
    i++
  }
  if (i === len) {
    // * 调换最后一个
    b = len - 1
  }

  // * 交换值
  ;[ans[a], ans[b]] = [ans[b], ans[a]]

  let l = a + 1
  let r = len - 1
  while (l < r) {
    ;[ans[l], ans[r]] = [ans[r], ans[l]]
    l++
    r--
  }

  return ans
}

console.assert(next_permutation([1, 2, 3, 4, 5, 6, 7]).join('') === '1234576', 'error')
console.assert(next_permutation([7, 6, 5, 4, 3, 2, 1]).join('') === '1234567', 'error')
console.assert(next_permutation([8, 2, 3, 5, 1, 4, 6, 7]).join('') === '82351476', 'error')
console.assert(next_permutation([8, 2, 3, 5, 7, 4, 6, 1]).join('') === '82357614', 'error')
