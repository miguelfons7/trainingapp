import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'orange' | 'success' | 'navy'
}

const sizeClasses: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}

const colorClasses: Record<string, string> = {
  orange: 'bg-via-orange',
  success: 'bg-via-success',
  navy: 'bg-via-navy',
}

export function ProgressBar({ value, size = 'md', color = 'orange' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="flex items-center gap-3">
      <div className={`relative w-full rounded-full bg-via-border overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      {size === 'lg' && (
        <span className="text-sm font-semibold text-via-text tabular-nums whitespace-nowrap">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  )
}
