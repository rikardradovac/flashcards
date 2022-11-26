const { contextBridge } = require('electron')

const fs = require("fs")

contextBridge.exposeInMainWorld('windowAPI', {
  fs: fs
})

// renderer.js

// => { desktop: true }