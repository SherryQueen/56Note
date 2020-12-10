/**
 * @filename    maximumGap.js
 * @author      56
 * @description https://leetcode-cn.com/problems/maximum-gap/
 */

// 桶排序。找出当前列表中的最大值于最小值。
// 按数组长度建立 长度+1 个桶 最小的桶存放最小值 最大的桶存放最大值
// 每个桶记录当前桶中的最大值于最小值
const maximumGap = function (nums) {
  const len = nums.length;
  if (len < 2) return 0;
  let min = nums[0];
  let max = nums[0];

  for (let i = 1; i < len; i++) {
    min = Math.min(nums[i], min);
    max = Math.max(nums[i], max);
  }

  const diff = max - min;
  const buckets = [];
  buckets[0] = { min, max: min };
  buckets[len] = { min: max, max };
  for (let i = 0; i < len; i++) {
    const num = nums[i];

    // Map to bucket
    const idx = Math.floor(((num - min) * len) / diff); // bucket range: diff / len    idx = (num-min) / (diff/len)
    if (buckets[idx]) {
      buckets[idx].min = Math.min(buckets[idx].min, num);
      buckets[idx].max = Math.max(buckets[idx].max, num);
    } else buckets[idx] = { max: num, min: num };
  }

  // console.info(buckets);
  // * Calc the maximum gap
  let gap = 0;
  let lastMax = buckets[0].max;
  for (let i = 0; i < len; i++) {
    if (!buckets[i + 1]) continue;
    else {
      gap = Math.max(gap, buckets[i + 1].min - lastMax);
      lastMax = buckets[i + 1].max;
    }
  }
  return gap;
};

console.info(maximumGap([0, 5, 10, 50, 60, 61, 50, 90, 100]));
