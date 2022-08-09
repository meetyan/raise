import {dialog} from 'electron'
import {autoUpdater} from 'electron-updater'
import isDev from 'electron-is-dev'

import {INTERVAL} from '@shared'
import pkg from '@pkg'

let updateInterval = null

const onUpdateDownloaded = () => {
  autoUpdater.on('update-downloaded', (_, releaseNotes, releaseName) => {
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
        if (res.response === 0) {
          autoUpdater.quitAndInstall()
          clearInterval(updateInterval)
        }
      })
  })
}

/**
 * If not wrapped, an TypeError will be thrown as follow:
 * TypeError: Cannot read properties of undefined (reading 'isUpdaterActive')
 */
const checkForUpdates = () => {
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
