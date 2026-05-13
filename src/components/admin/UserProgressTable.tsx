import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { mockUsers } from '../../data/mockUsers'
import { ProgressBar } from '../shared/ProgressBar'
import type { MockUser } from '../../types'

type SortKey = 'name' | 'email' | 'programProgress' | 'currentCourse' | 'lastActive' | 'status'
type SortDir = 'asc' | 'desc'

const statusStyles: Record<MockUser['status'], string> = {
  active: 'bg-via-success/15 text-via-success',
  inactive: 'bg-via-border text-via-text-light',
  overdue: 'bg-via-danger/15 text-via-danger',
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function UserProgressTable() {
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...mockUsers].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * mul
    return String(av).localeCompare(String(bv)) * mul
  })

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email', className: 'hidden lg:table-cell' },
    { key: 'programProgress', label: 'Progress' },
    { key: 'currentCourse', label: 'Current Course', className: 'hidden md:table-cell' },
    { key: 'lastActive', label: 'Last Active', className: 'hidden md:table-cell' },
    { key: 'status', label: 'Status' },
  ]

  return (
    <div className="bg-via-card rounded-xl border border-via-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-via-border bg-via-bg-subtle">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left font-semibold text-via-navy cursor-pointer select-none whitespace-nowrap ${col.className ?? ''}`}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className={`w-3.5 h-3.5 ${sortKey === col.key ? 'text-via-orange' : 'text-via-text-light'}`} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((user, idx) => (
              <tr
                key={user.email}
                className={`border-b border-via-border last:border-b-0 ${idx % 2 === 1 ? 'bg-via-bg-subtle/50' : ''}`}
              >
                <td className="px-4 py-3 font-medium text-via-navy whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-via-navy text-white text-xs flex items-center justify-center font-semibold">
                      {user.avatar}
                    </span>
                    {user.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-via-text-light hidden lg:table-cell">{user.email}</td>
                <td className="px-4 py-3 w-40">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-[80px]">
                      <ProgressBar
                        value={user.programProgress}
                        size="sm"
                        color={user.programProgress === 100 ? 'success' : 'orange'}
                      />
                    </div>
                    <span className="text-xs font-semibold text-via-text tabular-nums w-8 text-right">
                      {user.programProgress}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-via-text hidden md:table-cell whitespace-nowrap">
                  {user.currentCourse}
                </td>
                <td className="px-4 py-3 text-via-text-light hidden md:table-cell whitespace-nowrap">
                  {formatDate(user.lastActive)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[user.status]}`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
