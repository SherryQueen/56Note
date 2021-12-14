export const formatDateTime = (date: Date | string | number, format = 'YY/MM/DD HH:mm:ss') => {
  let d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) d = new Date()
  const y = d.getFullYear() + ''
  return format
    .replace(/Y+/g, (str: string) => (str.length <= 4 ? y.slice(4 - str.length) : y.padStart(str.length, '0')))
    .replace(/M+/g, (str: string) => (d.getMonth() + 1 + '').padStart(str.length, '0'))
    .replace(/D+/g, (str: string) => (d.getDate() + '').padStart(str.length, '0'))
    .replace(/H+/g, (str: string) => (d.getHours() + '').padStart(str.length, '0'))
    .replace(/m+/g, (str: string) => (d.getMinutes() + '').padStart(str.length, '0'))
    .replace(/s+/g, (str: string) => (d.getSeconds() + '').padStart(str.length, '0'))
    .replace(/S+/g, () => d.getMilliseconds() + '')
}
