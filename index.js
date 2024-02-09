const {app, BrowserWindow, ipcMain} = require('electron');
const debug = require('electron-debug');

let mainWindow;

debug();

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
			enableRemoteModule: true,
			nodeIntegration: true,
			preload:'./preload.js',
			contextIsolation: false
        },
        resizable: false
    })

    mainWindow.loadURL('http://localhost:4200');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    return mainWindow;
}

app.on('ready', () => {
    mainWindow = createWindow();

    ipcMain.on('resize-window', (event, width, height, isAnimated) => {
        if (mainWindow) {
            mainWindow.setSize(width, height, isAnimated);
        }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})