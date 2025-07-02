document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.post').forEach(post => {
    const wrap = post.querySelector('.reply_wrap');
    if (wrap) wrap.classList.remove('active');
    updateCommentCount(post);
  });
});

// 클릭 이벤트 처리 (피드, 댓글, 좋아요 등)
document.addEventListener('click', e => {
  // 피드 수정/삭제 메뉴 (.btn_setting)
  if (e.target.closest('.btn_setting')) {
    const btn = e.target.closest('.btn_setting');
    const post = btn.closest('.post');
    const existing = post.querySelector('.settings-menu');
    if (existing) return existing.remove();
    const menu = document.createElement('div');
    menu.className = 'settings-menu';
    menu.innerHTML = `
      <button class="edit-post-btn">수정</button>
      <button class="delete-post-btn">삭제</button>
    `;
    btn.parentElement.appendChild(menu);
    menu.querySelector('.edit-post-btn').addEventListener('click', () => {
      const content = post.querySelector('.comment_text');
      const newText = prompt('게시글을 수정하세요:', content.textContent);
      if (newText !== null) content.textContent = newText;
      menu.remove();
    });
    menu.querySelector('.delete-post-btn').addEventListener('click', () => {
      if (confirm('게시글을 삭제하시겠습니까?')) post.remove();
    });
    return;
  }

  // 댓글창 토글 및 등록 처리
  if (e.target.closest('.btn_reply')) {
    const post = e.target.closest('.post');
    const wrap = post.querySelector('.reply_wrap');
    if (!wrap) return;
    wrap.classList.toggle('active');
    if (wrap.classList.contains('active')) {
      const ta = wrap.querySelector('#reply_textarea');
      if (ta) ta.focus();
    }
    return;
  }
  if (e.target.closest('.reply_btn')) {
    const btn = e.target.closest('.reply_btn');
    const post = btn.closest('.post');
    const wrap = post.querySelector('.reply_wrap');
    const ta = wrap.querySelector('#reply_textarea');
    const text = ta.value.trim();
    if (!text) return;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0,5);
    const item = document.createElement('div');
    item.className = 'reply_item';
    item.innerHTML = `
      <div class="reply_header">
        <div class="user_info_box">
          <span class="info_item">나</span>
          <span class="gap"> | </span>
          <span class="info_item">${date} ${time}</span>
        </div>
        <button class="btn_reply_setting">⋯</button>
      </div>
      <div class="reply_content">${text}</div>
    `;
    wrap.querySelector('.reply_list').appendChild(item);
    ta.value = '';
    updateCommentCount(post);
    return;
  }

  // 댓글 수정/삭제 메뉴 (.btn_reply_setting)
  if (e.target.closest('.btn_reply_setting')) {
    const btn = e.target.closest('.btn_reply_setting');
    const item = btn.closest('.reply_item');
    const existing = item.querySelector('.reply-settings-menu');
    if (existing) return existing.remove();
    const menu = document.createElement('div');
    menu.className = 'reply-settings-menu';
    menu.innerHTML = `
      <button class="edit-reply-btn">수정</button>
      <button class="delete-reply-btn">삭제</button>
    `;
    btn.parentElement.appendChild(menu);
    menu.querySelector('.edit-reply-btn').addEventListener('click', () => {
      const content = item.querySelector('.reply_content');
      const nt = prompt('댓글을 수정하세요:', content.textContent);
      if (nt !== null) content.textContent = nt;
      menu.remove();
    });
    menu.querySelector('.delete-reply-btn').addEventListener('click', () => {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        const post = item.closest('.post');
        item.remove();
        updateCommentCount(post);
      }
    });
    return;
  }

  // 외부 클릭 시 메뉴 닫기
  if (!e.target.closest('.settings-menu') && !e.target.closest('.btn_setting')) {
    document.querySelectorAll('.settings-menu').forEach(m => m.remove());
  }
  if (!e.target.closest('.reply-settings-menu') && !e.target.closest('.btn_reply_setting')) {
    document.querySelectorAll('.reply-settings-menu').forEach(m => m.remove());
  }

  // 좋아요
  if (e.target.closest('.btn_like')) {
    const btn = e.target.closest('.btn_like');
    const cntSpan = btn.querySelector('.text');
    let cnt = parseInt(cntSpan.textContent, 10) || 0;
    cntSpan.textContent = cnt + 1;
    const icon = btn.querySelector('i');
    if (icon) icon.classList.replace('fa-regular', 'fa-solid');
  }
});

// 댓글 수 배지 업데이트
function updateCommentCount(post) {
  const count = post.querySelectorAll('.reply_item').length;
  const btn = post.querySelector('.btn_reply');
  if (!btn) return;
  let badge = btn.querySelector('.count');
  if (count > 0) {
    if (!badge) { badge = document.createElement('span'); badge.className = 'count'; btn.appendChild(badge); }
    badge.textContent = count;
  } else if (badge) {
    badge.remove();
  }
}
// 메뉴 토글 함수: 버튼·HTML·클래스만 바꾸면 OK
function toggleMenu(btn, menuHTML, menuClass) {
  const existing = btn.querySelector(`.${menuClass}`);
  if (existing) { 
    existing.remove(); 
    return;
  }
  const menu = document.createElement('div');
  menu.className = menuClass;
  menu.innerHTML = menuHTML;   // 여기에 실제 수정·삭제 버튼 HTML 넣기
  btn.append(menu);            // 버튼 자식으로 붙이면 CSS가 바로 먹혀요
}

// 클릭 이벤트 분기
document.addEventListener('click', e => {
  let btn;
  if (btn = e.target.closest('.btn_setting')) {
    toggleMenu(
      btn,
      `<button class="edit-post">수정</button>
       <button class="delete-post">삭제</button>`,
      'settings-menu'
    );
  }
  else if (btn = e.target.closest('.btn_reply_setting')) {
    toggleMenu(
      btn,
      `<button class="edit-reply">수정</button>
       <button class="delete-reply">삭제</button>`,
      'reply-settings-menu'
    );
  }
});