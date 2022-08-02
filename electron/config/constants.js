import path from 'path'

export const BROWSER_WINDOW = {
  WIDTH: 1440,
  HEIGHT: 900,
}

export const MENUBAR = {
  WIDTH: 400,
  HEIGHT: 600,
}

export const GITHUB_TRENDING_URL = 'https://github.com/trending'
export const GITHUB_TRENDING_DEVELOPER_URL = 'https://github.com/trending/developers'

export const INDEX_URL = {
  DEV: 'http://localhost:3000',
  PROD: `file://${path.join(__dirname, './index.html')}`,
}
