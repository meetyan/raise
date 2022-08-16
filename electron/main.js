import {app, ipcMain} from 'electron'
import {menubar} from 'menubar'

import {IPC_FUNCTION} from '@shared'
import pkg from '@pkg'
import {INDEX_URL, isMac, ICON, isDev} from './config'
import {handleQuitAndInstall, handleShowDockIcon} from './ipc'
import {
  browserWindowConfig,
  createMenu,
  createTray,
  // eslint-disable-next-line no-unused-vars
  createWindow,
  showDockIconAtLogin,
} from './common'
import updateManager from './update-manager'

app.setName(pkg.productName)

export let mb = null
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
  ipcMain.on(IPC_FUNCTION.QUIT_AND_INSTALL, handleQuitAndInstall)

  mb = menubar({
    icon: ICON.MENU,
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {...browserWindowConfig, resizable: false},
    preloadWindow: true,
    tray: createTray(),
    tooltip: pkg.productName,
  })

  createMenu(mb)

  mb.on('ready', () => {
    updateManager.init()
    showDockIconAtLogin()

    if (isDev) {
      createWindow() // enable this if you need an extra window open
    }

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
