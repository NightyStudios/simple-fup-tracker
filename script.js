const API = "https://your-backend-url/fuckups";
const COUNT = "https://your-backend-url/count";

async function load() {
  const logEl = document.getElementById("log");
  const counterEl = document.getElementById("counter");

  const [logData, countData] = await Promise.all([
    fetch(API).then(r => r.json()),
    fetch(COUNT).then(r => r.json())
  ]);

  counterEl.textContent = countData.count;

  logEl.innerHTML = logData.map(f =>
    `<li><strong>${new Date(f.timestamp).toLocaleString()}:</strong> ${f.description}</li>`
  ).join("");
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  if (!desc) return;
  await fetch(API + "?description=" + encodeURIComponent(desc), { method: "POST" });
  document.getElementById("desc").value = "";
  load();
});

load();
