let {PythonShell} = require('python-shell')
const {ipcRenderer} = require('electron');

var path = require("path")



function checkLogin(){
    
    var options = {
        scriptPath : path.join(__dirname, 'python/'),
        args : ["ifSignedIn"]
      }
    
    let pyshell = new PythonShell('main.py', options);

    pyshell.on('message', function(message) {

        if(message === "true"){
            ipcRenderer.send('open-home-window', 'home');
            console.log("ipc message sent");
        }
        else{
            login();
        }
       
      })
      

}

function login(){
    let userID = document.getElementById("userID").value;
    let pass = document.getElementById("password").value;
    data_out = "logIn," + userID + "," + pass;
    console.log(data_out);

    var options = {
        scriptPath : path.join(__dirname, 'python/'),
        args : [data_out]
      }
    
    let pyshell = new PythonShell('main.py', options);

    pyshell.on('message', function(message) {

        if(message === "true"){
            ipcRenderer.send('open-home-window', 'home');
            console.log("ipc message sent");
        }
        else{

        }
       
      })
}

function redirect(){
    ipcRenderer.send('open-new-window');
    console.log("ipc message sent");

};