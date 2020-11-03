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
    const nOfQues = parseInt(output[6], 10);
    const arrayLength = output.length;
    let q = 1;
    let n = 0;
    let a = 1;
    let box = 25;
    console.log(nOfQues);

    document.getElementById("test-subject-name").innerHTML = subject + " Test";
   

    for (let index = 8; index < nOfQues + 8; index++) {
      let question = output[index];
      let id = "q" + q;
      console.log(id);
      document.getElementById(id).innerHTML = question;
      q++;
    }

    for (let i = 8 + nOfQues; i < arrayLength; i++) {
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

function sendTestData() {
  console.log("Sending Test Data");
  let i = 1;

  let answer1 = $("input:radio[name=1]:checked").val();
  let answer2 = $("input:radio[name=2]:checked").val();
  let answer3 = $("input:radio[name=3]:checked").val();
  let answer4 = $("input:radio[name=4]:checked").val();
  let answer5 = $("input:radio[name=5]:checked").val();
  let answer6 = $("input:radio[name=6]:checked").val();
  let answer7 = $("input:radio[name=7]:checked").val();
  let answer8 = $("input:radio[name=8]:checked").val();
  let answer9 = $("input:radio[name=9]:checked").val();
  let answer10 = $("input:radio[name=10]:checked").val();
  let answer11 = $("input:radio[name=11]:checked").val();
  let answer12 = $("input:radio[name=12]:checked").val();
  let answer13 = $("input:radio[name=13]:checked").val();
  let answer14 = $("input:radio[name=14]:checked").val();
  let answer15 = $("input:radio[name=15]:checked").val();
  let answer16 = $("input:radio[name=16]:checked").val();
  let answer17 = $("input:radio[name=17]:checked").val();
  let answer18 = $("input:radio[name=18]:checked").val();
  let answer19 = $("input:radio[name=19]:checked").val();
  let answer20 = $("input:radio[name=20]:checked").val();
  let answer21 = $("input:radio[name=21]:checked").val();
  let answer22 = $("input:radio[name=22]:checked").val();
  let answer23 = $("input:radio[name=23]:checked").val();
  let answer24 = $("input:radio[name=24]:checked").val();
  let answer25 = $("input:radio[name=25]:checked").val();
  
  let answers =
    answer1 +
    ";" +
    answer2 +
    ";" +
    answer3 +
    ";" +
    answer4 +
    ";" +
    answer5 +
    ";" +
    answer6 +
    ";" +
    answer7 +
    ";" +
    answer8 +
    ";" +
    answer9 +
    ";" +
    answer10 +
    ";" +
    answer11 +
    ";" +
    answer12 +
    ";" +
    answer13 +
    ";" +
    answer14 +
    ";" +
    answer15 +
    ";" +
    answer16 +
    ";" +
    answer17 +
    ";" +
    answer18 +
    ";" +
    answer19 +
    ";" +
    answer20 +
    ";" +
    answer21 +
    ";" +
    answer22 +
    ";" +
    answer23 +
    ";" +
    answer24 +
    ";" +
    answer25;
  console.log(answers);

  document.getElementById()

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
}
