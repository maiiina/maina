// bubble sort
const N = 18;
const barsEl = document.getElementById("bars");
const statusEl = document.getElementById("bs-status");
let solved = false;

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

async function dance() {
  const bars = barsEl.querySelectorAll(".bs-bar");
  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.add("dancing");
      if (i > 0) bars[i - 1].classList.remove("dancing");
      await sleep(60);
    }
    bars[bars.length - 1].classList.remove("dancing");
    await sleep(100);
  }
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.add("dancing");
    await sleep(40);
  }
  await sleep(300);
  bars.forEach((b) => b.classList.remove("dancing"));
}

function shake() {
  barsEl.classList.add("shake");
  setTimeout(() => barsEl.classList.remove("shake"), 500);
}

function guess() {
  if (solved) return;
  const input = document.getElementById("quiz-input");
  const answer = input.value.trim().toLowerCase();
  const feedback = document.getElementById("quiz-feedback");

  if (answer === "bubble sort" || answer === "bubble") {
    solved = true;
    feedback.textContent = "correct!";
    feedback.className = "quiz-feedback correct";
    input.disabled = true;
    document.querySelector(".quiz-submit").disabled = true;
    // typewriter effect on h1
    const h1 = document.querySelector("#home h1");
    const msg = "oooh wow, you're so smart";
    h1.textContent = "";
    let i = 0;
    const type = setInterval(() => {
      h1.textContent += msg[i];
      i++;
      if (i >= msg.length) clearInterval(type);
    }, 80);
  } else {
    feedback.textContent = "wrong, try again.";
    feedback.className = "quiz-feedback wrong";
    shake();
    setTimeout(() => {
      feedback.textContent = "";
      feedback.className = "quiz-feedback";
    }, 1500);
  }
}

//submit on Enter key
document.getElementById("quiz-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") guess();
});

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
      await sleep(300);

      if (a[j] > a[j + 1]) {
        const s2 = [...states];
        s2[j] = "swapping";
        s2[j + 1] = "swapping";
        render(a, s2);
        statusEl.textContent = "swapping " + a[j] + " and " + a[j + 1];
        await sleep(400);
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        render(a, s2);
        await sleep(150);
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
