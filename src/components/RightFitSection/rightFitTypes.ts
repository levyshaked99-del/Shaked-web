export type RightFitIndustry =
  | 'interior'
  | 'architecture'
  | 'contractors'
  | 'real_estate'
  | 'other'

export type RightFitGoal = 'portfolio' | 'new_clients' | 'filter_leads' | 'brand' | 'combined'

export type RightFitAudience =
  | 'private_clients'
  | 'luxury_projects'
  | 'business_clients'
  | 'diverse'
  | 'undefined_audience'

export type RightFitChallenge =
  | 'showcase'
  | 'irrelevant_leads'
  | 'referrals_only'
  | 'differentiation'
  | 'no_digital'

export interface RightFitAnswers {
  industry?: RightFitIndustry
  goal?: RightFitGoal
  audience?: RightFitAudience
  challenge?: RightFitChallenge
}

export interface PersonalizedResult {
  headline: string
  description: string
  primaryCta: string
}

export type RightFitStep = 1 | 2 | 3 | 4 | 'result'
