// オンエア日の編集
export function formatDateJP(d: Date): string {
  return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
}
