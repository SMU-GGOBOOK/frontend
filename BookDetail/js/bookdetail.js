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
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openReviewBtn");
  const closeBtn = document.getElementById("closeReviewBtn");
  const modal = document.getElementById("reviewModal");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

// 답글달기 토글 JS

// 페이지 내 모든 답글 버튼에 이벤트 연결
$(document).ready(function() {
  $('.btn_reply').click(function() {
    const $commentItem = $(this).closest('.comment_item');
    $commentItem.find('.reply_wrap').first().toggle();
  });
});

// 글자수 실시간으로 뜨게 하는 js
const textarea = document.querySelector('.form_textarea');
const countSpan = document.querySelector('.byte_check .count');

textarea.addEventListener('input', () => {
countSpan.textContent = textarea.value.length;
});

// 글자수 실시간으로 뜨게 하는 js
const textareamodal = document.querySelector('.modal .form_textarea');
const countSpanmodal = document.querySelector('.modal .byte_check .count');

textareamodal.addEventListener('input', () => {
countSpanmodal.textContent = textareamodal.value.length;
});

// 펼치기 
$(document).ready(function () {
  $('.btn_more_body').on('click', function () {
    const $button = $(this);
    const $commentItem = $button.closest('.comment_item');
    const isActive = $commentItem.hasClass('active');

    if (!isActive) {
      // 펼치기 → 접기 (active 추가)
      $commentItem.addClass('active');
      $button.addClass('active');
      $button.find('.text').text('접기');
      $button.find('i').removeClass('fa-arrow-down').addClass('fa-arrow-up');
    } else {
      // 접기 → 펼치기 (active 제거)
      $commentItem.removeClass('active');
      $button.removeClass('active');
      $button.find('.text').text('펼치기');
      $button.find('i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
    }
  });
});

// 태그 
document.querySelectorAll('.tag_wrap.size_lg .tag').forEach(tag => {
    tag.addEventListener('click', function () {
        const isActive = this.classList.contains('active');
        document.querySelectorAll('.tag_wrap.size_lg .tag').forEach(t => t.classList.remove('active'));
        if (!isActive) {
            this.classList.add('active');
        }
        // 이미 active면 아무것도 안 붙음 (즉, toggle off)
    });
});

// 별
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".rating-stars-review .star");
  const input = document.getElementById("rating-value-review");
  const valSpan = document.querySelector(".caption-review .val"); // 오타 반영
  const textSpan = document.querySelector(".caption-review-badge span > span:first-child");

  let currentValue = parseInt(input.value || "0");

  function updateStars(value) {
    stars.forEach((s, idx) => {
      s.classList.toggle("active", idx < value);
    });

    if (input) input.value = value;
    if (valSpan) valSpan.textContent = value;
    if (textSpan) textSpan.textContent = `5점 중 ${value}점`;

    currentValue = value; // 현재 점수 저장
  }

  stars.forEach((star, idx) => {
    const hoverValue = idx + 1;

    star.addEventListener("mouseenter", function () {
      stars.forEach((s, i) => {
        s.classList.toggle("active", i < hoverValue);
      });

      if (input) input.value = hoverValue;
      if (valSpan) valSpan.textContent = hoverValue;
      if (textSpan) textSpan.textContent = `5점 중 ${hoverValue}점`;
    });

    star.addEventListener("mouseleave", function () {
      updateStars(currentValue); // 마우스 빠질 때 기존 값으로 복원
    });

    star.addEventListener("click", function () {
      const clickedValue = idx + 1;
      const newValue = (clickedValue === currentValue) ? currentValue - 1 : clickedValue;

      stars.forEach((s, i) => {
        const shouldFade = (i < currentValue && i >= newValue) || (i >= currentValue && i < newValue);
        if (shouldFade) s.classList.add("fading-out");
      });

      setTimeout(() => {
        updateStars(newValue);
        stars.forEach(s => s.classList.remove("fading-out"));
      }, 120);
    });
  });

  // 초기 세팅
  updateStars(currentValue);
});










