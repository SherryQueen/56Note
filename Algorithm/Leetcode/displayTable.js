/**
 * @filename    displayTable.js
 * @author      56
 * @description https://leetcode-cn.com/problems/display-table-of-food-orders-in-a-restaurant/
 */

/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
var displayTable = function (orders) {
  const tableFoods = {}
  const foodNames = new Set()
  orders.forEach(([, table, food]) => {
    foodNames.add(food)

    const t = tableFoods[table] || {}
    t[food] = (t[food] || 0) + 1
    tableFoods[table] = t
  })
  const foods = Array.from(foodNames).sort()
  const result = [['Table', ...foods]]
  Object.keys(tableFoods)
    .sort((a, b) => +a - +b)
    .forEach((table) => {
      const order = tableFoods[table]
      result.push([table, ...foods.map((f) => (order[f] || 0).toString())])
    })
  return result
}
