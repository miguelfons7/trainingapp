import { Plus, Trash2 } from 'lucide-react'
import type { StatGridBlock } from '../../../types/blocks'
import { IconPicker } from '../IconPicker'

interface Props {
  block: StatGridBlock
  onChange: (updated: StatGridBlock) => void
}

export function StatGridEditor({ block, onChange }: Props) {
  const { columns, stats } = block.data

  const updateStat = (index: number, field: keyof (typeof stats)[0], value: string) => {
    const next = stats.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    onChange({ ...block, data: { ...block.data, stats: next } })
  }

  const addStat = () => {
    onChange({
      ...block,
      data: {
        ...block.data,
        stats: [...stats, { icon: 'BarChart', value: '0', label: 'Stat' }],
      },
    })
  }

  const removeStat = (index: number) => {
    onChange({
      ...block,
      data: { ...block.data, stats: stats.filter((_, i) => i !== index) },
    })
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Columns</label>
        <select
          className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
          value={columns}
          onChange={(e) =>
            onChange({
              ...block,
              data: { ...block.data, columns: Number(e.target.value) as 2 | 3 | 4 },
            })
          }
        >
          <option value={2}>2 columns</option>
          <option value={3}>3 columns</option>
          <option value={4}>4 columns</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-via-text mb-1.5">Stats</label>
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-start gap-2 bg-via-bg-subtle rounded-lg p-3">
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-via-text-light mb-1">Icon</label>
                  <IconPicker
                    value={stat.icon}
                    onChange={(icon) => updateStat(i, 'icon', icon ?? 'BarChart')}
                    allowNone={false}
                  />
                </div>
                <div>
                  <label className="block text-xs text-via-text-light mb-1">Value</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                    value={stat.value}
                    onChange={(e) => updateStat(i, 'value', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-via-text-light mb-1">Label</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                    value={stat.label}
                    onChange={(e) => updateStat(i, 'label', e.target.value)}
                    placeholder="Stat label"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeStat(i)}
                className="mt-5 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove stat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addStat}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add stat
        </button>
      </div>
    </div>
  )
}
