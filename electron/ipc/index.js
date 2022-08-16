import {app} from 'electron'
import {autoUpdater} from 'electron-updater'

import {isMac} from '../config'

export const handleShowDockIcon = (_, visible) => {
  if (!isMac) return

  if (visible) {
    app.dock.show()
    return
  }

  app.dock.hide()
}

export const handleQuitAndInstall = () => {
  autoUpdater.quitAndInstall()
}
