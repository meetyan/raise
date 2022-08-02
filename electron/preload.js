import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('electron', {
  crawl: () => ipcRenderer.invoke('crawl'),
})
