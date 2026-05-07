const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 900,
    minHeight: 700,
    backgroundColor: '#0a0a0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'build', 'icon.ico')
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function setupAutoUpdater() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.logger = console;
  autoUpdater.logger.transports.file.level = 'info';

  autoUpdater.on('checking-for-update', () => {
    console.log('[AutoUpdater] Checking for updates...');
    sendStatusToWindow('Checking for updates...');
  });

  autoUpdater.on('update-available', (info) => {
    console.log('[AutoUpdater] Update available:', info.version);
    sendStatusToWindow(`Update available: v${info.version}`);
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Available',
      message: `A new version (${info.version}) is available and will be downloaded automatically.`
    });
  });

  autoUpdater.on('update-not-available', () => {
    console.log('[AutoUpdater] No updates available');
    sendStatusToWindow('Up to date');
  });

  autoUpdater.on('download-progress', (progress) => {
    const percent = progress.percent.toFixed(1);
    console.log('[AutoUpdater] Download progress:', percent + '%');
    sendStatusToWindow(`Downloading: ${percent}%`);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('[AutoUpdater] Update downloaded:', info.version);
    sendStatusToWindow(`Update ready: v${info.version}`);
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Ready',
      message: `Version ${info.version} has been downloaded. Restart the application to install.`,
      buttons: ['Restart Now', 'Later']
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on('error', (error) => {
    console.error('[AutoUpdater] Error:', error.message);
    sendStatusToWindow(`Update error: ${error.message}`);
  });

  console.log('[AutoUpdater] Starting update check...');
  console.log('[AutoUpdater] App version:', app.getVersion());
  console.log('[AutoUpdater] Feed URL provider configured');

  try {
    autoUpdater.checkForUpdatesAndNotify().then(result => {
      console.log('[AutoUpdater] Check result:', result);
    }).catch(err => {
      console.error('[AutoUpdater] Check failed:', err.message);
    });
  } catch (err) {
    console.error('[AutoUpdater] Exception:', err.message);
  }
}

function sendStatusToWindow(text) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('update-status', text);
  }
}

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('check-for-updates', async () => {
  try {
    const result = await autoUpdater.checkForUpdates();
    return { available: result?.updateInfo?.version !== app.getVersion() };
  } catch (err) {
    return { available: false, error: err.message };
  }
});

app.whenReady().then(() => {
  console.log('[App] Ready, creating window...');
  createWindow();
  setupAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});