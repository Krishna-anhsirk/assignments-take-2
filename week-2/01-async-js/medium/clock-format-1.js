const printTime = (hours, minutes, seconds) => {
  let hour = hours.toString();
  let minute = minutes.toString();
  let second = seconds.toString();
  if (hours < 10) hour = "0" + hour;
  if (minutes < 10) minute = "0" + minute;
  if (seconds < 10) second = "0" + second;
  console.log(hour, ":", minute, ":", second);
};

const date = new Date();

let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();

printTime(hours, minutes, seconds);
setInterval(() => {
  if (seconds === 59 && minutes === 59 && hours === 23) {
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else if (seconds === 59 && minutes === 59) {
    hours = hours + 1;
    minutes = 0;
    seconds = 0;
  } else if (seconds === 59) {
    minutes = minutes + 1;
    seconds = 0;
  } else {
    seconds = seconds + 1;
  }
  printTime(hours, minutes, seconds);
}, 1000);

// Chat gpt's code - better
// setInterval(() => {
//     seconds++;
//     if (seconds === 60) {
//       seconds = 0;
//       minutes++;
//       if (minutes === 60) {
//         minutes = 0;
//         hours++;
//         if (hours === 24) {
//           hours = 0;
//         }
//       }
//     }
//     printTime(hours, minutes, seconds);
//   }, 1000);
// };
