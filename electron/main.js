import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import {MENUBAR, INDEX_URL} from './config'
import crawl from './crawler'

const browserWindowConfig = {
  width: MENUBAR.WIDTH,
  height: MENUBAR.HEIGHT,
  webPreferences: {preload: path.join(__dirname, 'preload.js'), nodeIntegration: true},
}

const createWindow = () => {
  const mainWindow = new BrowserWindow(browserWindowConfig)
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(INDEX_URL.DEV)
}

app.setName('Raise')

app.whenReady().then(async () => {
  ipcMain.handle('crawl', crawl)

  const mb = menubar({
    icon: path.join(__dirname, './assets/logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: browserWindowConfig,
  })

  if (isDev) {
    createWindow()
  }

  mb.on('ready', () => {})
})
