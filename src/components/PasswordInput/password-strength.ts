export const PASSWORD_TYPE = 'password'
export const PASSWORD_PLACEHOLDER = '••••••••••'

export function evaluatePasswordStrength(val: string): {
  score: number
  label: 'Weak' | 'Fair' | 'Good' | 'Strong'
  colorClass: string
  percent: number
} {
  if (!val)
    return { score: 0, label: 'Weak', colorClass: 'bg-gray-200 dark:bg-gray-700', percent: 0 }

  let score = 0
  if (val.length >= 8) score += 1
  if (val.length >= 12) score += 1
  if (/[0-9]/.test(val)) score += 1
  if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score += 1
  if (/[^A-Za-z0-9]/.test(val)) score += 1

  if (score <= 1) {
    return { score: 1, label: 'Weak', colorClass: 'bg-red-500', percent: 25 }
  }
  if (score === 2) {
    return { score: 2, label: 'Fair', colorClass: 'bg-amber-500', percent: 50 }
  }
  if (score === 3) {
    return { score: 3, label: 'Good', colorClass: 'bg-blue-500', percent: 75 }
  }
  return { score: 4, label: 'Strong', colorClass: 'bg-emerald-500', percent: 100 }
}
