export const VERSION = '1.0.0'

export const TRENDING_TYPE = {
  REPOSITORIES: 'Repositories',
  DEVELOPERS: 'Developers',
}

export const MODE = {
  LIGHT: 'light',
  DARK: 'dark',
}

export const SINCE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
}

export const SINCE_MAP = {
  [SINCE.DAILY]: 'Today',
  [SINCE.WEEKLY]: 'This week',
  [SINCE.MONTHLY]: 'This month',
}

export const SINCE_ARRAY = [
  {name: SINCE_MAP[SINCE.DAILY], value: SINCE.DAILY},
  {name: SINCE_MAP[SINCE.WEEKLY], value: SINCE.WEEKLY},
  {name: SINCE_MAP[SINCE.MONTHLY], value: SINCE.MONTHLY},
]

export const GITHUB_URL = 'https://github.com'
