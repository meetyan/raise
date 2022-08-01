// const {app, BrowserWindow} = require('electron')
// const path = require('path')
// const isDev = require('electron-is-dev')
// const {menubar} = require('menubar')

import {app, BrowserWindow} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

const INDEX_URL = {
  DEV: 'http://localhost:3000',
  PROD: `file://${path.join(__dirname, './index.html')}`,
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
  })

  mainWindow.webContents.openDevTools({mode: 'detach'})

  mainWindow.loadURL(INDEX_URL.DEV)
}

app.setName('Raise')

app.whenReady().then(() => {
  const mb = menubar({
    icon: path.join(__dirname, './assets/logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {width: 400, height: 600},
  })

  if (isDev) {
    createWindow()
  }

  mb.on('ready', () => {})
})
