import { ExternalLink, BookOpen } from 'lucide-react'

export interface ResourceLink {
  title: string
  url: string
  source: string
  description?: string
}

interface AdditionalResourcesProps {
  resources: ResourceLink[]
  title?: string
}

export function AdditionalResources({
  resources,
  title = 'Additional Resources',
}: AdditionalResourcesProps) {
  if (resources.length === 0) return null

  return (
    <div className="bg-via-card rounded-xl border border-via-border p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-via-navy" />
        <h3 className="text-sm font-semibold text-via-navy uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <p className="text-xs text-via-text-light mb-4">
        Want to learn more? These articles and resources provide additional context on the topics covered in this module.
      </p>
      <div className="space-y-3">
        {resources.map((resource) => (
          <a
            key={resource.url}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg border border-via-border hover:border-via-navy/30 hover:bg-via-bg-subtle transition-all group"
          >
            <ExternalLink className="w-4 h-4 text-via-orange mt-0.5 shrink-0 group-hover:text-via-navy transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-via-navy group-hover:text-via-orange transition-colors">
                {resource.title}
              </p>
              <p className="text-xs text-via-text-light mt-0.5">
                {resource.source}
              </p>
              {resource.description && (
                <p className="text-xs text-via-text mt-1 leading-relaxed">
                  {resource.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
