import {app, ipcMain} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

import {IPC_FUNCTION} from '@shared'
import {INDEX_URL, isMac} from './config'
import {handleShowDockIcon} from './ipc'
import {browserWindowConfig, createMenu, createWindow} from './common'
import pkg from '../../package.json'

app.setName(pkg.productName)

let isFirstLoad = true

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
    icon: path.join(__dirname, './assets/menu-logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {...browserWindowConfig, resizable: false},
    preloadWindow: true,
  })

  mb.on('ready', () => {
    if (isDev) {
      createWindow()
    }

    createMenu(mb)

    /**
     * The setTimeout is used as a hack to show window on ready.
     * The window simply flashes and won't stay shown if no delay is set.
     * See https://github.com/maxogden/menubar/issues/76.
     */
    setTimeout(() => {
      mb.showWindow()
    }, 500)
  })

  mb.on('show', () => {
    if (isFirstLoad) return (isFirstLoad = false)

    mb.window.send(IPC_FUNCTION.RELOAD_AFTER_INACTIVITY)

    console.log('on show')
  })
})
