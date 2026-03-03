/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {

  const n: number = data;

  let result = 0;

  for (let i = 1; i <= n; i++) {
    result += Math.sqrt(i);

    if (i % 1_000_000 === 0) {
      postMessage({ progress: i / n });
    }
  }

  postMessage({ done: true, result });
});
