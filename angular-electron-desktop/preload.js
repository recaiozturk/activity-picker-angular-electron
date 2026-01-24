const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getActivities: () => ipcRenderer.invoke('get-activities'),
  saveActivities: (activities) => ipcRenderer.invoke('save-activities', activities)
});
