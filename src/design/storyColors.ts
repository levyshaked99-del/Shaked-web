/** Semantic color storytelling — micro-elements & illustrations only */

export type StoryTone = 'yellow' | 'blue' | 'green' | 'purple'

export const STORY = {
  yellow: {
    DEFAULT: '#CA8A04',
    soft: '#FEF9C3',
    muted: 'rgba(202, 138, 4, 0.45)',
    faint: 'rgba(202, 138, 4, 0.12)',
    glow: 'rgba(234, 179, 8, 0.08)',
  },
  blue: {
    DEFAULT: '#2563EB',
    soft: '#EFF6FF',
    muted: 'rgba(37, 99, 235, 0.45)',
    faint: 'rgba(37, 99, 235, 0.1)',
    glow: 'rgba(37, 99, 235, 0.08)',
  },
  green: {
    DEFAULT: '#16A34A',
    soft: '#DCFCE7',
    muted: 'rgba(22, 163, 74, 0.45)',
    faint: 'rgba(22, 163, 74, 0.1)',
    glow: 'rgba(22, 163, 74, 0.08)',
  },
  purple: {
    DEFAULT: '#7C3AED',
    soft: '#F5F3FF',
    muted: 'rgba(124, 58, 237, 0.45)',
    faint: 'rgba(124, 58, 237, 0.1)',
    glow: 'rgba(124, 58, 237, 0.08)',
  },
} as const satisfies Record<StoryTone, { DEFAULT: string; soft: string; muted: string; faint: string; glow: string }>

/** Journey: idea → structure → design → build → launch */
export const JOURNEY_STORY: StoryTone[] = ['yellow', 'blue', 'blue', 'purple', 'green']

/** Process cards — discovery → strategy → design → performance */
export const PROCESS_STORY: StoryTone[] = ['blue', 'blue', 'purple', 'green']

/** Value cards by id */
export const VALUE_STORY: Record<string, StoryTone> = {
  trust: 'yellow',
  leads: 'blue',
  'always-on': 'purple',
  growth: 'green',
}

/** Fit cards by id */
export const FIT_STORY: Record<string, StoryTone> = {
  starting: 'yellow',
  leads: 'green',
  referral: 'blue',
  premium: 'green',
}

export function storyHex(tone: StoryTone): string {
  return STORY[tone].DEFAULT
}

export function storyTailwind(tone: StoryTone) {
  return {
    text: `text-story-${tone}`,
    textMuted: `text-story-${tone}/60`,
    bgSoft: `bg-story-${tone}-soft`,
    border: `border-story-${tone}/20`,
    borderHover: `group-hover:border-story-${tone}/25`,
    dot: `bg-story-${tone}`,
  } as const
}
