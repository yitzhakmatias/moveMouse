import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  startMouse: (config: { intervalMs: number; moveAmount: number }) =>
    ipcRenderer.invoke('mouse:start', config),
  stopMouse: () => ipcRenderer.invoke('mouse:stop'),
  getStatus: () => ipcRenderer.invoke('mouse:status')
})
