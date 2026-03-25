// bubble sort
const N = 18;
const barsEl = document.getElementById("bars");
const statusEl = document.getElementById("bs-status");

function randArr() {
  return Array.from({ length: N }, () => Math.floor(Math.random() * 70) + 12);
}

function render(arr, states) {
  barsEl.innerHTML = "";
  arr.forEach((v, i) => {
    const d = document.createElement("div");
    d.className = "bs-bar " + (states[i] || "");
    d.style.height = v + "px";
    barsEl.appendChild(d);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function bubbleSort(arr) {
  const a = [...arr];
  const n = a.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const states = Array(n).fill("");
      sortedIndices.forEach((idx) => (states[idx] = "sorted"));
      states[j] = "comparing";
      states[j + 1] = "comparing";
      render(a, states);
      statusEl.textContent = "comparing " + a[j] + " and " + a[j + 1];
      await sleep(500);

      if (a[j] > a[j + 1]) {
        const s2 = [...states];
        s2[j] = "swapping";
        s2[j + 1] = "swapping";
        render(a, s2);
        statusEl.textContent = "swapping " + a[j] + " and " + a[j + 1];
        await sleep(600);
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        render(a, s2);
        await sleep(400);
      }
    }
    sortedIndices.add(n - 1 - i);
  }
  sortedIndices.add(0);
  render(a, Array(n).fill("sorted"));
  statusEl.textContent = "sorted — restarting...";
  await sleep(1600);
}

async function loop() {
  while (true) {
    const arr = randArr();
    render(arr, Array(N).fill(""));
    statusEl.textContent = "starting...";
    await sleep(500);
    await bubbleSort(arr);
  }
}

loop();
