const {
    app,
    BrowserWindow
} = require("electron");

const isDevelopment = process.env.NODE_ENV === "development";
const path = require('path');
const Store = require('electron-store');
const fs = require("fs");

const store = new Store();

function createWindow() {
    // Create a new win
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            },
    });

    // Event listeners on the win
    win.webContents.on("did-finish-load", () => {
        win.show();
        win.focus();
    });

    // Load our HTML file
    if (isDevelopment) {
        win.loadURL("http://localhost:40992");
        win.webContents.openDevTools();
    } else {        
        win.loadFile(path.resolve(__dirname, "../dist/index.html"))
    }
}


// This method is called when Electron
// has finished initializing
app.whenReady().then(() => {
    createWindow();

    const raw = fs.readFileSync("student.json");
    const student = JSON.parse(raw)
    console.log(student)

    
    app.on("activate", () => {
        // On macOS it's common to re-create a win in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});