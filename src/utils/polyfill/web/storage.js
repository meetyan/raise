/**
 * Saves storage with localStorage.
 */

const storage = window.localStorage

export const setStorage = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify({value}))
  } catch (err) {
    console.log(`An error occurred when setting storage ${key} with value: `, value, err)
  }
}

export const getStorage = key => {
  try {
    return JSON.parse(storage.getItem(key)).value
  } catch (err) {
    console.log(`An error occurred when getting storage ${key}.`, err)
    return null
  }
}

export const setSessionStorage = (key, value) => {
  try {
    chrome.storage.session.set({[key]: value})
  } catch (err) {
    console.log(`An error occurred when setting session storage ${key} with value: `, value, err)
  }
}

export const getSessionStorage = key => {
  return new Promise(resolve => {
    try {
      chrome.storage.session.get([key], result => {
        if (result[key] === undefined) {
          return resolve(null)
        }

        return resolve(result[key])
      })
    } catch (err) {
      console.log(`An error occurred when getting session storage ${key}.`, err)
      return resolve(null)
    }
  })
}

export const getContextFromStorage = () => {
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
