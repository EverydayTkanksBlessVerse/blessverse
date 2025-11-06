
// ✅ 네가 방금 "배포 → 웹앱" 에서 복사한 URL 여기에 넣기
const API_URL = "https://script.google.com/macros/s/AKfycbziPgmZTutWnA_L1KUTfNrFdbFJnqTRBxbawMsKrOiaOjYuBa0do6D3gMOjFtjz1r_ZhA/exec";

// HTML 요소 선택 도우미
const $ = (id) => document.getElementById(id);

// 탭 전환
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  $(page).style.display = "block";

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelector(`[data-page="${page}"]`).classList.add("active");
}

// 랜덤 말씀 불러오기
async function loadVerse() {
  try {
    const res = await fetch(API_URL + "?_t=" + Date.now());
    const data = await res.json();

    const v = data.verse;
    $("verseText").textContent = v.Verse;
    $("verseRef").textContent = v.Reference;
  } catch (e) {
    $("verseText").textContent = "불러오기 실패";
    $("verseRef").textContent = "";
  }
}

// 저장
function saveVerse() {
  const item = {
    verse: $("verseText").textContent,
    ref: $("verseRef").textContent
  };

  let list = JSON.parse(localStorage.getItem("savedVerses") || "[]");
  if (!list.some(x => x.verse === item.verse &&
