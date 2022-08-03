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
