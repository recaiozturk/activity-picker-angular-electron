const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Veri dosyası yolu: app hazır olduktan sonra belirlenir
// Geliştirme: proje klasörü. Yayın: kullanıcı AppData (kalıcı, yazılabilir)
function getDataFilePath() {
  if (app.isPackaged) {
    return path.join(app.getPath('userData'), 'activities.json');
  }
  return path.join(__dirname, 'activities.json');
}

function createWindow() {
  // Default menüyü kaldır
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

  // Angular build çıktısını yükle
  const indexPath = path.join(__dirname, 'dist', 'activity-picker', 'browser', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    mainWindow.loadFile(indexPath);
  } else {
    console.error('Build dosyası bulunamadı. Lütfen önce "npm run build" komutunu çalıştırın.');
    app.quit();
  }

  // DevTools'u development modda aç
  // mainWindow.webContents.openDevTools();
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

// IPC Handlers - Aktivite işlemleri için

// Aktiviteleri oku
ipcMain.handle('get-activities', async () => {
  try {
    const dataFile = getDataFilePath();
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Aktiviteler okunurken hata:', error);
    return [];
  }
});

// Aktiviteleri kaydet
ipcMain.handle('save-activities', async (event, activities) => {
  try {
    const dataFile = getDataFilePath();
    fs.writeFileSync(dataFile, JSON.stringify(activities, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Aktiviteler kaydedilirken hata:', error);
    return { success: false, error: error.message };
  }
});
