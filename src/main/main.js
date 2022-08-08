import {app, ipcMain} from 'electron'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import {IPC_FUNCTION} from '@shared'
import {INDEX_URL, isMac, ICON} from './config'
import {handleShowDockIcon} from './ipc'
import {browserWindowConfig, createMenu, createTray, createWindow} from './common'
import pkg from '../../package.json'

app.setName(pkg.productName)

let isFirstLoad = true

/**
 * Shows app icon in dock on macOS
 */
if (isMac) {
  app.dock.setIcon(ICON.LOGO)
  app.dock.show()
}

app.whenReady().then(() => {
  ipcMain.on(IPC_FUNCTION.SHOW_DOCK_ICON, handleShowDockIcon)

  const mb = menubar({
    icon: ICON.MENU,
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {...browserWindowConfig, resizable: false},
    preloadWindow: true,
    tray: createTray(),
  })

  mb.on('ready', () => {
    if (isDev) {
      // createWindow() // enable this if you need an extra window open
    }

    createMenu(mb)

    /**
     * The setTimeout is used as a hack to show window on ready.
     * Otherwise the window simply flashes and won't stay shown.
     * See https://github.com/maxogden/menubar/issues/76.
     */
    setTimeout(() => {
      mb.showWindow()
    }, 500)
  })

  mb.on('show', () => {
    /**
     * Reloads page after a long period of inactivity.
     * Checks on every show() call (except when the app loads for the very first time).
     */
    if (isFirstLoad) return (isFirstLoad = false)
    mb.window.send(IPC_FUNCTION.RELOAD_AFTER_INACTIVITY)
  })
})
