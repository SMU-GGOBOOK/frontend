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

document.addEventListener('DOMContentLoaded', () => {
  /* 글자수 체크 - 댓글 / 모달 통합 */
  document.querySelectorAll('.form_textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
      const count = textarea.closest('.reply_write_area, .modal')?.querySelector('.byte_check .count');
      if (count) count.textContent = textarea.value.length;
    });
  });

  /* 펼치기 */
  document.querySelectorAll('.comment_item').forEach(item => {
    const moreBtn = item.querySelector('.btn_more_body');
    if (!moreBtn) return;

    if (item.classList.contains('overflow')) {
      moreBtn.style.display = 'block';
    } else {
      moreBtn.style.display = 'none';
    }

    moreBtn.addEventListener('click', () => {
      const isActive = item.classList.toggle('active');
      moreBtn.classList.toggle('active', isActive);
      moreBtn.querySelector('.text').textContent = isActive ? '접기' : '펼치기';

      const icon = moreBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-circle-arrow-up', isActive);
        icon.classList.toggle('fa-circle-arrow-down', !isActive);
      }

      const thumb = item.querySelector('.comment_thumb_box');
      const swiper = item.querySelector('.comment_swiper_wrap');
      if (thumb && swiper) {
        thumb.style.display = isActive ? 'none' : 'block';
        swiper.style.display = isActive ? 'block' : 'none';
      }
    });
  });

  /* 별점 */
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
    const newValue = idx + 1;

    stars.forEach((s, i) => {
      const shouldFade = (i < currentValue && i >= newValue) || (i >= currentValue && i < newValue);
      if (shouldFade) s.classList.add("fading-out");
    });

    setTimeout(() => {
      updateStars(newValue);
      stars.forEach(s => s.classList.remove("fading-out"));
    }, 120);
  });
  ;
  });

  // 초기 세팅
  updateStars(currentValue);

  /* 이미지 썸네일 클릭 시 Swiper 보기 */
  document.querySelectorAll('.comment_thumb_box').forEach(box => {
    box.addEventListener('click', () => {
      const item = box.closest('.comment_item');
      if (item) {
        item.classList.add('overflow', 'active');
        const thumb = item.querySelector('.comment_thumb_box');
        const swiper = item.querySelector('.comment_swiper_wrap');
        if (thumb) thumb.style.display = 'none';
        if (swiper) swiper.style.display = 'block';
      }
    });
  });


  /* 댓글 작성 */
  document.querySelectorAll('.reply_write_area').forEach(area => {
    const textarea = area.querySelector('.form_textarea');
    const btn = area.querySelector('.btn_primary');
    const countSpan = area.querySelector('.byte_check .count');

    if (textarea && btn) {
      textarea.addEventListener('input', () => {
        const length = textarea.value.length;
        countSpan.textContent = length;
        btn.classList.toggle('disabled', length === 0);
      });

      btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) return;

        const commentItem = btn.closest('.comment_item');
        const replyList = commentItem?.querySelector('.reply_list');
        const replyCount = commentItem?.querySelector('.btn_reply .count');

        const text = textarea.value.trim();
        if (!text) return;

        const now = new Date();
        const date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

        const newReply = document.createElement('div');
        newReply.className = 'reply_item';
        newReply.innerHTML = `
          <div class="reply_header">
            <div class="user_info_box">
              <span class="info_item">닉네임</span>
              <span class="gap"> | </span>
              <span class="info_item">${date}</span>
              <span class="gap"> | </span>
              <span class="info_item">
                <button class="btn_comment_util report_item" type="button" data-role="report">
                  <span class="text">신고/차단</span>
                </button>
              </span>
            </div>
          </div>
          <div class="reply_contents">
            <div class="reply_text">${text}</div>
          </div>`;

        if (replyList) replyList.prepend(newReply);
        if (replyCount) replyCount.textContent = (parseInt(replyCount.textContent) || 0) + 1;

        textarea.value = '';
        countSpan.textContent = '0';
        btn.classList.add('disabled');
      });
    }
  });

  /* 모달 */
  const modal = document.getElementById("reviewModal");
  document.getElementById("openReviewBtn")?.addEventListener('click', () => modal?.classList.add('active'));
  document.getElementById("closeReviewBtn")?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', e => {
    if (e.target.id === 'reviewModal') modal.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal?.classList.remove('active');
  });

  /* 좋아요 */
  document.querySelectorAll('.btn_like').forEach(likeBtn => {
    likeBtn.addEventListener('click', () => {
      const countEl = likeBtn.querySelector('.text');
      const icon = likeBtn.querySelector('i');
      let count = parseInt(countEl?.textContent || '0');
      const liked = likeBtn.classList.toggle('liked');
      icon?.classList.toggle('fa-solid', liked);
      icon?.classList.toggle('fa-regular', !liked);
      if (countEl) countEl.textContent = liked ? count + 1 : count - 1;
    });
  });
});

// 답글달기 토글 JS
// 페이지 내 모든 답글 버튼에 이벤트 연결
$(document).on('click', '.btn_reply', function () {
  console.log('btn_reply 클릭됨!');
  const $commentItem = $(this).closest('.comment_item');
  $commentItem.find('.reply_wrap').first().toggle();
});

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

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        alert('이미지 파일(JPG, PNG, GIF)만 업로드 가능합니다.');
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

/* 태그 */
document.querySelectorAll('.tag_wrap.size_lg .tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const alreadyActive = tag.classList.contains('active');
    document.querySelectorAll('.tag_wrap.size_lg .tag').forEach(t => t.classList.remove('active'));
    if (!alreadyActive) tag.classList.add('active');
  });
});


