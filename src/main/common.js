import {app, BrowserWindow, Menu, shell, Tray} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import log from 'electron-log'

import {IPC_FUNCTION, STORAGE_KEY} from '@shared'
import pkg from '@pkg'
import {INDEX_URL, isMac, ICON, MENUBAR, store} from './config'

// See https://github.com/electron/electron/issues/19775.
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

export const browserWindowConfig = {
  width: MENUBAR.WIDTH,
  height: MENUBAR.HEIGHT,
  webPreferences: {preload: path.join(__dirname, './preload.js')},
}

export const createWindow = () => {
  const mainWindow = new BrowserWindow({
    ...browserWindowConfig,
    icon: ICON.LOGO,
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(INDEX_URL.DEV)

  return mainWindow
}

export const createMenu = mb => {
  const template = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: `About ${pkg.productName}`,
                click: () => {
                  mb.showWindow()
                  mb.window.send(IPC_FUNCTION.SHOW_ABOUT_MODAL)
                },
              },
              {type: 'separator'},
              {
                label: 'Preferences',
                click: () => {
                  mb.showWindow()
                  mb.window.send(IPC_FUNCTION.SHOW_SETTINGS_MODAL)
                },
              },
              {type: 'separator'},
              {role: 'hide'},
              {role: 'hideOthers'},
              {role: 'unhide'},
              {type: 'separator'},
              {role: 'quit'},
            ],
          },
        ]
      : []),
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forceReload'},
        ...(isDev ? [{role: 'toggleDevTools'}] : []),
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Website',
          click: async () => {
            await shell.openExternal(pkg.repository)
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

/**
 * Creates a right-clickable tray
 * See https://erikmartinjordan.com/menu-contextual-electron
 */
export const createTray = () => {
  const tray = new Tray(ICON.MENU)
  const contextMenu = Menu.buildFromTemplate([{role: 'quit'}])

  tray.on('right-click', () => tray.popUpContextMenu(contextMenu))

  return tray
}

export const showDockIconAtLogin = () => {
  const shouldShowDockIcon = store.get(STORAGE_KEY.SHOW_DOCK_ICON)
  log.info('shouldShowDockIcon', shouldShowDockIcon)
  // Dock icon persists in the dock except a user disables it
  if (shouldShowDockIcon === false) {
    app.dock.hide()
  }
}
