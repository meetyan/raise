import {contextBridge, ipcRenderer, shell} from 'electron'

import {IPC_FUNCTION} from '@shared'
import {store} from './config'

contextBridge.exposeInMainWorld('electron', {
  storage: {
    set: (key, val) => store.set(key, val),
    get: key => store.get(key),
    clear: () => store.clear(),
    store: () => store.store,
  },

  open: url => shell.openExternal(url),

  /**
   * Wraps commonly used ipcRenderer methods with the followings.
   * See: https://github.com/reZach/secure-electron-template/issues/43#issuecomment-772303787
   */
  send: (channel, data) => {
    if (Object.values(IPC_FUNCTION).includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    if (Object.values(IPC_FUNCTION).includes(channel)) {
      const subscription = (_, ...args) => func(...args)
      ipcRenderer.on(channel, subscription)
      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    }
  },
  receiveOnce: (channel, func) => {
    if (Object.values(IPC_FUNCTION).includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args))
    }
  },
  removeAllListeners: channel => {
    if (Object.values(IPC_FUNCTION).includes(channel)) {
      ipcRenderer.removeAllListeners(channel)
    }
  },
})
