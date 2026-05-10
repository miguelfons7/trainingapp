import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ExpandableCardProps {
  title: string
  subtitle?: string
  badge?: React.ReactNode
  icon?: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  accentColor?: string
  children: React.ReactNode
}

export function ExpandableCard({
  title,
  subtitle,
  badge,
  icon,
  isExpanded,
  onToggle,
  accentColor = 'border-slate-200',
  children,
}: ExpandableCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${
        isExpanded ? `border-l-4 ${accentColor}` : ''
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full flex items-center gap-3 p-5 text-left cursor-pointer"
      >
        {icon && <span className="shrink-0 text-slate-500">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-semibold text-slate-800">{title}</span>
            {badge}
          </div>
          {subtitle && (
            <p className="text-sm text-slate-500 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
