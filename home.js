let { PythonShell } = require("python-shell");
const { ipcRenderer } = require("electron");

var path = require("path");
require('v8-compile-cache');


let overlay = document.getElementById("overlay");

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

function redirect() {
  ipcRenderer.send("open-test-window");
  console.log("ipc message sent");
}

function signOut() {
  document.getElementById("loading").style.display="block";
  console.log("Signing Out");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["signOut"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      window.close();
      ipcRenderer.send("open-login-window");
      console.log("ipc message sent");
      window.close()
    } else {
      console.log("error");
    }
  });
}

function setdata1() {
  document.getElementById("loading").style.display="block";
  console.log("Loading Test/Assignment data");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["loaddata1"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      ipcRenderer.send("open-test-window");
      console.log("ipc message sent");
      document.getElementById("loading").style.display="none";
      window.close();
    } else {
      console.log(message);
      document.getElementById("loading").style.display="none";
    }
  });
}

function setdata2() {
  document.getElementById("loading").style.display="block";
  console.log("Loading Test/Assignment data");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["loaddata2"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      ipcRenderer.send("open-test-window");
      console.log("ipc message sent");
      document.getElementById("loading").style.display="none";
      window.close();
    } else {
      console.log("error");
      document.getElementById("loading").style.display="none";
    }
  });
}

function setdata3() {
  document.getElementById("loading").style.display="block";

  console.log("Loading Test/Assignment data");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["loaddata3"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      ipcRenderer.send("open-test-window");
      console.log("ipc message sent");
      document.getElementById("loading").style.display="none";
      window.close();
    } else {
      console.log("error");
      document.getElementById("loading").style.display="none";
    }
  });
}

function setdata4() {
  document.getElementById("loading").style.display="block";

  console.log("Loading Test/Assignment data");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["loaddata4"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      ipcRenderer.send("open-test-window");
      console.log("ipc message sent");
      document.getElementById("loading").style.display="none";
      window.close();
    } else {
      console.log("error");
      document.getElementById("loading").style.display="none";
    }
  });
}

function setdata5() {
  document.getElementById("loading").style.display="block";

  console.log("Loading Test/Assignment data");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["loaddata5"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    if (message === "true") {
      ipcRenderer.send("open-test-window");
      console.log("ipc message sent");
      document.getElementById("loading").style.display="none";
      window.close();
    } else {
      console.log("error");
      document.getElementById("loading").style.display="none";
    }
  });
}

function getHomeInfo() {
  console.log("Getting Home Page Info");
  var options = {
    scriptPath: path.join(__dirname, "python/"),
    args: ["getHomeInfo"],
  };

  let pyshell = new PythonShell("main.py", options);

  pyshell.on("message", function (message) {
    const output = message.split(";");
    const studentName = output[0];
    const studentClass = output[1];
    const studentSection = output[2];
    const house = output[3];
    const da1subject = output[4];
    const da1Topic = output[5];
    const da1Type = output[6];
    const da1DaysLeft = output[7];
    const da2subject = output[8];
    const da2Topic = output[9];
    const da2Type = output[10];
    const da2DaysLeft = output[11];
    const da3subject = output[12];
    const da3Topic = output[13];
    const da3Type = output[14];
    const da3DaysLeft = output[15];
    const da4subject = output[16];
    const da4Topic = output[17];
    const da4Type = output[18];
    const da4DaysLeft = output[19];
    const da5subject = output[20];
    const da5Topic = output[21];
    const da5Type = output[22];
    const da5DaysLeft = output[23];
    const ntSubject = output[24];
    const ntTopic = output[25];
    const ntMarks = output[26]+" Marks";
    const ntDate = output[27];
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card3 = document.getElementById("card3");
    const card4 = document.getElementById("card4");
    const card5 = document.getElementById("card5");
    const testCard = document.getElementById("test-card");

    if (da1subject === "Chemistry") {
      card1.classList.add("chemistry-card");
    } else if (da1subject === "Physics") {
      card1.classList.add("physics-card");
    } else if (da1subject === "Maths") {
      card1.classList.add("maths-card");
    } else if (da1subject === "Biology") {
      card1.classList.add("biology-card");
    } else if (da1subject === "IP") {
      card1.classList.add("physics-card");
    } else {
      card1.classList.add("physics-card");
    }

    if (da2subject === "Chemistry") {
      card2.classList.add("chemistry-card");
    } else if (da2subject === "Physics") {
      card2.classList.add("physics-card");
    } else if (da2subject === "Maths") {
      card2.classList.add("maths-card");
    } else if (da2subject === "Biology") {
      card2.classList.add("biology-card");
    } else if (da2subject === "IP") {
      card2.classList.add("physics-card");
    } else {
      card2.classList.add("physics-card");
    }

    if (da3subject === "Chemistry") {
      card3.classList.add("chemistry-card");
    } else if (da3subject === "Physics") {
      card3.classList.add("physics-card");
    } else if (da3subject === "Maths") {
      card3.classList.add("maths-card");
    } else if (da3subject === "Biology") {
      card3.classList.add("biology-card");
    } else if (da3subject === "IP") {
      card3.classList.add("physics-card");
    } else {
      card3.classList.add("physics-card");
    }

    if (da4subject === "Chemistry") {
      card4.classList.add("chemistry-card");
    } else if (da4subject === "Physics") {
      card4.classList.add("physics-card");
    } else if (da4subject === "Maths") {
      card4.classList.add("maths-card");
    } else if (da4subject === "Biology") {
      card4.classList.add("biology-card");
    } else if (da4subject === "IP") {
      card4.classList.add("physics-card");
    } else {
      card4.classList.add("physics-card");
    }

    if (da5subject === "Chemistry") {
      card5.classList.add("chemistry-card");
    } else if (da5subject === "Physics") {
      card5.classList.add("physics-card");
    } else if (da5subject === "Maths") {
      card5.classList.add("maths-card");
    } else if (da5subject === "Biology") {
      card5.classList.add("biology-card");
    } else if (da5subject === "IP") {
      card5.classList.add("physics-card");
    } else {
      card5.classList.add("physics-card");
    }

    if (ntSubject === "Chemistry") {
      testCard.style.backgroundColor = "#EA4335";
    } else if (ntSubject === "Physics") {
      testCard.style.backgroundColor = "#FBBC05";
    } else if (ntSubject === "Maths") {
      testCard.style.backgroundColor = "#4285F4";
    } else if (ntSubject === "Biology") {
      testCard.style.backgroundColor = "#34A853";
    } else if (ntSubject === "IP") {
      testCard.style.backgroundColor = "#4285F4";
    } else {
      testCard.style.backgroundColor = "#EA4335";
    }

    document.getElementById("subject1").innerHTML = da1subject;
    document.getElementById("topic1").innerHTML = da1Topic;
    document.getElementById("type1").innerHTML = da1Type;
    document.getElementById("day1").innerHTML = da1DaysLeft;
    document.getElementById("subject2").innerHTML = da2subject;
    document.getElementById("topic2").innerHTML = da2Topic;
    document.getElementById("type2").innerHTML = da2Type;
    document.getElementById("day2").innerHTML = da2DaysLeft;
    document.getElementById("subject3").innerHTML = da3subject;
    document.getElementById("topic3").innerHTML = da3Topic;
    document.getElementById("type3").innerHTML = da3Type;
    document.getElementById("day3").innerHTML = da3DaysLeft;
    document.getElementById("subject4").innerHTML = da4subject;
    document.getElementById("topic4").innerHTML = da4Topic;
    document.getElementById("type4").innerHTML = da4Type;
    document.getElementById("day4").innerHTML = da4DaysLeft;
    document.getElementById("subject5").innerHTML = da5subject;
    document.getElementById("topic5").innerHTML = da5Topic;
    document.getElementById("type5").innerHTML = da5Type;
    document.getElementById("day5").innerHTML = da5DaysLeft;
    document.getElementById("testSubject").innerHTML = ntSubject;
    document.getElementById("testTopic").innerHTML = ntTopic;
    document.getElementById("testMarks").innerHTML = ntMarks;
    document.getElementById("welcome-msg").innerHTML =
      "Welcome Back " + studentName;
    document.getElementById("class").innerHTML =
      studentClass + " " + studentSection;
    console.log(output);

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let countDown = new Date(ntDate + " 09:00:00").getTime(),
      x = setInterval(function () {
        let now = new Date().getTime(),
          distance = countDown - now;
        console.log(countDown);
        (document.getElementById("days").innerText = Math.floor(
          distance / day
        )),
          (document.getElementById("hours").innerText = Math.floor(
            (distance % day) / hour
          )),
          (document.getElementById("minutes").innerText = Math.floor(
            (distance % hour) / minute
          )),
          (document.getElementById("seconds").innerText = Math.floor(
            (distance % minute) / second
          ));

        //if (distance < 0) {

        //}
      }, second);
    fade(overlay);
  });
}
