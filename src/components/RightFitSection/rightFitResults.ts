import type {
  PersonalizedResult,
  RightFitAudience,
  RightFitChallenge,
  RightFitGoal,
  RightFitIndustry,
} from './rightFitTypes'

export const RESULT_CTA_LABEL = 'בואו נדבר על העסק'

export const OTHER_INDUSTRY_HEADLINE = 'לכל עסק יש סיפור ששווה להציג.'

export const OTHER_INDUSTRY_BODY =
  'עובדים עם עסקים ממגוון תחומים ועוזרים להם להפוך רעיונות לנוכחות דיגיטלית מדויקת. נשמח להכיר את העסק שלכם, להבין את המטרות ולחשוב יחד על הפתרון הנכון.'

export const GOAL_HEADLINES: Record<RightFitGoal, string> = {
  portfolio: 'תיק עבודות שמדבר בשפה שלכם.',
  new_clients: 'אתר שמזמין פרויקטים ולקוחות חדשים.',
  filter_leads: 'פניות שמרגישות במקום הנכון.',
  brand: 'מותג שבולט — בלי רעש מיותר.',
  combined: 'כמה מטרות, סיפור אחד ברור.',
}

export const GOAL_ONE_LINER: Record<RightFitGoal, string> = {
  portfolio:
    'שמתמקדים כרגע בהצגה מקצועית של העבודה שלכם — זה כיוון מצוין להתחיל ממנו.',
  new_clients: 'שחשוב לכם למשוך לקוחות ופרויקטים חדשים — נשמח לחשוב יחד איך האתר יתמוך בזה.',
  filter_leads: 'שאתם מחפשים פניות מדויקות יותר — נוכל לעזור לבנות את המסר והמסלול הנכונים.',
  brand: 'שבניית מותג וייחוד בעדיפות — נשמח לתרגם את זה לנוכחות דיגיטלית עקבית.',
  combined: 'שיש לכם כמה מטרות במקביל — נאתר יחד סדר עדיפויות וכיוון ברור.',
}

export const AUDIENCE_PHRASES: Record<RightFitAudience, string> = {
  private_clients: 'אתם מכוונים ללקוחות פרטיים שמחפשים עיצוב או שיפוץ — נבנה מסר שמדבר אליהם בביטחון.',
  luxury_projects: 'אתם שואפים לפרויקטים גדולים ויוקרתיים — נתאים טון ומבנה שמשקפים רמה גבוהה.',
  business_clients: 'הקהל שלכם עסקי ומסחרי — נדייק מסר שמדבר שפת עסקים.',
  diverse: 'הפרויקטים שלכם מגוונים — נעצב מסגרת שמכילה את הפאץ׳ הרחב בלי לאבד בהירות.',
  undefined_audience: 'עדיין מגבשים את קהל היעד — נעזור לחדד את המסר תוך כדי התקדמות.',
}

export const CHALLENGE_PHRASES: Record<RightFitChallenge, string> = {
  showcase: 'קשה כרגע להציג עבודות כמו שצריך — נשים דגש על מבנה ויזואלי שמרים את הרמה.',
  irrelevant_leads: 'חלק מהפניות פחות רלוונטיות — נחשוב על ניסוח ומסלול שממקדים את הפנייה הנכונה.',
  referrals_only: 'רוב העסק מגיע מהמלצות ורשתות — אתר יכול לחזק את הזרם ולייצר יציבות.',
  differentiation: 'לא תמיד קל להסביר מה מייחד אתכם — נעזור להפוך את זה למסר ברור מהרגע הראשון.',
  no_digital: 'עדיין בלי נוכחות דיגיטלית מסודרת — זה בסיס מצוין לבנות ממנו שלב ראשון חכם.',
}

export const INDUSTRY_FLAVOR: Record<Exclude<RightFitIndustry, 'other'>, string> = {
  interior: 'בעולם עיצוב הפנים,',
  architecture: 'בתחום האדריכלות,',
  contractors: 'בעולם הקבלנות והשיפוצים,',
  real_estate: 'בבנייה ונדל״ן,',
}

export const DEFAULT_HEADLINE = 'בואו נבנה כיוון ברור לאתר הבא שלכם.'
export const DEFAULT_DESCRIPTION =
  'נשמח להכיר את העסק, את המטרות ואת האתגרים — ולחשוב יחד על נוכחות דיגיטלית שתומכת בצמיחה.'

export function buildPersonalizedCta(): string {
  return RESULT_CTA_LABEL
}

export function coreIndustryDescription(
  industry: Exclude<RightFitIndustry, 'other'>,
  audience: RightFitAudience,
  challenge: RightFitChallenge,
): string {
  const flavor = INDUSTRY_FLAVOR[industry]
  return `${flavor} ${AUDIENCE_PHRASES[audience]} ${CHALLENGE_PHRASES[challenge]}`.replace(/\s+/g, ' ').trim()
}


export function otherIndustryDescription(goal: RightFitGoal): string {
  return `${OTHER_INDUSTRY_BODY} ${GOAL_ONE_LINER[goal]}`.trim()
}

export function fallbackResult(): PersonalizedResult {
  return {
    headline: DEFAULT_HEADLINE,
    description: DEFAULT_DESCRIPTION,
    primaryCta: buildPersonalizedCta(),
  }
}
