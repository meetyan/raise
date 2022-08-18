/**
 * Set body's background color to either light or dark
 * This prevents popup from flashing on app launch
 */

const lightColor = '#fff'
const darkColor = '#16161a'
const MODE = 'mode'

const getStorage = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key)).value
  } catch (err) {
    console.log(`An error occurred when getting storage ${key}.`, err)
    return null
  }
}

const mode = getStorage(MODE)
document.body.style.backgroundColor = mode === 'dark' ? darkColor : lightColor
