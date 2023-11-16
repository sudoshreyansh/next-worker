import { getLoggerInstance } from "../logger";
const Logger = getLoggerInstance('sum.worker', true);

function sum(arr) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arr.reduce((acc, curr) => acc + curr, 0));
    }, 2000);
  });
}

onmessage = async (e) => {
  Logger.log("Received request");

  const arr = e.data;
  const ans = await sum(arr);

  Logger.log("Sum calculated");

  postMessage(ans);
}
