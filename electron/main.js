import {app, BrowserWindow, ipcMain, Menu} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import {MENUBAR, INDEX_URL, IPC_FUNCTION, isMac} from './config'
import {handleShowDockIcon} from './ipc-functions'

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

  return mainWindow
}

/**
 * Show app icon in dock on macOS
 */
if (isMac) {
  app.dock.setIcon(path.join(__dirname, './assets/logo.png'))
  app.dock.show()
}

app.setName('Raise')

app.whenReady().then(() => {
  const mb = menubar({
    icon: path.join(__dirname, './assets/menu-logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {...browserWindowConfig, resizable: false},
  })

  ipcMain.on(IPC_FUNCTION.SHOW_DOCK_ICON, handleShowDockIcon)

  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: 'About Raise',
                click: () => {
                  mb.showWindow()
                  mb.window.send(IPC_FUNCTION.SHOW_ABOUT_MODAL)
                },
              },
              {type: 'separator'},
              {role: 'quit'},
            ],
          },
        ]
      : []),
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  if (isDev) {
    createWindow()
  }

  mb.on('ready', () => {
    mb.showWindow()
  })
})
