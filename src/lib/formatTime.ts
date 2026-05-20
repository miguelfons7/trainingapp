/**
 * Utility functions for formatting and aggregating time durations.
 */

/** Format seconds into a human-readable duration string */
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || seconds <= 0) return '—'

  if (seconds < 60) return '< 1 min'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)

  if (hours === 0) return `${minutes} min`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

/** Sum an array of nullable second values, returning total seconds */
export function sumTimeSeconds(values: (number | null | undefined)[]): number {
  return values.reduce<number>((sum, v) => sum + (v ?? 0), 0)
}

/** Average an array of nullable second values, ignoring nulls. Returns null if no valid values. */
export function avgTimeSeconds(values: (number | null | undefined)[]): number | null {
  const valid = values.filter((v): v is number => v != null && v > 0)
  if (valid.length === 0) return null
  return Math.round(valid.reduce((sum, v) => sum + v, 0) / valid.length)
}
