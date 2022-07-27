import {app} from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {menubar} from 'menubar'

const INDEX_URL = {
  DEV: 'http://localhost:3000',
  PROD: path.join(__dirname, './index.html'),
}

app.whenReady().then(() => {
  const mb = menubar({
    icon: path.join(__dirname, './assets/logo.png'),
    index: isDev ? INDEX_URL.DEV : INDEX_URL.PROD,
    browserWindow: {width: 400, height: 400},
  })

  mb.on('ready', () => {})
})
