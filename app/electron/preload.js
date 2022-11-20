const { contextBridge } = require('electron')

const fs = require("fs")

contextBridge.exposeInMainWorld('windowAPI', {
  fs: fs
})

// renderer.js
console.log(window.windowAPI)
// => { desktop: true }