import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // Database operations
  getAllActas: () => ipcRenderer.invoke('db:getAllActas'),
  getActaById: (id: number) => ipcRenderer.invoke('db:getActaById', id),
  createActa: (data: any) => ipcRenderer.invoke('db:createActa', data),
  updateActa: (id: number, data: any) => ipcRenderer.invoke('db:updateActa', id, data),
  deleteActa: (id: number) => ipcRenderer.invoke('db:deleteActa', id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
