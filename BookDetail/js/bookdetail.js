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





// 모달 팝업 내 사진 추가
document.addEventListener('DOMContentLoaded', function () {
  const fileList = document.querySelector('.file_list');
  const MAX_FILES = 5;

  // 첫 번째 고정 항목 가져오기
  const firstLi = fileList.querySelector('li.list_item');
  const firstInput = firstLi.querySelector('input[type="file"]');
  const firstFileItem = firstLi.querySelector('.file_item');
  const firstAttachBox = firstLi.querySelector('.attach_img_box');
  const firstPreview = firstLi.querySelector('.attach_img_view');
  const firstLabel = firstLi.querySelector('label');
  const firstRemoveBtn = firstLi.querySelector('.btn_remove_img');

  // 5번째 사진이 첫 번째에 미리보기 될 때만 삭제 버튼 보여야 하므로 초기 숨김
  firstRemoveBtn.style.display = 'none';

  // 첨부된 이미지 url들을 저장하는 배열 (base64 또는 objectURL)
  let attachedFiles = [];

  // 고유 ID 생성
  function generateId() {
    return 'file_' + Math.random().toString(36).slice(2);
  }

  // 새로운 list_item 생성 함수 (사진 첨부용)
  function createFileItem() {
    if (fileList.children.length >= MAX_FILES) return;

    const id = generateId();

    const li = document.createElement('li');
    li.classList.add('list_item');
    li.innerHTML = `
      <span class="file_item">
        <span class="btn_box">
          <input id="${id}" type="file" accept="image/*" />
          <label for="${id}"><span class="hidden">첨부파일 추가</span></label>
          <span class="attach_img_box" style="display:none;">
            <span class="attach_img_view"></span>
            <button class="btn_remove_img" type="button"><span class="hidden">첨부파일 삭제</span></button>
          </span>
        </span>
      </span>
    `;

    fileList.appendChild(li);

    const input = li.querySelector('input[type="file"]');
    const label = li.querySelector('label');
    const attachBox = li.querySelector('.attach_img_box');
    const preview = li.querySelector('.attach_img_view');
    const fileItem = li.querySelector('.file_item');
    const removeBtn = li.querySelector('.btn_remove_img');

    // 사진 선택 시 처리
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      if (!file.type.match('image.*')) {
        alert('이미지 파일(JPG, PNG, GIF)만 업로드 가능합니다.');
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        // 새 사진 추가는 맨 앞으로 추가
        attachedFiles.unshift(e.target.result);

        // 사진 최대 개수 넘으면 마지막 제거
        if (attachedFiles.length > MAX_FILES) {
          attachedFiles.pop();
        }

        // 렌더링 갱신
        renderAttachedItems();
      };
      reader.readAsDataURL(file);
    });

    // 삭제 버튼 클릭 시 처리
    removeBtn.addEventListener('click', () => {
      // 삭제 시 해당 사진 index 찾기
      const idx = Array.from(fileList.children).indexOf(li) - 1; // 첫번째 제외
      if (idx >= 0 && idx < attachedFiles.length) {
        attachedFiles.splice(idx, 1);
        renderAttachedItems();
      }
    });
  }

  // 첫 번째 고정 항목 삭제 버튼 클릭 처리 (5번째 사진 삭제)
  firstRemoveBtn.addEventListener('click', () => {
    if (attachedFiles.length === MAX_FILES) {
      attachedFiles.pop(); // 5번째 사진 삭제
      renderAttachedItems();
    }
  });

  // attachedFiles 배열을 바탕으로 화면 렌더링
  function renderAttachedItems() {
    // 1. 첫 번째 항목 처리 (5번째 사진 미리보기 표시)
    if (attachedFiles.length === MAX_FILES) {
      firstPreview.style.backgroundImage = `url('${attachedFiles[MAX_FILES - 1]}')`;
      firstAttachBox.style.display = 'inline-block';
      firstFileItem.classList.add('attached');
      firstRemoveBtn.style.display = 'inline-block'; // 삭제 버튼 보임
      firstLabel.style.backgroundImage = 'none'; // label 배경 숨김
    } else {
      // 사진 없으면 초기화
      firstPreview.style.backgroundImage = '';
      firstAttachBox.style.display = 'none';
      firstFileItem.classList.remove('attached');
      firstRemoveBtn.style.display = 'none';
      firstLabel.style.backgroundImage = ''; // label 배경 복구
    }

    // 2. 기존 추가된 list_item 정리 (첫번째 제외)
    const existingItems = Array.from(fileList.children).slice(1);

    // 필요하면 더 많이 만들고, 넘치면 제거
    while (existingItems.length < attachedFiles.length - (attachedFiles.length === MAX_FILES ? 1 : 0)) {
      createFileItem();
      existingItems.push(fileList.lastElementChild);
    }
    while (existingItems.length > attachedFiles.length - (attachedFiles.length === MAX_FILES ? 1 : 0)) {
      const toRemove = existingItems.pop();
      toRemove.remove();
    }

    // 3. 각 item에 사진 넣고 상태 업데이트
    attachedFiles.forEach((url, idx) => {
      // 5번째 사진은 첫 번째 항목에 표시했으니 제외
      if (attachedFiles.length === MAX_FILES && idx === MAX_FILES - 1) return;

      const li = fileList.children[idx + 1];
      const fileItem = li.querySelector('.file_item');
      const attachBox = li.querySelector('.attach_img_box');
      const preview = li.querySelector('.attach_img_view');
      const label = li.querySelector('label');
      const removeBtn = li.querySelector('.btn_remove_img');

      preview.style.backgroundImage = `url('${url}')`;
      attachBox.style.display = 'inline-block';
      fileItem.classList.add('attached');
      removeBtn.style.display = 'inline-block';
      label.style.backgroundImage = 'none';

      // input 초기화 (파일 다시 업로드 가능하게)
      li.querySelector('input[type="file"]').value = '';
    });

    // 4. 첨부 안된 항목 초기화
    for (let i = attachedFiles.length - (attachedFiles.length === MAX_FILES ? 1 : 0); i < fileList.children.length - 1; i++) {
      const li = fileList.children[i + 1];
      if (!li) continue;
      const fileItem = li.querySelector('.file_item');
      const attachBox = li.querySelector('.attach_img_box');
      const preview = li.querySelector('.attach_img_view');
      const label = li.querySelector('label');
      const removeBtn = li.querySelector('.btn_remove_img');

      preview.style.backgroundImage = '';
      attachBox.style.display = 'none';
      fileItem.classList.remove('attached');
      removeBtn.style.display = 'none';
      label.style.backgroundImage = '';
      li.querySelector('input[type="file"]').value = '';
    }
  }

  // 초기 상태: 첫번째 항목에 input만 있고 첨부된 사진 없음
  // 첨부된 사진 없으면 첫 번째 항목만 존재
  while (fileList.children.length > 1) {
    fileList.removeChild(fileList.lastChild);
  }

  // 첫 번째 항목 input 이벤트
  firstInput.addEventListener('change', () => {
    const file = firstInput.files[0];
    if (!file) return;
    if (!file.type.match('image.*')) {
      alert('이미지 파일(JPG, PNG, GIF)만 업로드 가능합니다.');
      firstInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      attachedFiles.unshift(e.target.result);
      if (attachedFiles.length > MAX_FILES) attachedFiles.pop();
      renderAttachedItems();

      // 초기 input 초기화해서 다시 업로드 가능하게
      firstInput.value = '';
    };
    reader.readAsDataURL(file);
  });

  // 초기 하나만 존재하도록 세팅
  renderAttachedItems();
});
