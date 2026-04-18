const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Data file path: dev = project folder; packaged = userData (persistent, writable)
function getDataFilePath() {
  if (app.isPackaged) {
    return path.join(app.getPath('userData'), 'activities.json');
  }
  return path.join(__dirname, 'activities.json');
}

function createWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const indexPath = path.join(__dirname, 'dist', 'activity-picker', 'browser', 'index.html');

  if (fs.existsSync(indexPath)) {
    mainWindow.loadFile(indexPath);
  } else {
    console.error('Build not found. Run "npm run build" first.');
    app.quit();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('get-activities', async () => {
  try {
    const dataFile = getDataFilePath();
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading activities:', error);
    return [];
  }
});

ipcMain.handle('save-activities', async (event, activities) => {
  try {
    const dataFile = getDataFilePath();
    fs.writeFileSync(dataFile, JSON.stringify(activities, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error saving activities:', error);
    return { success: false, error: error.message };
  }
});
