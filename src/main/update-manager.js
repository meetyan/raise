import {dialog} from 'electron'
import {autoUpdater} from 'electron-updater'
import log from 'electron-log'

import {STORAGE_KEY} from '@shared'
import pkg from '@pkg'
import {store, INTERVAL} from './config'

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

let updateInterval = null

const onUpdateDownloaded = () => {
  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Update Available',
        message: `A new version of ${pkg.productName} is available!`,
        detail:
          'This version includes bug fixes and feature updates. Would you like to restart to update now?',
      })
      .then(res => {
        if (res.response !== 0) return

        autoUpdater.quitAndInstall()
        clearInterval(updateInterval)
      })
  })
}

const checkForUpdates = () => {
  const shouldAutoUpdate = store.get(STORAGE_KEY.ENABLE_AUTO_UPDATE)

  if (!shouldAutoUpdate) {
    log.info('AUTO_UPDATE is set to false. Abort auto update...')
    return
  }

  autoUpdater.checkForUpdates()
}

const init = () => {
  checkForUpdates()

  /**
   * Sets interval for periodical checks
   */
  updateInterval = setInterval(checkForUpdates, INTERVAL.UPDATE)

  /**
   * Updater events
   */
  onUpdateDownloaded()
}

export default {init, checkForUpdates}
