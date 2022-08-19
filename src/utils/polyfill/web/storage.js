/**
 * Saves storage with localStorage.
 */

export const setStorage = (key, value, {useSessionStorage = false} = {}) => {
  const storage = useSessionStorage ? window.sessionStorage : window.localStorage
  try {
    storage.setItem(key, JSON.stringify({value}))
  } catch (err) {
    console.log(`An error occurred when setting storage ${key} with value: `, value, err)
  }
}

export const getStorage = (key, {useSessionStorage = false} = {}) => {
  const storage = useSessionStorage ? window.sessionStorage : window.localStorage
  try {
    return JSON.parse(storage.getItem(key)).value
  } catch (err) {
    console.log(`An error occurred when getting storage ${key}.`, err)
    return null
  }
}

export const getContextFromStorage = () => {
  const storage = window.localStorage
  try {
    const context = Object.keys(storage).reduce((final, key) => {
      final[key] = getStorage(key)
      return final
    }, {})

    return context || {}
  } catch (err) {
    console.log('An error occurred when getting context from storage.', err)
    return {}
  }
}
