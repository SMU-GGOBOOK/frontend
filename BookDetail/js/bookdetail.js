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

/* ///////////////////////////////////////////////////////////////////////////////////// */

// 답글달기 토글 JS
// 페이지 내 모든 답글 버튼에 이벤트 연결
$(document).ready(function() {
  $('.btn_reply').click(function() {
    const $commentItem = $(this).closest('.comment_item');
    $commentItem.find('.reply_wrap').first().toggle();
  });
});

/* ///////////////////////////////////////////////////////////////////////////////////// */


// 글자수 실시간으로 뜨게 하는 js
const textarea = document.querySelector('.form_textarea');
const countSpan = document.querySelector('.byte_check .count');

textarea.addEventListener('input', () => {
countSpan.textContent = textarea.value.length;
});

// 펼치기 
$(document).ready(function () {
  $('.comment_item').each(function () {
    const $commentItem = $(this);
    const $moreButton = $commentItem.find('.btn_more_body');

    // 내용이 긴 경우만 버튼 보여줌
    if ($commentItem.hasClass('overflow')) {
      $moreButton.show();
    } else {
      $moreButton.hide();
    }
  });

  $('.btn_more_body').on('click', function () {
    const $button = $(this);
    const $commentItem = $button.closest('.comment_item');
    const isActive = $commentItem.hasClass('active');

    if (!isActive) {
      // 펼치기
      $commentItem.addClass('active');
      $button.addClass('active');
      $button.find('.text').text('접기');
      $button.find('i').removeClass('fa-circle-arrow-down').addClass('fa-circle-arrow-up');

      // 썸네일 숨기고 swiper 보이게
      $commentItem.find('.comment_thumb_box').hide();
      $commentItem.find('.comment_swiper_wrap').show();

    } else {
      // 접기
      $commentItem.removeClass('active');
      $button.removeClass('active');
      $button.find('.text').text('펼치기');
      $button.find('i').removeClass('fa-circle-arrow-up').addClass('fa-circle-arrow-down');

      // swiper 숨기고 썸네일 보이게
      $commentItem.find('.comment_swiper_wrap').hide();
      $commentItem.find('.comment_thumb_box').show();
    }
  });
});

/* ///////////////////////////////////////////////////////////////////////////////////// */

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

/* ///////////////////////////////////////////////////////////////////////////////////// */

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

/* ///////////////////////////////////////////////////////////////////////////////////// */

// 이미지 클릭시 변환
$(document).ready(function () {
  $('.comment_thumb_box').on('click', function () {
    const $commentItem = $(this).closest('.comment_item');
    $commentItem.addClass('overflow active');

    // 썸네일 숨김
    $commentItem.find('.comment_thumb_box').hide();

    // Swiper 래퍼 보이기
    const $swiperWrap = $commentItem.find('.comment_swiper_wrap');
    if ($swiperWrap.length) {
      $swiperWrap.show();
    }
  });
});

// 댓글 쓰기
$(document).ready(function () {
  // 글자 수 체크 및 버튼 활성화
  $('.form_textarea').on('input', function () {
    const $this = $(this);
    const length = $this.val().length;
    const $countSpan = $this.closest('.reply_write_area').find('.byte_check .count');
    const $registerBtn = $this.closest('.reply_write_area').find('.btn_primary');

    $countSpan.text(length);

    if (length > 0) {
      $registerBtn.removeClass('disabled');
    } else {
      $registerBtn.addClass('disabled');
    }
  });

  /* ///////////////////////////////////////////////////////////////////////////////////// */

  // 댓글 등록
  $('.btn_primary').on('click', function () {
    const $btn = $(this);
    if ($btn.hasClass('disabled')) return;

    const $replyWriteArea = $btn.closest('.reply_write_area');
    const $textarea = $replyWriteArea.find('.form_textarea');

    let newCommentText = '';
    if ($textarea && typeof $textarea.val === 'function') {
      newCommentText = ($textarea.val() || '').trim();
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

    const newCommentHTML = `
      <div class="reply_item">
        <div class="reply_header">
          <div class="user_info_box">
            <span class="info_item">닉네임</span>
            <span class="gap"> | </span>
            <span class="info_item">${formattedDate}</span>
            <span class="gap"> | </span>
            <span class="info_item">
              <button class="btn_comment_util report_item" type="button" data-role="report">
                <span class="text">신고/차단</span>
              </button>
            </span>
          </div>
        </div>
        <div class="reply_contents">
          <div class="reply_text">${newCommentText}</div>
        </div>
      </div>
    `;

    const $commentItem = $btn.closest('.comment_item');
    const $commentContainer = $commentItem.find('.reply_list').first();
    const $replyCount = $commentItem.find('.btn_reply .count').first();

    $commentContainer.prepend(newCommentHTML);

    let currentCount = parseInt($replyCount.text(), 10);
    if (isNaN(currentCount)) currentCount = 0;
    $replyCount.text(currentCount + 1);

    $textarea.val('');
    $replyWriteArea.find('.byte_check .count').text('0');
    $btn.addClass('disabled');
    });
  });

/* ///////////////////////////////////////////////////////////////////////////////////// */

// 모달팝업 js
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openReviewBtn");
  const closeBtn = document.getElementById("closeReviewBtn");
  const modal = document.getElementById("reviewModal");
      


  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  } else {
    console.warn("모달 관련 요소가 DOM에 없습니다:", {openBtn, closeBtn, modal});
  }
});


/* ///////////////////////////////////////////////////////////////////////////////////// */

// 글자수 실시간으로 뜨게 하는 js - 모달 팝업 내 
const textareamodal = document.querySelector('.modal .form_textarea');
const countSpanmodal = document.querySelector('.modal .byte_check .count');

textareamodal.addEventListener('input', () => {
countSpanmodal.textContent = textareamodal.value.length;
});

/* ///////////////////////////////////////////////////////////////////////////////////// */


// 모달 팝업 내 사진 추가
document.addEventListener('DOMContentLoaded', function () {
  const fileList = document.querySelector('.file_list');
  const MAX_FILES = 3;

  let attachedFiles = [];

  function generateId() {
    return 'file_' + Math.random().toString(36).slice(2);
  }

  function updateAttachVal() {
    const valElem = document.querySelector('.file_attach_val .total');
    if (valElem) {
      valElem.textContent = ` / ${MAX_FILES}`;
      const currentValElem = valElem.previousElementSibling;
      if (currentValElem && currentValElem.classList.contains('val')) {
        currentValElem.textContent = attachedFiles.length;
      }
    }
  }

  function createBtnBox(attached = false, imgSrc = '') {
    const id = generateId();

    const li = document.createElement('li');
    li.classList.add('list_item');
    li.innerHTML = `
      <span class="file_item ${attached ? 'attached' : ''}">
        <span class="btn_box">
          <input id="${id}" type="file" accept="image/*" />
          <label for="${id}"><span class="hidden">첨부파일 추가</span></label>
          <span class="attach_img_box" style="display:${attached ? 'inline-block' : 'none'};">
            <span class="attach_img_view" style="background-image: url('${imgSrc}');"></span>
            <button class="btn_remove_img" type="button"><span class="hidden">첨부파일 삭제</span></button>
          </span>
        </span>
      </span>
    `;

    const input = li.querySelector('input[type="file"]');
    const removeBtn = li.querySelector('.btn_remove_img');
    const preview = li.querySelector('.attach_img_view');
    const attachBox = li.querySelector('.attach_img_box');
    const fileItem = li.querySelector('.file_item');

    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;

      if (!file.type.match('image.*')) {
        alert('이미지 파일(JPG, PNG, GIF)만 업로드 가능합니다.');
        input.value = '';
        return;
      }

      if (attachedFiles.length >= MAX_FILES) {
        alert(`최대 ${MAX_FILES}개까지 첨부할 수 있습니다.`);
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUrl = e.target.result;
        attachedFiles.push(imgUrl);

        // 1. 현재 btn_box를 attached로 변경
        fileItem.classList.add('attached');
        attachBox.style.display = 'inline-block';
        preview.style.backgroundImage = `url('${imgUrl}')`;

        // 2. 필요한 경우 오른쪽에 새 btn_box 추가
        const listItems = fileList.querySelectorAll('.list_item');
        if (attachedFiles.length < MAX_FILES) {
          const lastItem = listItems[listItems.length - 1];
          if (lastItem && lastItem === li) {
            const newBox = createBtnBox(false, '');
            fileList.appendChild(newBox);
          }
        }

        updateAttachVal();
      };
      reader.readAsDataURL(file);
      input.value = '';
    });

    removeBtn.addEventListener('click', () => {
      const bgImage = preview.style.backgroundImage;
      const url = bgImage.slice(5, -2); // "url('...')" 제거
      const index = attachedFiles.indexOf(url);

      if (index !== -1) {
        attachedFiles.splice(index, 1);
      }

      // 1. 현재 요소는 비워주기
      fileItem.classList.remove('attached');
      preview.style.backgroundImage = '';
      attachBox.style.display = 'none';
      li.querySelector('input').value = '';

      // 2. 오른쪽 요소가 빈 btn_box일 경우 삭제
      const nextLi = li.nextElementSibling;
      if (nextLi && !nextLi.querySelector('.file_item')?.classList.contains('attached')) {
        fileList.removeChild(nextLi);
      }

      updateAttachVal();
    });


    return li;
  }

  // 초기 1개 빈 박스 생성
  fileList.innerHTML = '';
  fileList.appendChild(createBtnBox(false, ''));
  updateAttachVal();
});

/* ///////////////////////////////////////////////////////////////////////////////////// */

// 좋아요 버튼 누르면 좋아요 수 증가
// 모든 좋아요 버튼에 대해 이벤트 등록
document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.btn_like');

  likeButtons.forEach((likeBtn) => {
    const likeCount = likeBtn.querySelector('.text');
    const likeIcon = likeBtn.querySelector('i');

    likeBtn.addEventListener('click', () => {
      let count = parseInt(likeCount.textContent);
      const isLiked = likeBtn.classList.contains('liked');

      if (isLiked) {
        likeBtn.classList.remove('liked');
        likeIcon.classList.remove('fa-solid');
        likeIcon.classList.add('fa-regular');
        likeCount.textContent = count - 1;
      } else {
        likeBtn.classList.add('liked');
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
        likeCount.textContent = count + 1;
      }
    });
  });
});

