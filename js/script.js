// ==========================================
// TUTOLOOP サイト共通スクリプト
// ==========================================

// お問い合わせ先（Googleフォーム）。URLが決まったらここを差し替えるだけで
// サイト内すべてのCTA・リンクに反映される。
const CONTACT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc58Rbo_uVbrnzGU_sP8thpD8uI3N8ukebs_wGZC-VHLcp_bg/viewform';

document.querySelectorAll('a[data-contact]').forEach((a) => {
  a.href = CONTACT_URL;
  a.target = '_blank';
  a.rel = 'noopener';
});

// ---- ハンバーガーメニュー ----
const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const menuOverlay = document.getElementById('globalMenu');

function openMenu() {
  menuOverlay.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  menuOverlay.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) closeMenu();
});
menuOverlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menuOverlay.hidden) closeMenu();
});

// ---- スクロールで控えめにフェードイン ----
// body.js-anim が付いたときだけCSSで初期非表示になる（JS無効環境でも本文が読める）
if ('IntersectionObserver' in window) {
  document.body.classList.add('js-anim');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
}
