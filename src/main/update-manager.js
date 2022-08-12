import {autoUpdater} from 'electron-updater'
import log from 'electron-log'

import {IPC_FUNCTION, STORAGE_KEY} from '@shared'
import {store, INTERVAL} from './config'
import {mb} from './main'

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

const onUpdateDownloaded = () => {
  autoUpdater.on('update-downloaded', () => {
    mb.window.send(IPC_FUNCTION.SHOW_UPDATE_NOTIFICATION)
  })
}

const checkForUpdates = () => {
  log.info('store info', store.store)

  const shouldAutoUpdate = store.get(STORAGE_KEY.ENABLE_AUTO_UPDATE)

  log.info('shouldAutoUpdate', shouldAutoUpdate)

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
  setInterval(checkForUpdates, INTERVAL.UPDATE)

  /**
   * Updater events
   */
  onUpdateDownloaded()
}

export default {init, checkForUpdates}
