// const textFromFile = "hello     world    my    name   is       raman";

const fs = require("fs");

fs.readFile("files/a.txt", "utf-8", (err, data) => {
  let prevChar = "";
  let formattedText = "";
  for (let i = 0; i < data.length; i = i + 1) {
    if (data[i] === " " && prevChar === " ") continue;
    else {
      formattedText = formattedText + data[i];
      prevChar = data[i];
    }
  }
  console.log("Previous text from file was ", data);
  console.log("After formatting the text ", formattedText);
  fs.writeFile("files/a.txt", formattedText, (err) => {});
});

// Chatgpt - we can remove spaces using regex
