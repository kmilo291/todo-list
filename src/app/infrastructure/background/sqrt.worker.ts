/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {

  const n: number = data;

  let result = 0;

  for (let i = 1; i <= n; i++) {
    result += Math.sqrt(i);
  }

  postMessage(result);
});
