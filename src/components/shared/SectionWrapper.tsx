interface SectionWrapperProps {
  id: string
  title: string
  subtitle: string
  accentColor: string
  icon: React.ReactNode
  children: React.ReactNode
}

export function SectionWrapper({
  id,
  title,
  subtitle,
  accentColor,
  icon,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id}>
      <div className={`border-l-4 ${accentColor} pl-4 mb-6`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-via-text-light">{icon}</span>
          <h2 className="text-xl font-semibold text-via-navy">{title}</h2>
        </div>
        <p className="text-sm text-via-text-light">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
