function isEmptyObject(ans) {
  if (!ans) return false
  if (typeof ans !== 'object') return false
  if (Array.isArray(ans)) return false
  return !(Object.getOwnPropertyNames(ans).length + Object.getOwnPropertySymbols(ans).length)
}
