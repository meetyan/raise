const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

// import {app, BrowserWindow} from 'electron'
// import path from 'path'
// import isDev from 'electron-is-dev'

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.webContents.openDevTools()

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000')
    return
  }

  mainWindow.loadFile(path.join(__dirname, './index.html'))
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
