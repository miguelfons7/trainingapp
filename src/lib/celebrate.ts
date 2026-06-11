/**
 * Tiny pub/sub for completion celebrations. Components call celebrate()
 * and the globally-mounted CompletionToast renders it — this survives
 * route navigation (e.g. completing a lesson navigates to the next one).
 */

type Listener = (message: string) => void

const listeners = new Set<Listener>()

export function celebrate(message: string) {
  listeners.forEach((fn) => fn(message))
}

export function onCelebrate(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
