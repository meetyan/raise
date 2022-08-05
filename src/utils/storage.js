import {RAISE_CONTEXT_STORAGE} from '@/config'

export const setStorageSync = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify({value}))
}

export const getStorageSync = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key)).value
  } catch (e) {
    return null
  }
}

export const getContextFromStorage = () => {
  return getStorageSync(RAISE_CONTEXT_STORAGE) || {}
}
