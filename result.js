let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");
var path = require("path");


function goHome(){
  ipcRenderer.send("go-home", "home");
  console.log("ipc message sent");
}

function loadResultData() {
  console.log("Loading Test data");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["loadResultData"],
  };
  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    console.log(message);
    const output = message.split(";");
    const subject = output[0];
    const nOfQues = parseInt(output[1], 10);
    const totalMarks = parseInt(output[2], 10);
    const finalMarks = parseInt(output[3], 10);
    const arrayLength = output.length;
    let q = 1;
    let n = 0;
    let a = 1;
    let box = 25;
    
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
      console.log(id);
      document.getElementById(id).innerHTML = question;
      q++;
    }

    
    for (let i = offset1 + nOfQues; i < offset2; i++) {
      let answer = output[i];
      console.log(a);
      document.getElementById(a).innerHTML = answer;
      a++;
    }



    for (let r = offset2; r < offset2+nOfQues; r++) {
      let option = String(output[r]);
      console.log(option)
      if(option !== "null"){
      let element  = document.getElementById(option);
      element.checked = true;
      }
    }

    for (let c = offset2+nOfQues; c < offset2+(nOfQues*2); c++) {
      let option =String(output[c]);
      let element  = document.getElementById(option);
      element.checked = true;
      let color = output[c]+"b"
      color.classList.remove("inputGroup");
      color.classList.add("inputGroup-correct")
    }

    for (let b = 25 - nOfQues; b > 0; b--) {
      let qc = "qc-" + box;
      document.getElementById(qc).style.display = "none";
      box = box - 1;
      console.log(qc);
    }
  });
}
  

  





