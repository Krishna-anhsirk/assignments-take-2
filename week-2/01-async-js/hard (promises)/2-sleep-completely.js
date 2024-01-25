/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function hang(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function sleep(milliseconds) {
  await hang(milliseconds);
}

module.exports = sleep;
