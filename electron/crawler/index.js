import {app, BrowserView, BrowserWindow} from 'electron'

import {parseRepos} from './parser'
import {BROWSER_WINDOW} from '../config'

const {WIDTH, HEIGHT} = BROWSER_WINDOW

let browserWindow

const getHTML = `function getHTML() {
  return new Promise((resolve, reject) => {
    resolve(document.documentElement.innerHTML)
  })
}

getHTML()`

/**
 * Crawl with BrowserWindow and BrowserView
 * This will open a new url on every function call
 */
const crawl = async () => {
  const view = new BrowserView()

  browserWindow.setBrowserView(view)
  view.setBounds({x: 0, y: 0, width: WIDTH, height: HEIGHT})

  await view.webContents.loadURL('https://github.com/trending')
  const html = await view.webContents.executeJavaScript(getHTML)

  return parseRepos(html)
}

app.whenReady().then(() => {
  browserWindow = new BrowserWindow({width: WIDTH, height: HEIGHT, show: false})
})

export default crawl
