import { app, BrowserWindow ,globalShortcut  } from "electron";
let win = null;


const additionalData = { myKey: Date.now() }
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    // Print out data received from the second instance.

    // Someone tried to run a second instance, we should focus our window.
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


