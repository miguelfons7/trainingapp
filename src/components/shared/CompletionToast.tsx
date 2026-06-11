import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { onCelebrate } from '../../lib/celebrate'

/**
 * Global completion toast — celebrates lesson module completions.
 * Mounted once in AppShell so it survives route changes.
 */
export function CompletionToast() {
  const [message, setMessage] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const unsubscribe = onCelebrate((msg) => {
      setMessage(msg)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setMessage(null), 2800)
    })
    return () => {
      unsubscribe()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-via-navy text-white shadow-xl">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', damping: 12 }}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </motion.span>
            <p className="text-sm font-semibold">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
