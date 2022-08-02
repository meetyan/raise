import {app, BrowserWindow} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import crawl from './crawler'
import {MENUBAR, INDEX_URL} from './config'

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: MENUBAR.WIDTH,
    height: MENUBAR.HEIGHT,
  })

  mainWindow.loadURL(INDEX_URL.DEV)
}

app.setName('Raise')

app.whenReady().then(async () => {
  const mb = menubar({
    icon: path.join(__dirname, './assets/logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {width: MENUBAR.WIDTH, height: MENUBAR.HEIGHT},
  })

  const res = await crawl()

  console.log('res', res)

  if (isDev) {
    createWindow()
  }

  mb.on('ready', () => {})
})
