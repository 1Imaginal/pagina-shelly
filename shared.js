const currentPage = document.body.dataset.page;
// Menú compartido: el mismo que index.html y work.html. Estilos en css/nav.css
const actual = page => currentPage === page ? ' aria-current="page"' : '';
const header = document.createElement('header');
header.className = 'site-header';
header.innerHTML = `<a class="site-name" href="index.html">Shelly Sarfati</a><nav class="site-nav" aria-label="Principal"><a href="index.html#statement">Statement</a><a href="cv.html"${actual('cv')}>CV/Bio</a><a href="work.html"${actual('work')}>Work</a><a href="press.html"${actual('press')}>Press</a><a href="contact.html"${actual('contact')}>Contact</a></nav>`;
document.body.prepend(header);
const footer = document.createElement('footer');
footer.className = 'site-footer';
footer.innerHTML = `<a class="social-link" href="https://www.instagram.com/shellysarfati/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg><span>shellysarfatti</span></a><span class="footer-note">SHELLY SARFATI</span><a class="social-link" href="mailto:shellysarfati@gmail.com"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="1"/><path d="m2 5 10 8L22 5"/></svg><span>shellysarfati@gmail.com</span></a>`;
document.body.append(footer);
let language = 'en';
const content = window.SHELLY_CONTENT;
function node(tag, text, className) { const el = document.createElement(tag); if(text) el.textContent = text; if(className) el.className = className; return el; }
function renderContent() {
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  const description = document.querySelector('.texts-description');
  if (description) {
    description.textContent = language === 'es'
      ? 'Una selección de textos curatoriales que ofrecen distintas miradas sobre la obra de Shelly Sarfati, sus procesos y su universo visual.'
      : 'A selection of curatorial texts offering different perspectives on Shelly Sarfati’s work, her creative processes, and her visual universe.';
    description.lang = language;
  }
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

// Segmented selector, matching the view switch in WORK.
if (currentPage === 'press') {
  const buttons = document.querySelectorAll('[data-press-view]');
  function selectPressView(view) {
    const selected = view === 'texts' ? 'texts' : 'publications';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pressView === selected)));
    document.querySelector('#publications').hidden = selected !== 'publications';
    document.querySelector('#texts').hidden = selected !== 'texts';
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    selectPressView(button.dataset.pressView);
    history.replaceState(null, '', '#' + button.dataset.pressView);
  }));
  window.addEventListener('hashchange', () => selectPressView(location.hash.slice(1)));
  selectPressView(location.hash.slice(1));
}
