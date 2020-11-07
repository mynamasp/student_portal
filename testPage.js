// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;
const electronLocalshortcut = require('electron-localshortcut');
const { app, globalShortcut } = require('electron')


const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        win.setFullScreen(true);
        
    }
    win.on('blur', () => {
        win.close();
    });
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage coll
        ected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

    // Toggle maximise/restore buttons when maximisation/unmaximisation occur
