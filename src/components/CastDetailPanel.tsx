import type { CastMember } from '../data/types'

type Props = {
  member: CastMember | null
  onClose: () => void
}

export default function CastDetailPanel({ member, onClose }: Props) {
  if (!member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-stretch lg:justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-surface w-full lg:w-[400px] h-[90vh] lg:h-full rounded-t-2xl lg:rounded-none p-6 overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-foreground">✕</button>
        <h2 className="text-xl font-display font-bold text-foreground">{member.name}</h2>
        <p className="text-muted mt-1">Panel placeholder — full implementation in Task 10</p>
      </div>
    </div>
  )
}
