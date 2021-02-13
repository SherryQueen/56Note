/**
 * @filename    findDisappearedNumbers.js
 * @author      56
 * @description https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/
 */


var findDisappearedNumbers = function(nums) {
    const len = nums.length
    for(let i = 0; i<len; i++) {
        const idx = Math.abs(nums[i]) - 1
        nums[idx] = nums[idx] > 0 ? -nums[idx]: nums[idx]
    }
    const res = []
    for(let i = 0; i<len; i++) {
        if(nums[i] > 0) res.push(i+1)
    }
    return res
};
