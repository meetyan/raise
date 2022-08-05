import path from 'path'

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

export const IPC_FUNCTION = {
  SHOW_ABOUT_MODAL: 'show-about-modal',
  SHOW_DOCK_ICON: 'show-dock-icon',
}

export const isMac = process.platform === 'darwin'
