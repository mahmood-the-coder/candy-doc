const { app, BrowserWindow, globalShortcut, session } = require('electron');

let win = null;


const additionalData = { myKey: Date.now() }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
  
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}
function createWindow() {
  if (win) return;
  
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,

    },
  });
  // Remove the menu
  win.removeMenu();
  session.defaultSession.clearCache();

  // Register shortcuts
  globalShortcut.register('CmdOrCtrl+W', () => {
      win.close(); // Close window shortcut
  }); 

  globalShortcut.register('CmdOrCtrl+Shift+I', () => {
      win.webContents.toggleDevTools(); // Toggle DevTools
  });


  win.loadFile("index.html");
  win.on("closed", () => {
    win = null;
  });
  win.webContents.setZoomFactor(1.4);
  win.webContents
    .setVisualZoomLevelLimits(1, 5)
    .then(()=>zoom(win))
    .catch((err) => console.log(err));
    
}

app.whenReady().then(() => {
  createWindow();
  app.on('will-quit', () => {
    globalShortcut.unregisterAll(); // Unregister all shortcuts on exit
});
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


const MAX_ZOOM = 1.4;
const MIN_ZOOM = 0.90;
function zoom(win)
{
  let currentZoom = 1.4;
  win.webContents.on("zoom-changed", (event, zoomDirection) => {
  
   
   
    if (zoomDirection === "in") {
      
        // win.webContents.setZoomFactor(currentZoom + 0.20);
        currentZoom+=0.01

      
    }
    if (zoomDirection === "out") {
      
      currentZoom-=0.01

    }
    if(currentZoom>MAX_ZOOM)currentZoom=MAX_ZOOM
    if(currentZoom<MIN_ZOOM)currentZoom=MIN_ZOOM
    win.webContents.setZoomFactor(currentZoom);
});
}