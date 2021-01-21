function quickSort(arr) {
  function _sort(l, r) {
    if (l >= r) return
    let mid = l
    const p = arr[l]

    for (let i = mid; i <= r; i++) {
      if (p > arr[i]) {
        mid += 1
        ;[arr[i], arr[mid]] = [arr[mid], arr[i]]
      }
    }

    ;[arr[l], arr[mid]] = [arr[mid], arr[l]]
    console.info(l, mid, r)
    _sort(l, mid - 1)
    _sort(mid + 1, r)
  }
  _sort(0, arr.length - 1)
  return arr
}

console.info(quickSort([5, 3, 6, 4, 1, 7, 2]))
