import {
  GOAL_HEADLINES,
  OTHER_INDUSTRY_HEADLINE,
  buildPersonalizedCta,
  coreIndustryDescription,
  fallbackResult,
  otherIndustryDescription,
} from './rightFitResults'
import type { PersonalizedResult, RightFitAnswers, RightFitIndustry } from './rightFitTypes'

function isCoreIndustry(
  industry: RightFitIndustry,
): industry is Exclude<RightFitIndustry, 'other'> {
  return industry !== 'other'
}

export function isAnswersComplete(answers: RightFitAnswers): boolean {
  return Boolean(answers.industry && answers.goal && answers.audience && answers.challenge)
}

/**
 * Welcoming modular result — never rejects by industry.
 * Headline: Q2 goal. Description: Q3 + Q4; other-industry uses fixed block + Q2 one-liner.
 */
export function composeResult(answers: RightFitAnswers): PersonalizedResult {
  const { industry, goal, audience, challenge } = answers

  if (!isAnswersComplete(answers) || !industry || !goal || !audience || !challenge) {
    return fallbackResult()
  }

  const primaryCta = buildPersonalizedCta()

  if (industry === 'other') {
    return {
      headline: OTHER_INDUSTRY_HEADLINE,
      description: otherIndustryDescription(goal),
      primaryCta,
    }
  }

  if (!isCoreIndustry(industry)) {
    return fallbackResult()
  }

  const headline = GOAL_HEADLINES[goal] ?? fallbackResult().headline
  const description = coreIndustryDescription(industry, audience, challenge)

  return {
    headline,
    description,
    primaryCta,
  }
}
