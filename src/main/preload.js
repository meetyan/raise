import {contextBridge, ipcRenderer, shell} from 'electron'

import {IPC_FUNCTION} from './config'

contextBridge.exposeInMainWorld('electron', {
  open: url => shell.openExternal(url),
  showAboutModal: callback => ipcRenderer.on(IPC_FUNCTION.SHOW_ABOUT_MODAL, callback),
  showSettingsModal: callback => ipcRenderer.on(IPC_FUNCTION.SHOW_SETTINGS_MODAL, callback),
  showDockIcon: visible => ipcRenderer.send(IPC_FUNCTION.SHOW_DOCK_ICON, visible),
})
