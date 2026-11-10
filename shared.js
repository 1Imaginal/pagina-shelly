const currentPage = document.body.dataset.page;
const header = document.createElement('header');
header.className = 'site-header';
header.innerHTML = `<a class="brand" href="index.html" aria-label="Shelly Sarfati — Home">shelly sarfati</a><button class="menu-toggle" aria-expanded="false" aria-controls="main-navigation">menu +</button><nav class="site-nav" id="main-navigation" aria-label="Main navigation"><a href="index.html#statement">statement</a><a href="cv.html" ${currentPage === 'cv' ? 'aria-current="page"' : ''}>cv / bio</a><a href="index.html#work">work</a><a href="press.html" ${currentPage === 'press' ? 'aria-current="page"' : ''}>press</a><a href="contact.html" ${currentPage === 'contact' ? 'aria-current="page"' : ''}>contact</a></nav>`;
document.body.prepend(header);
const toggle = header.querySelector('button');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'close −' : 'menu +';
  header.querySelector('nav').classList.toggle('is-open', open);
});
header.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { toggle.click(); toggle.focus(); } });
const footer = document.createElement('footer');
footer.className = 'site-footer';
footer.innerHTML = `<a class="social-link" href="https://www.instagram.com/shellysarfati/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg><span>shellysarfatti</span></a><span class="footer-note">SHELLY SARFATI</span><a class="social-link" href="mailto:shellysarfati@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 5 10 8L22 5"/></svg><span>shellysarfati@gmail.com</span></a>`;
document.body.append(footer);
let language = 'en';
const content = window.SHELLY_CONTENT;
function node(tag, text, className) { const el = document.createElement(tag); if(text) el.textContent = text; if(className) el.className = className; return el; }
function renderContent() {
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  const essays = document.querySelector('#essays');
  if (essays) {
    essays.replaceChildren();
    essays.lang = language;
    content.texts.forEach((text, index) => {
      const article = node('article', '', 'essay');
      const info = node('header'); const translation = text[language];
      info.append(node('span', `0${index + 1} / ${language === 'en' ? 'CURATORIAL TEXT' : 'TEXTO CURATORIAL'}`, 'eyebrow'), node('h3', translation.title), node('p', translation.subtitle, 'subtitle'), node('p', `${text.author} / ${language === 'en' ? 'Curator' : 'Curador'}`, 'author'));
      const body = node('div', '', 'essay-body');
      translation.paragraphs.forEach(p => body.append(node('p', p)));
      article.append(info, body); essays.append(article);
    });
  }
  const bio = document.querySelector('#biography');
  if (bio) { bio.lang = language; bio.replaceChildren(...content.bio[language].map(p => node('p', p))); }
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => { language = button.dataset.language; renderContent(); }));
if (content) renderContent();
if (currentPage === 'cv') {
  content.cv.forEach((category, index) => {
    const section = node('section', '', 'cv-section');
    const heading = node('h2', category.title); heading.lang = 'es';
    const timeline = node('ol', '', 'timeline'); timeline.lang = 'es';
    category.entries.forEach(entry => { const li = node('li'); li.append(node('time', entry.year), node('p', entry.text)); timeline.append(li); });
    section.append(heading, timeline); document.querySelector('#cv-timeline').append(section);
  });
}
const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('button[type=submit]');
  const status = document.querySelector('#form-status');
  button.disabled = true; button.textContent = 'Sending…'; status.className = 'form-status'; status.textContent = '';
  const abort = new AbortController(); const timer = setTimeout(() => abort.abort(), 20000);
  try {
    const response = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{Accept:'application/json'}, signal:abort.signal });
    const result = await response.json();
    if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error(result.message || 'Submission failed');
    status.textContent = 'Sent. Thank you for your message!';
    form.reset();
  } catch (error) {
    status.classList.add('error');
    status.textContent = 'Your message could not be sent. Please try again or email shellysarfati@gmail.com.';
  } finally { clearTimeout(timer); button.disabled = false; button.textContent = 'Send ↗'; }
});
