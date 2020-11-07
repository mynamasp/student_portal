// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const remote = require('electron').remote;

const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */


// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
        document.body.classList.add('maximized');
        win.maximize();

    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}
win.maximize();
document.getElementById("window-title").style.webkitAppRegion = "no-drag";
win.setResizable(false)
document.getElementById("max-button").classList.add('maximized');
console.log("maximised")
function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
        document.getElementById("window-title").style.webkitAppRegion = "no-drag";
        document.body.classList.add('maximized');
        win.setResizable(false)

    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
        document.body.classList.remove('maximized');
        document.getElementById("window-title").style.webkitAppRegion = "drag";
        win.setResizable(true)
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
        console.log("hi");

    });



    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
            console.log("hi");
        } else {
            document.body.classList.remove('maximized');
        }
    }
}
