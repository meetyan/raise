import {contextBridge, shell} from 'electron'

contextBridge.exposeInMainWorld('electron', {
  open: url => shell.openExternal(url),
})
