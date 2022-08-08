import path from 'path'
import is from 'electron-is'

export const BROWSER_WINDOW = {
  WIDTH: 1440,
  HEIGHT: 900,
}

export const MENUBAR = {
  WIDTH: 400,
  HEIGHT: 600,
}

export const INDEX_URL = {
  DEV: 'http://localhost:3000',
  PROD: `file://${path.join(__dirname, './index.html')}`,
}

export const isMac = is.macOS()

export const ICON = {
  LOGO: path.join(__dirname, './assets/logo.png'),
  MENU: path.join(__dirname, './assets/menu-logo.png'),
}
