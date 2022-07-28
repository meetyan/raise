import {app, BrowserWindow} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

const INDEX_URL = {
  DEV: 'http://localhost:3000',
  PROD: path.join(__dirname, './index.html'),
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
  })

  if (isDev) {
    mainWindow.webContents.openDevTools({mode: 'detach'})
    return mainWindow.loadURL(INDEX_URL.DEV)
  }

  mainWindow.loadFile(INDEX_URL.PROD)
}

app.whenReady().then(() => {
  const mb = menubar({
    icon: path.join(__dirname, './assets/logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {width: 400, height: 600, webPreferences: {devTools: true}},
  })

  if (isDev) {
    createWindow()
  }

  mb.on('ready', () => {})
})
