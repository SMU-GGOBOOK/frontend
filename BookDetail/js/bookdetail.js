// 북마크 버튼 js
function toggleBookmark(button) {
    console.log('버튼 클릭됨!');  // 이 로그가 찍히나요?
    const icon = button.querySelector('i');
    if (!icon) {
    console.warn('아이콘 없음');
    return;
    }

    const isSolid = icon.classList.contains('fa-solid');
    icon.classList.add('fading-out');

    setTimeout(() => {
    icon.classList.remove('fa-solid', 'fa-regular');
    icon.classList.add(isSolid ? 'fa-regular' : 'fa-solid');
    button.classList.toggle('active');
    }, 50);

    setTimeout(() => {
    icon.classList.remove('fading-out');
    }, 100);
}

// 모달팝업 js
const openBtn = document.getElementById("openReviewBtn");
const closeBtn = document.getElementById("closeReviewBtn");
const modal = document.getElementById("reviewModal");

openBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// 바깥 클릭 시 닫기
window.addEventListener("click", (e) => {
    if (e.target === modal) {
    modal.style.display = "none";
    }
});

// 답글달기 토글 JS

// 페이지 내 모든 답글 버튼에 이벤트 연결
$('.btn_reply').click(function() {
// 이 버튼과 같은 댓글 컨테이너 찾기
const $commentItem = $(this).closest('.comment_item');
// 그 안에서 reply_wrap 찾아서 토글
$commentItem.find('.reply_wrap').first().toggle();
});

// 글자수 실시간으로 뜨게 하는 js
const textarea = document.querySelector('.form_textarea');
const countSpan = document.querySelector('.byte_check .count');

textarea.addEventListener('input', () => {
countSpan.textContent = textarea.value.length;
});

