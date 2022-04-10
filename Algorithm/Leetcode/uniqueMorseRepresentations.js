/**
 * @filename    uniqueMorseRepresentations.js
 * @author      56
 * @description https://leetcode-cn.com/problems/unique-morse-code-words/
 */

/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
  const morseCode = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..',
  ]

  const res = new Set()
  words.forEach((word) => {
    const ans = []
    for (const c of word) ans.push(morseCode[c.charCodeAt() - 97])
    res.add(ans.join(''))
  })
  return res.size
}
