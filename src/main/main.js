import {app, BrowserWindow, ipcMain, Menu, Tray} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import {MENUBAR, INDEX_URL, IPC_FUNCTION, isMac} from './config'
import {handleShowDockIcon} from './ipc'

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

const createTray = () => {
  const tray = new Tray(path.join(__dirname, './assets/menu-logo.png'))
  const contextMenu = Menu.buildFromTemplate([{role: 'quit'}])
  tray.setContextMenu(contextMenu)
  return tray
}

app.setName('Raise')

/**
 * Show app icon in dock on macOS
 */
if (isMac) {
  app.dock.setIcon(path.join(__dirname, './assets/logo.png'))
  app.dock.show()
}

app.whenReady().then(() => {
  ipcMain.on(IPC_FUNCTION.SHOW_DOCK_ICON, handleShowDockIcon)

  const mb = menubar({
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {...browserWindowConfig, resizable: false},
    preloadWindow: true,
    tray: createTray(),
  })

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

  mb.on('ready', () => {
    if (isDev) {
      createWindow()
    }

    /**
     * The setTimeout is used as a hack to show window on ready.
     * The window simply flashes and won't stay shown if no delay is set.
     * See https://github.com/maxogden/menubar/issues/76.
     */
    setTimeout(() => {
      mb.showWindow()
    }, 500)
  })
})
