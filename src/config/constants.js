import pkg from '@pkg'
import {isElectron as checkIsElectron} from '@/lib'

export const VERSION = pkg.version

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

export const Z_INDEX = {
  MODAL: 99999,
  TOAST: 99999,
  SELECT: 9999,
}

export const URL = {
  GITHUB: 'https://github.com',
  CHANGELOG: 'https://github.com/meetyan/raise/releases',
  SERVER: 'https://trending.curve.to',
}

export const ALLOWED_TIME_OF_INACTIVITY = 1000 * 60 * 60 * 3 // 3 hours

export const isElectron = checkIsElectron()

export const isMac = window.navigator?.userAgentData?.platform.toUpperCase().includes('MAC')

export const isChrome = !!process.env.isChrome

export const isDev = !!process.env.WEBPACK_DEV
