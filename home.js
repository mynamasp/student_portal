let {PythonShell} = require('python-shell')
const {ipcRenderer} = require('electron');
var path = require("path")


function SetSubjectColor(){
    let card1 = document.getElementById("card1").classList;
    let card2 = document.getElementById("card2").classList;
    let card3 = document.getElementById("card3").classList;
    let card4 = document.getElementById("card4").classList;
    card1.add('chemistry-card')
    console.log("color added")
}

function redirect(){
  ipcRenderer.send('open-test-window');
  console.log("ipc message sent");

};

function getHomeInfo(){
    console.log("Getting Student Info")
    var options = {
        scriptPath : path.join(__dirname, 'python/'),
        args : ["getHomeInfo"]
      }
    
    let pyshell = new PythonShell('main.py', options);

    pyshell.on('message', function(message) {

        const output = message.split(",")
        const studentName = output[0];
        const studentClass = output[1];
        const studentSection = output[2];
        const house = output[3];
        const da1subject = output[4];
        const da1Topic = output[5]
        const da1DaysLeft = output[6]; 
        const da2subject = output[7];
        const da2Topic = output[8]
        const da2DaysLeft = output[9];
        const da3subject = output[10];
        const da3Topic = output[11]
        const da3DaysLeft = output[12];
        const da4subject = output[13];
        const da4Topic = output[14]
        const da4DaysLeft = output[15];
        const da5subject = output[16];
        const da5Topic = output[17]
        const da5DaysLeft = output[18];
        const ntSubject = output[19]
        const ntTopic = output[20]
        const ntDate = output[21]
        console.log(output)
      

        
       
      })
      

}