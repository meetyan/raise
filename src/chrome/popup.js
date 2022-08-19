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
document.documentElement.style.width = '400px'
document.documentElement.style.minHeight = '599.9px' // not sure why setting height to 600px causes page not scrollable
