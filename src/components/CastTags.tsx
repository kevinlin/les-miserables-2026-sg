import type { CastMember } from '../data/types'

type Props = { member: CastMember }

export default function CastTags({ member }: Props) {
  const hasAnyTags = member.tags.length > 0 || (member.awards && member.awards.length > 0)
  if (!hasAnyTags) return null

  return (
    <div className="flex flex-wrap gap-2">
      {member.tags.includes('featured') && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">★ FEATURED</span>
      )}
      {member.tags.includes('local') && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">🇸🇬 LOCAL</span>
      )}
      {member.tags.includes('celebrity') && (
        <span className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">Celebrity</span>
      )}
      {member.awards?.map((award) => (
        <span
          key={award}
          className="text-xs px-2.5 py-1 rounded-full border border-surface-border text-muted"
        >
          {award}
        </span>
      ))}
    </div>
  )
}
