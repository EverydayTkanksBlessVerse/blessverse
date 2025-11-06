const API_URL = "https://script.google.com/macros/s/AKfycbziPgmZTutWnA_L1KUTfNrFdbFJnqTRBxbawMsKrOiaOjYuBa0do6D3gMOjFtjz1r_ZhA/exec";

// 오늘의 말씀 불러오기
async function loadRandomVerse() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!data.ok || !data.verse) {
      document.getElementById("verseText").innerText = "말씀을 불러올 수 없습니다.";
      return;
    }

    const v = data.verse;

    // 화면 반영
    document.getElementById("verseText").innerText = v.Verse || "";
    document.getElementById("verseRef").innerText = v.Reference || "";
  } catch (e) {
    console.log("에러:", e);
    document.getElementById("verseText").innerText = "네트워크 오류가 발생했습니다.";
  }
}

// 버튼 클릭 이벤트
document.getElementById("btn-random").addEventListener("click", loadRandomVerse);

// 첫 화면 자동 실행
loadRandomVerse();
