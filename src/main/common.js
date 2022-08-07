import {app, BrowserWindow, Menu, shell} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import pkg from '../../package.json'
import {INDEX_URL, IPC_FUNCTION, isMac, MENUBAR} from './config'

export const browserWindowConfig = {
  width: MENUBAR.WIDTH,
  height: MENUBAR.HEIGHT,
  webPreferences: {preload: path.join(__dirname, 'preload.js')},
}

export const createWindow = () => {
  const mainWindow = new BrowserWindow({
    ...browserWindowConfig,
    icon: path.join(__dirname, './assets/logo.png'),
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
                label: 'About Raise',
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
      submenu: [{role: 'reload'}, {role: 'forceReload'}, isDev ? {role: 'toggleDevTools'} : {}],
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
