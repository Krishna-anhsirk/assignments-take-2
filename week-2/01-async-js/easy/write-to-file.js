const fs = require("fs");

const dataToWrite = "That's nicee";

setTimeout(
  () =>
    fs.readFile("files/a.txt", "utf-8", (err, data) => {
      console.log("Data before writing ", data);
    }),
  1000
);

setTimeout(
  () =>
    fs.writeFile("files/a.txt", dataToWrite, (err, data) => {
      if (err) {
        console.log("Error in writing to file ", err);
      } else {
        console.log("Files written successfully");
      }
    }),
  3000
);

setTimeout(
  () =>
    fs.readFile("files/a.txt", "utf-8", (err, data) => {
      console.log("Data after writing ", data);
    }),
  5000
);

fs.readFile("files/a.txt", "utf-8", (err, data) => {
  console.log("Data before writing ", data);
});

fs.writeFile("files/a.txt", dataToWrite, (err) => {
  if (err) {
    console.log("Error in writing to file ", err);
  } else {
    console.log("Files written successfully");
  }

  fs.readFile("files/a.txt", "utf-8", (err, data) => {
    console.log("Data after writing ", data);
  });
});
