const CSV_URL = "https://docs.google.com/spreadsheets/d/1J7HPoLQDo-zgAU1SyGZqWFzB9TtRbKovMspcQvCOamo/export?format=csv";

function getSaved() {
  return JSON.parse(localStorage.getItem("savedVerses") || "[]");
}

function saveVerse(text) {
  const list = getSaved();
  list.unshift(text);
  localStorage.setItem("savedVerses", JSON.stringify(list));
  alert("✅ 저장되었습니다!");
}

function loadRandom() {
  fetch(CSV_URL)
    .then(r => r.text())
    .then(csv => {
      const lines = csv.split("\n").filter(l => l.trim());
      const random = lines[Math.floor(Math.random() * lines.length)];
      document.getElementById("verseCard").innerText = random;
      if (document.getElementById("shareLink")) shareLink.value = random;
    });
}

function loadSavedList() {
  const container = document.getElementById("savedList");
  const list = getSaved();

  if(list.length === 0) {
    container.innerHTML = `
    <div class="card" style="text-align:center; opacity:0.8;">
      아직 저장된 말씀이 없습니다.<br>마음에 드는 구절을 저장해보세요 😊
    </div>`;
    return;
  }

  container.innerHTML = list
    .map((v,i)=>`
      <div class="card" style="position:relative;">
        ${v}
        <button onclick="deleteSaved(${i})" style="position:absolute; right:12px; top:12px; border:none; background:none; font-size:18px; cursor:pointer;">❌</button>
      </div>
    `).join("");
}

function deleteSaved(index) {
  const list = getSaved();
  list.splice(index,1);
  localStorage.setItem("savedVerses", JSON.stringify(list));
  loadSavedList();
}

document.addEventListener("DOMContentLoaded", () => {
  if(document.getElementById("randomBtn")) randomBtn.onclick = loadRandom;
  if(document.getElementById("saveBtn")) saveBtn.onclick = () => saveVerse(verseCard.innerText);
  if(document.getElementById("savedList")) loadSavedList();
  if(document.getElementById("copyBtn")) copyBtn.onclick = () =>
    navigator.clipboard.writeText(shareLink.value).then(() => alert("📋 복사 완료!"));

  loadRandom();
});

