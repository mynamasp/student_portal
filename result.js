let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");
var path = require("path");

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}

function goHome(){
  document.getElementById("loading").style.display="block";

  ipcRenderer.send("go-home", "home");
  window.close();
  console.log("ipc message sent");
}

function loadResultData() {
  console.log("Loading Test data");
  var options = {
    pythonPath: 'python',
    scriptPath: path.join(__dirname, "/../python/"),
    args: ["loadResultData"],
  };
  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    console.log(message)
    const output = eval(message)
    console.log(output);
    const subject = output[0];
    const nOfQues = parseInt(output[1], 10);
    const totalMarks = parseInt(output[2], 10);
    const finalMarks = parseInt(output[3], 10);
    const arrayLength = output.length;
    let q = 1;
    let n = 0;
    let a = 1;
    let box = 25;
    
    document.body.style.backgroundColor = ""
    if (subject === "Chemistry") {
         document.body.style.backgroundColor = "#EA4335";
    } else if (subject === "Physics") {
         document.body.style.backgroundColor = "#FBBC05";
    } else if (subject === "Maths") {
         document.body.style.backgroundColor = "#4285F4";
    } else if (subject === "Biology") {
         document.body.style.backgroundColor = "#34A853";
    } else if (subject === "IP") {
         document.body.style.backgroundColor = "#4285F4";
    } else if (subject === "English"){
         document.body.style.backgroundColor = "#FBBC05";
    }
    
    buttonColor = document.body.style.backgroundColor;
    document.getElementById('blob1A').style.backgroundColor = buttonColor;
    document.getElementById('blob2A').style.backgroundColor = buttonColor;
    document.getElementById('blob3A').style.backgroundColor = buttonColor;
    document.getElementById('blob4A').style.backgroundColor = buttonColor;
    console.log("bg:"+buttonColor)
    
    
    //this value must be tweaked after backend
    let offset1 = 4;
    let offset2 = (nOfQues*4)+( offset1 + nOfQues);
    
    console.log(nOfQues);
    
    document.getElementById("test-subject-name").innerHTML = subject + " Test";
    document.getElementById("totalMarks").innerHTML = totalMarks;
    document.getElementById("finalMarks").innerHTML = finalMarks;
   
    


    for (let index = 4; index < nOfQues + 4; index++) {
      let question = output[index];
      let id = "q" + q;
      document.getElementById(id).innerHTML = question;
      q++;
    }

    
    for (let i = offset1 + nOfQues; i < offset2; i++) {
      let answer = output[i];
      document.getElementById(a).innerHTML = answer;
      a++;
    }



    for (let r = offset2; r < offset2+nOfQues; r++) {
      let option = String(output[r]);
      console.log(option)
      if(option !== "undefined"){
      let element  = document.getElementById(option);
      element.checked = true;
      }
    }

    for (let c = offset2+nOfQues; c < offset2+(nOfQues*2); c++) {
      let option =String(output[c]);
      console.log(option)
      let element  = document.getElementById(option);
      if(option !== "undefined"){
      element.checked = true;
      let color =document.getElementById(output[c]+"b");
      console.log(output[c]+"b")
      color.classList.remove("inputGroup");
      color.classList.add("inputGroup-correct")
      }
    }

    for (let b = 25 - nOfQues; b > 0; b--) {
      let qc = "qc-" + box;
      document.getElementById(qc).style.display = "none";
      box = box - 1;
      console.log(qc);
    }
    let overlay = document.getElementById("overlay");
    fade(overlay)
  });
}
  

  





