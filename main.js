// Modules to control application life and create native browser window
require('v8-compile-cache');
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 600,
        height: 415,
        frame: false,
        transparent:true,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
            
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('splash.html');
   
    

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('open-home-window', (event) => {
    let win1 = new BrowserWindow({ width: 1400,
      height: 900,
      frame: false,
      transparent:true,
      backgroundColor: '#FFF',
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    })
 win1.loadFile(`home.html`);

});
  
ipcMain.on('open-test-window', (event) => {
    let win2 = new BrowserWindow({ width: 1450,
      height: 900,
      frame: false,
      transparent:true,
      fullscreen: true,
      backgroundColor: '#FFF',
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    })
win2.loadFile(`test.html`);
    
});

ipcMain.on('open-result-window', (event) => {
    let win3 = new BrowserWindow({ width: 1400,
      height: 900,
      frame: false,
      transparent:true,
      backgroundColor: '#FFF',
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    })
win3.loadFile(`result.html`);
    
});

ipcMain.on('go-home', (event) => {
    let win = new BrowserWindow({ width: 1400,
      height: 900,
      frame: false,
      transparent:true,
      backgroundColor: '#FFF',
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    })
win.loadFile(`home.html`);
    
});

ipcMain.on('open-login-window', (event) => {
    let win = new BrowserWindow({ width: 1400,
      height: 900,
      frame: false,
      transparent:true,
      backgroundColor: '#FFF',
      webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    })
win.loadFile(`index.html`);
    
});