/**
 * @filename    countOfAtoms.js
 * @author      56
 * @description https://leetcode-cn.com/problems/number-of-atoms/
 */

/**
 * @param {string} formula
 * @return {string}
 */
const countOfAtoms = function (formula) {
  const len = formula.length
  const isNumber = (c) => c > 47 && c < 58
  const isUpperChar = (c) => c > 64 && c < 91
  const isLowerChar = (c) => c > 96 && c < 123

  let i = 0
  const counter = () => {
    let element = ''
    let count = 0
    let map = {}

    const counterMap = () => {
      const _count = count || 1
      if (!element) return
      if (typeof element === 'string') map[element] = (map[element] || 0) + _count
      else {
        Object.keys(element).forEach((ele) => {
          map[ele] = (map[ele] || 0) + element[ele] * _count
        })
      }
    }

    while (i < len) {
      const c = formula[i]
      const cCode = c.charCodeAt()
      i++

      if (c === '(') {
        counterMap()
        element = counter()
        count = 0
        continue
      }
      if (c === ')') {
        counterMap()
        return map
      }

      if (isLowerChar(cCode)) element += c
      else if (isUpperChar(cCode)) {
        counterMap()
        element = c
        count = 0
      } else if (isNumber(cCode)) {
        const n = parseInt(c)
        count = count * 10 + n
      }
    }

    if (element || count) counterMap()
    return map
  }

  const map = counter()
  return Object.keys(map)
    .sort()
    .map((ele) => (ele += map[ele] === 1 ? '' : map[ele]))
    .join('')
}

console.info(countOfAtoms('K4(ON(SO3)2)2'))
