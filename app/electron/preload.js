const { contextBridge } = require('electron')
const os = require("os");
const path = require("path");
const fs = require("fs");
const Store = require('electron-store');
const store = new Store();


contextBridge.exposeInMainWorld("os", {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld("store", {
  log: () => console.log("STORE", store),
  set: (key, object) => store.set(key, object),
  get: (key) => store.get(key),
  clear: () => store.clear(),
  has: (key) => store.has(key),
  delete: (key) => store.delete(key),
  size: () => store.size(),
});

