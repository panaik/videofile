const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  // console.log('App is now ready');
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/index.html`); // this URL can be any valid url such as http://google.com
});

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    // console.log('Video duration is:', metadata.format.duration);

    // choose a name for the event, this name can be anything you desire
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});
