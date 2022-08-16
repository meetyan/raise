/**
 * Saves storage with electron-store.
 * This storage communicates with electron's main.js
 * rather than browser's window.localStorage
 */

const {storage} = window.electron

export const setStorage = (key, value) => {
  try {
    storage.set(key, value)
  } catch (err) {
    console.log(`An error occurred when setting storage ${key} with value: `, value, err)
  }
}

export const getStorage = key => {
  try {
    return storage.get(key)
  } catch (err) {
    console.log(`An error occurred when getting storage ${key}.`, err)
    return null
  }
}

export const getContextFromStorage = () => {
  try {
    return storage.store() || {}
  } catch (err) {
    console.log('An error occurred when getting context from storage.', err)
    return {}
  }
}
