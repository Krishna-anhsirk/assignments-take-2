const printTime = (hours, minutes, seconds, meridian) => {
  let hour = hours.toString();
  let minute = minutes.toString();
  let second = seconds.toString();
  if (hours < 10) hour = "0" + hour;
  if (minutes < 10) minute = "0" + minute;
  if (seconds < 10) second = "0" + second;
  console.log(hour, ":", minute, ":", second, meridian);
};

const date = new Date();

let hours = date.getHours();
let meridian = "AM";
if (hours > 12) {
  meridian = "PM";
  hours = hours - 12;
}
let minutes = date.getMinutes();
let seconds = date.getSeconds();

setInterval(() => {
  if (seconds === 59 && minutes === 59 && hours === 12) {
    hours = 1;
    minutes = 0;
    seconds = 0;
  } else if (seconds === 59 && minutes === 59 && hours === 11) {
    meridian = meridian === "AM" ? "PM" : "AM";
    hours = 12;
    seconds = 0;
    minutes = 0;
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
  printTime(hours, minutes, seconds, meridian);
}, 1000);

// Chatgpt's code - better
// const printTimeAMPM = (hours, minutes, seconds) => {
//   let ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // Handle midnight (12 AM)

//   let hour = hours.toString().padStart(2, '0');
//   let minute = minutes.toString().padStart(2, '0');
//   let second = seconds.toString().padStart(2, '0');

//   console.log(`${hour}:${minute}:${second} ${ampm}`);
// };

// const updateClockAMPM = () => {
//   const date = new Date();
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let seconds = date.getSeconds();

//   printTimeAMPM(hours, minutes, seconds);

//   setInterval(() => {
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
//     printTimeAMPM(hours, minutes, seconds);
//   }, 1000);
// };

// updateClockAMPM(); // Start the clock
