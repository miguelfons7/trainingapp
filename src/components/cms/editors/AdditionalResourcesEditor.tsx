import { Plus, Trash2 } from 'lucide-react'
import type { AdditionalResourcesBlock } from '../../../types/blocks'

interface Props {
  block: AdditionalResourcesBlock
  onChange: (updated: AdditionalResourcesBlock) => void
}

export function AdditionalResourcesEditor({ block, onChange }: Props) {
  const resources = block.data.resources

  const updateResource = (
    index: number,
    field: keyof (typeof resources)[0],
    value: string
  ) => {
    const next = resources.map((r, i) =>
      i === index ? { ...r, [field]: value || undefined } : r
    )
    onChange({ ...block, data: { ...block.data, resources: next } })
  }

  const addResource = () => {
    onChange({
      ...block,
      data: {
        ...block.data,
        resources: [
          ...resources,
          { title: '', url: '', source: '', description: '' },
        ],
      },
    })
  }

  const removeResource = (index: number) => {
    onChange({
      ...block,
      data: {
        ...block.data,
        resources: resources.filter((_, i) => i !== index),
      },
    })
  }

  return (
    <div>
      <label className="block text-xs font-medium text-via-text mb-1.5">Resources</label>
      <div className="space-y-3">
        {resources.map((res, i) => (
          <div key={i} className="bg-via-bg-subtle rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-via-navy">Resource {i + 1}</span>
              <button
                type="button"
                onClick={() => removeResource(i)}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove resource"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-via-text-light mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={res.title}
                  onChange={(e) => updateResource(i, 'title', e.target.value)}
                  placeholder="Resource title"
                />
              </div>
              <div>
                <label className="block text-xs text-via-text-light mb-1">Source</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                  value={res.source}
                  onChange={(e) => updateResource(i, 'source', e.target.value)}
                  placeholder="Source name"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-via-text-light mb-1">URL</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={res.url}
                onChange={(e) => updateResource(i, 'url', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-xs text-via-text-light mb-1">
                Description <span className="text-via-text-light">(optional)</span>
              </label>
              <input
                type="text"
                className="w-full px-3 py-2.5 rounded-lg border border-via-border bg-white text-sm text-via-text focus:outline-none focus:ring-2 focus:ring-via-orange/30 focus:border-via-orange"
                value={res.description ?? ''}
                onChange={(e) => updateResource(i, 'description', e.target.value)}
                placeholder="Brief description"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addResource}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-via-orange hover:text-orange-700 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add resource
      </button>
    </div>
  )
}
