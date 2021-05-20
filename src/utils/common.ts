// 获取字符串长度，按照中文 2,其他 1
export const getStrLen = (str: string): number => Array.from(str).reduce((size, s) => {
  if (s.match(/[^\x00-\xff]/ig)) {
    size += 2
  } else {
    size += 1
  }
  return size
}, 0)

// 字符串截取
export const truncateString = (str: string, num: number): string =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str

// 生成连续的 Array<number>
const geometricProgression = (end: number, start = 1): number[] =>
  Array.from({ length: end - start }).map(
    (_, i) => start + i
  )

// 生成英文 A-Z
export const EnglishChar = (): string[] => geometricProgression(91, 65).map(i => String.fromCharCode(i))

// 移除字符串中的 px
export const removePx = (str: string): number => Number(str.replace('px', ''))
