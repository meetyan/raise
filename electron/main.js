import {app, BrowserWindow} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import {MENUBAR, INDEX_URL} from './config'

const browserWindowConfig = {
  width: MENUBAR.WIDTH,
  height: MENUBAR.HEIGHT,
  webPreferences: {preload: path.join(__dirname, 'preload.js')},
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    ...browserWindowConfig,
    icon: path.join(__dirname, './assets/logo.png'),
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(INDEX_URL.DEV)
}

/**
 * Show app icon in dock on macOS
 */
if (process.platform === 'darwin') {
  app.dock.setIcon(path.join(__dirname, './assets/logo.png'))
}

app.setName('Raise')

app.whenReady().then(async () => {
  const mb = menubar({
    icon: path.join(__dirname, './assets/menu-logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {...browserWindowConfig, resizable: false},
    showDockIcon: true,
  })

  if (isDev) {
    createWindow()
  }

  mb.on('ready', () => {
    mb.showWindow()
  })
})
