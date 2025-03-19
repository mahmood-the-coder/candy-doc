const { app, BrowserWindow, globalShortcut, session, screen } = require('electron');

app.commandLine.appendSwitch('high-dpi-support', '1');
app.commandLine.appendSwitch('force-device-scale-factor', '1');

let win = null;

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    });
}

function createWindow() {
    if (win) return;

    const primaryDisplay = screen.getPrimaryDisplay();
    const scaleFactor = primaryDisplay.scaleFactor; // Get scale factor

    win = new BrowserWindow({
        width: Math.round(800 * scaleFactor), // Adjust for ignored scaling
        height: Math.round(600 * scaleFactor),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            zoomFactor: 1.0, // Prevents zooming
        },
    });

    win.removeMenu();
    session.defaultSession.clearCache();

    // Prevent zooming inside the app
    win.webContents.setZoomFactor(1);
    win.webContents.setVisualZoomLevelLimits(1, 5); // Lock zoom at 100%

    win.loadFile("index.html");

    win.on("closed", () => {
        win = null;
    });
}

app.whenReady().then(() => {
    createWindow();
    globalShortcut.register('CmdOrCtrl+=', () => adjustZoom(win, "in"));  // Zoom In
    globalShortcut.register('CmdOrCtrl+-', () => adjustZoom(win, "out")); // Zoom Out
    globalShortcut.register('CmdOrCtrl+0', () => { 
        currentZoom = 1.0;
        win.webContents.setZoomFactor(1); 
        console.log("Zoom Reset to 100%");
    });

    app.on('will-quit', () => {
        globalShortcut.unregisterAll();
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
const MIN_ZOOM = 0.9;
let currentZoom = 1.0; // Default zoom level

function adjustZoom(win, zoomDirection) {
    if (!win) return;

    if (zoomDirection === "in" && currentZoom < MAX_ZOOM) {
        currentZoom += 0.1;
    } else if (zoomDirection === "out" && currentZoom > MIN_ZOOM) {
        currentZoom -= 0.1;
    }

    win.webContents.setZoomFactor(currentZoom);
    console.log(`Zoom Level: ${currentZoom.toFixed(2)}`);
}