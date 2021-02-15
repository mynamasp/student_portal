let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");
require('v8-compile-cache');

var path = require("path");

function login() {
  document.getElementById("loginForm").style.visibility = "hidden";
  document.getElementById("user").style.visibility = "hidden";
  document.getElementById("user2").style.visibility = "hidden";
  document.getElementById("pass").style.visibility = "hidden";
  document.getElementById("pass2").style.visibility = "hidden";  
  document.getElementById("btn").style.display = "none";
  document.getElementById("loader").style.display="block"; 
  

  let userID = document.getElementById("userID").value;
  let pass = document.getElementById("password").value;
  let userIDc = document.getElementById("userID").classList;
  let passc = document.getElementById("password").classList;
  data_out = "logIn;" + userID + ";" + pass;
  console.log(data_out);

  var options = {
    pythonPath: 'python',
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
      window.close();
      console.log("loginedin");
      document.getElementById("loginForm").style.visibility = "visible";
      document.getElementById("loader").style.display = "none";
      document.getElementById("user").style.visibility = "visible";
      document.getElementById("user2").style.visibility = "visible";
      document.getElementById("pass").style.visibility = "visible";
      document.getElementById("pass2").style.visibility = "visible";  
      document.getElementById("btn").style.display = "block";
    }
    else if (message === "false") {
      document.getElementById("password").value = "";
      document.getElementById("error-msg").style.display = "block";
      document.getElementById("loginForm").style.visibility = "visible";
      document.getElementById("loader").style.display = "none";
      document.getElementById("user").style.visibility = "visible";
      document.getElementById("user2").style.visibility = "visible";
      document.getElementById("pass").style.visibility = "visible";
      document.getElementById("pass2").style.visibility = "visible";  
      document.getElementById("btn").style.display = "block";
    } 
    else {
      console.log(message);
      document.getElementById("error-msg").style.display = "none";
      document.getElementById("loginForm").style.visibility = "visible";
      document.getElementById("loader").style.display = "none";
      document.getElementById("user").style.visibility = "visible";
      document.getElementById("user2").style.visibility = "visible";
      document.getElementById("pass").style.visibility = "visible";
      document.getElementById("pass2").style.visibility = "visible";  
      document.getElementById("btn").style.display = "block";
    }
  });
}


function redirect() {
  ipcRenderer.send("open-new-window");
  console.log("ipc message sent");
}
