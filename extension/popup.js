const DEFAULTS = {
  wpm: 300,
  fontSize: 56,
  longWordSlowdown: true,
  punctuationPause: true,
  theme: 'dark',
};

const $ = (id) => document.getElementById(id);

function bindRange(id, labelId, suffix) {
  const input = $(id);
  const label = $(labelId);
  const sync = () => { label.textContent = input.value + suffix; };
  input.addEventListener('input', () => {
    sync();
    chrome.storage.sync.set({ [id]: parseInt(input.value, 10) });
  });
  return { input, sync };
}

function bindCheckbox(id) {
  const input = $(id);
  input.addEventListener('change', () => {
    chrome.storage.sync.set({ [id]: input.checked });
  });
  return input;
}

async function init() {
  const settings = await new Promise((r) => chrome.storage.sync.get(DEFAULTS, r));

  const wpm = bindRange('wpm', 'wpmLabel', ' WPM');
  const fontSize = bindRange('fontSize', 'fontSizeLabel', 'px');
  const longWord = bindCheckbox('longWordSlowdown');
  const punct = bindCheckbox('punctuationPause');
  const themeDark = $('themeDark');
  const themeLight = $('themeLight');

  wpm.input.value = settings.wpm; wpm.sync();
  fontSize.input.value = settings.fontSize; fontSize.sync();
  longWord.checked = settings.longWordSlowdown;
  punct.checked = settings.punctuationPause;
  themeDark.checked = settings.theme === 'dark';
  themeLight.checked = settings.theme === 'light';

  for (const el of [themeDark, themeLight]) {
    el.addEventListener('change', () => {
      if (el.checked) chrome.storage.sync.set({ theme: el.value });
    });
  }

  $('start').addEventListener('click', async () => {
    const current = await new Promise((r) => chrome.storage.sync.get(DEFAULTS, r));
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'rsvp:start', settings: current });
      window.close();
    } catch {
      alert('RSVP cannot run on this page (e.g. chrome:// or store pages).');
    }
  });
}

init();
