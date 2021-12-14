/**
 * @filename    TrieTree.js
 * @author      56
 * @description https://leetcode-cn.com/problems/implement-trie-prefix-tree/
 */

function Node() {
  this.end = false; // 是否是个叶子节点
  this.children = {};
}

/**
 * Initialize your data structure here.
 */
const Trie = function () {
  this.root = new Node();
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let p = this.root;
  for (let c of word) {
    if (!p.children[c]) p.children[c] = new Node();
    p = p.children[c];
  }
  p.end = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let p = this.root;
  for (let c of word) {
    p = p.children[c];
    if (!p) return false;
  }
  return p.end;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let p = this.root;
  for (let c of prefix) {
    p = p.children[c];
    if (!p) return false;
  }
  return true;
};

const obj = new Trie();
obj.insert("apple");
console.info(obj.startsWith("app"));
console.info(obj.search("app"));
console.info(obj.search("apple"));
obj.insert("app");
console.info(obj.search("app"));
