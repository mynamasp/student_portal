let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");

require('v8-compile-cache');
var path = require("path");

function checkLogin() {
    console.log("checking");
  
    var options = {
      scriptPath: path.join(__dirname, "python/"),
      args: ["isSignedIn"],
    };
  
    let pyshell = new PythonShell("main.py", options);
  
    pyshell.on("message", function (message) {
      if (message === "true") {
        ipcRenderer.send("open-home-window", "home");
        console.log("ipc message sent");
        console.log("Logedin");
        window.close()
      } 
      else if (message === "false"){
        ipcRenderer.send("open-login-window", "home");
        console.log("ipc message sent");
        console.log("Logedin");
        window.close()
      }
      
      else {
        console.log("error");
      }
    });
  }