const fs = require("fs");

fs.readFile("files/a.txt", "utf-8", (err, data) => {
  console.log(data);
});

for (let i = 0; i < 10000000000; i++) {
  //   const y = 100;
}

console.log("Below async function");
