export function formatZero (num, len) {
  if (String(num).length > len) {
    return num
  }
  return (Array(len).join(0) + num).slice(-len)
}
