/**
 * @filename    checkInclusion.js
 * @author      56
 * @description https://leetcode-cn.com/problems/permutation-in-string/
 */

/**
 * 滑动窗口
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const len1 = s1.length
    const len2 = s2.length

    if(len2 < len1) return false

    const arr = [...Array(26)].fill(0)
    function match() {
        for(let i=0; i< 26; i++) {
            if(arr[i] !== 0) return false 
        }
        return true
    }

    for(let i = 0; i<len1; i++) {
        arr[s1[i].charCodeAt() - 97]++
        arr[s2[i].charCodeAt() - 97]--
    }
    if(match()) return true
    let k = 1;
    while(k+len1 <= len2) {
        arr[s2[k-1].charCodeAt() - 97]++
        arr[s2[k+len1-1].charCodeAt() - 97]--
        if(match()) return true
        k++
    }
    return false
};


作者：SherryQueen
链接：https://leetcode-cn.com/problems/permutation-in-string/solution/hua-dong-chuang-kou-by-sherryqueen-cmtl/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
