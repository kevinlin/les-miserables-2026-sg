export type Bilingual = { en: string; zh: string }

export type CastTag = 'featured' | 'local' | 'celebrity'

export type CastMember = {
  id: string
  name: string
  role: Bilingual
  bio: Bilingual
  whySpecial: Bilingual | null
  songs: string[]
  photoUrl: string
  tags: CastTag[]
  awards?: string[]
}

export type Song = {
  id: string
  title: Bilingual
  character: Bilingual
  act: 1 | 2 | 'prologue' | 'epilogue'
  description: Bilingual
}

export type Highlight = {
  id: string
  icon: string
  title: Bilingual
  body: Bilingual
}
