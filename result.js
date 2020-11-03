let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");
var path = require("path");

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

    for (let i = 4 + nOfQues; i < arrayLength; i++) {
      let answer = output[i];
      console.log(a);
      document.getElementById(a).innerHTML = answer;
      a++;
    }

    for (let b = 25 - nOfQues; b > 0; b--) {
      let qc = "qc-" + box;
      document.getElementById(qc).style.display = "none";
      box = box - 1;
      console.log(qc);
    }
  });
}



//   var options = {
//     scriptPath: path.join(__dirname, "python/"),
//     args: ["testAnswers;" + answers],
//   };

//   let pyshell = new PythonShell("main.py", options);

//   pyshell.on("message", function (message) {
//     if(message === "true"){
//       ipcRenderer.send("open-result-window", "result");
//       console.log("results coming up")
//     }
//   });

