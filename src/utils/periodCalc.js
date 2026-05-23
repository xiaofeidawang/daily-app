export function calcAvgCycle(records) {
  const sorted = [...records].sort((a, b) => new Date(a.start) - new Date(b.start))
  if (sorted.length < 2) return 28

  let total = 0
  let count = 0
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].start)
    const curr = new Date(sorted[i].start)
    const diff = Math.round((curr - prev) / (1000 * 60 * 60 * 24))
    if (diff > 15 && diff < 60) {
      total += diff
      count++
    }
  }
  return count > 0 ? Math.round(total / count) : 28
}

export function calcAvgDuration(records) {
  const withEnd = records.filter((r) => r.end)
  if (withEnd.length === 0) return 5
  const total = withEnd.reduce((sum, r) => {
    const diff = Math.round((new Date(r.end) - new Date(r.start)) / (1000 * 60 * 60 * 24)) + 1
    return sum + diff
  }, 0)
  return Math.round(total / withEnd.length)
}

export function predictNext(records) {
  if (records.length === 0) return null
  const sorted = [...records].sort((a, b) => new Date(a.start) - new Date(b.start))
  const last = sorted[sorted.length - 1]
  const avgCycle = calcAvgCycle(records)
  const avgDuration = calcAvgDuration(records)

  const lastStart = new Date(last.start)
  const nextStart = new Date(lastStart)
  nextStart.setDate(nextStart.getDate() + avgCycle)

  const nextEnd = new Date(nextStart)
  nextEnd.setDate(nextEnd.getDate() + avgDuration - 1)

  const ovulation = new Date(nextStart)
  ovulation.setDate(ovulation.getDate() - 14)

  return {
    nextStart: formatDate(nextStart),
    nextEnd: formatDate(nextEnd),
    ovulation: formatDate(ovulation),
    avgCycle,
    avgDuration,
  }
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return formatDate(d)
}

export function formatDisplay(dateStr) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}
