let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");

var path = require("path");

function login() {
  let userID = document.getElementById("userID").value;
  let pass = document.getElementById("password").value;
  let userIDc = document.getElementById("userID").classList;
  let passc = document.getElementById("password").classList;
  data_out = "logIn;" + userID + ";" + pass;
  console.log(data_out);

  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: [data_out],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      ipcRenderer.send("open-home-window", "home");
      console.log("ipc message sent");
      document.getElementById("userID").value = "";
      document.getElementById("password").value = "";
      console.log("loginedin");
    }
    else if (message === "false") {
      document.getElementById("password").value = "";
      document.getElementById("error-msg").style.display = "block";
    } 
    else {
      console.log(message);

    }
  });
}
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
    } else {
      console.log("error");
    }
  });
}

function redirect() {
  ipcRenderer.send("open-new-window");
  console.log("ipc message sent");
}
