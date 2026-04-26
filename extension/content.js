(function () {
  if (window.__rsvpReaderLoaded) return;
  window.__rsvpReaderLoaded = true;

  const DEFAULTS = {
    wpm: 300,
    fontSize: 56,
    longWordSlowdown: true,
    punctuationPause: true,
    theme: 'dark',
  };

  const PUNCT_PAUSE_FACTOR = {
    '.': 2.2, '!': 2.2, '?': 2.2,
    ';': 1.8, ':': 1.8,
    ',': 1.4, '—': 1.4, '–': 1.4,
  };

  // Spritz-style Optimal Recognition Point: focal letter index by word length.
  function pivotIndex(len) {
    if (len <= 1) return 0;
    if (len <= 5) return 1;
    if (len <= 9) return 2;
    if (len <= 13) return 3;
    return 4;
  }

  function tokenize(text) {
    const raw = text.replace(/\s+/g, ' ').trim();
    if (!raw) return [];
    const words = raw.split(' ');
    // Split very long words so the pivot doesn't drift off the rail.
    const out = [];
    for (const w of words) {
      if (w.length <= 13) {
        out.push(w);
      } else {
        // Break at hyphen if present, otherwise hard split with a trailing dash.
        const parts = w.includes('-') ? w.split(/(?<=-)/) : [w.slice(0, 12) + '-', w.slice(12)];
        for (const p of parts) out.push(p);
      }
    }
    return out;
  }

  function wordDelay(word, baseMs, settings) {
    let factor = 1;
    if (settings.longWordSlowdown) {
      if (word.length > 12) factor *= 1.6;
      else if (word.length > 8) factor *= 1.3;
    }
    if (settings.punctuationPause) {
      const last = word[word.length - 1];
      if (PUNCT_PAUSE_FACTOR[last]) factor *= PUNCT_PAUSE_FACTOR[last];
    }
    return Math.round(baseMs * factor);
  }

  function getSelectionText() {
    const sel = window.getSelection?.().toString().trim();
    return sel || '';
  }

  function getArticleText() {
    const candidates = [
      document.querySelector('article'),
      document.querySelector('main'),
      document.querySelector('[role="main"]'),
      document.body,
    ].filter(Boolean);
    for (const node of candidates) {
      const text = (node.innerText || '').trim();
      if (text.length > 200) return text;
    }
    return (document.body?.innerText || '').trim();
  }

  async function loadSettings() {
    return new Promise((resolve) => {
      chrome.storage?.sync.get(DEFAULTS, (s) => resolve({ ...DEFAULTS, ...s }));
    });
  }

  async function saveSettings(patch) {
    return new Promise((resolve) => {
      chrome.storage?.sync.set(patch, resolve);
    });
  }

  // ----- Reader UI -----

  let reader = null;

  function openReader(text, settings) {
    if (reader) reader.close();
    reader = createReader(text, settings);
  }

  function createReader(text, settings) {
    const words = tokenize(text);
    if (!words.length) {
      alert('RSVP: no text to read. Select some text first.');
      return null;
    }

    const host = document.createElement('div');
    host.id = '__rsvp_reader_host__';
    host.style.all = 'initial';
    document.documentElement.appendChild(host);
    const root = host.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = READER_CSS;
    root.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = `overlay theme-${settings.theme}`;
    overlay.innerHTML = `
      <div class="frame" role="dialog" aria-label="Speed reader">
        <button class="close" aria-label="Close (Esc)">×</button>
        <div class="rail">
          <div class="rail-line" aria-hidden="true"></div>
          <div class="word" id="word">
            <span class="prefix"></span><span class="pivot"></span><span class="suffix"></span>
          </div>
        </div>
        <div class="progress"><div class="progress-bar" id="bar"></div></div>
        <div class="controls">
          <button class="ctrl" id="back" title="Back 5 words (←)">⏮</button>
          <button class="ctrl primary" id="play" title="Play / Pause (Space)">▶</button>
          <button class="ctrl" id="fwd" title="Forward 5 words (→)">⏭</button>
          <label class="wpm">
            <span id="wpmLabel">${settings.wpm} WPM</span>
            <input type="range" id="wpm" min="100" max="900" step="25" value="${settings.wpm}">
          </label>
          <span class="counter" id="counter">0 / ${words.length}</span>
        </div>
        <div class="footnote">
          Spritz-style RSVP. Comprehension drops above ~400 WPM (Rayner et al., 2016).
        </div>
      </div>
    `;
    root.appendChild(overlay);

    const $ = (sel) => root.querySelector(sel);
    const wordEl = $('#word');
    const prefixEl = wordEl.querySelector('.prefix');
    const pivotEl = wordEl.querySelector('.pivot');
    const suffixEl = wordEl.querySelector('.suffix');
    const playBtn = $('#play');
    const backBtn = $('#back');
    const fwdBtn = $('#fwd');
    const closeBtn = $('.close');
    const wpmInput = $('#wpm');
    const wpmLabel = $('#wpmLabel');
    const counter = $('#counter');
    const bar = $('#bar');

    wordEl.style.fontSize = settings.fontSize + 'px';

    let i = 0;
    let playing = false;
    let timer = null;

    function render() {
      const w = words[i] || '';
      const idx = pivotIndex(w.length);
      prefixEl.textContent = w.slice(0, idx);
      pivotEl.textContent = w[idx] || '';
      suffixEl.textContent = w.slice(idx + 1);
      counter.textContent = `${i + 1} / ${words.length}`;
      bar.style.width = `${((i + 1) / words.length) * 100}%`;
    }

    function step() {
      if (!playing) return;
      const baseMs = 60000 / settings.wpm;
      const delay = wordDelay(words[i], baseMs, settings);
      render();
      timer = setTimeout(() => {
        if (i < words.length - 1) {
          i++;
          step();
        } else {
          pause();
        }
      }, delay);
    }

    function play() {
      if (i >= words.length - 1) i = 0;
      playing = true;
      playBtn.textContent = '⏸';
      step();
    }

    function pause() {
      playing = false;
      playBtn.textContent = '▶';
      if (timer) clearTimeout(timer);
      timer = null;
    }

    function toggle() { playing ? pause() : play(); }

    function jump(delta) {
      const wasPlaying = playing;
      pause();
      i = Math.max(0, Math.min(words.length - 1, i + delta));
      render();
      if (wasPlaying) play();
    }

    function close() {
      pause();
      document.removeEventListener('keydown', onKey, true);
      host.remove();
      reader = null;
    }

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === ' ') { e.preventDefault(); toggle(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); jump(-5); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); jump(5); }
    }

    playBtn.addEventListener('click', toggle);
    backBtn.addEventListener('click', () => jump(-5));
    fwdBtn.addEventListener('click', () => jump(5));
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    wpmInput.addEventListener('input', () => {
      settings.wpm = parseInt(wpmInput.value, 10);
      wpmLabel.textContent = `${settings.wpm} WPM`;
      saveSettings({ wpm: settings.wpm });
    });
    document.addEventListener('keydown', onKey, true);

    render();
    play();

    return { close };
  }

  const READER_CSS = `
:host { all: initial; }
.overlay {
  position: fixed; inset: 0;
  z-index: 2147483647;
  display: flex; align-items: center; justify-content: center;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  backdrop-filter: blur(6px);
  animation: fade .15s ease-out;
}
.theme-dark { background: rgba(8, 10, 14, 0.78); color: #f1f5f9; }
.theme-light { background: rgba(248, 250, 252, 0.85); color: #0f172a; }

@keyframes fade { from { opacity: 0; } to { opacity: 1; } }

.frame {
  position: relative;
  width: min(820px, 92vw);
  padding: 36px 28px 22px;
  border-radius: 16px;
  background: var(--frame-bg);
  box-shadow: 0 20px 60px rgba(0,0,0,.45);
}
.theme-dark .frame { --frame-bg: #11151c; border: 1px solid #1f2937; }
.theme-light .frame { --frame-bg: #ffffff; border: 1px solid #e2e8f0; }

.close {
  position: absolute; top: 8px; right: 12px;
  background: transparent; border: 0; color: inherit;
  font-size: 28px; line-height: 1; cursor: pointer; opacity: .6;
}
.close:hover { opacity: 1; }

.rail {
  position: relative;
  height: 200px;
  display: flex; align-items: center; justify-content: center;
}
.rail-line {
  position: absolute; left: 50%; top: 50%;
  width: 1px; height: 60%;
  background: currentColor; opacity: .15;
  transform: translate(-50%, -50%);
}
.rail-line::before, .rail-line::after {
  content: ""; position: absolute; left: 50%;
  width: 12px; height: 1px; background: currentColor; opacity: 1;
  transform: translateX(-50%);
}
.rail-line::before { top: -10px; }
.rail-line::after { bottom: -10px; }

.word {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: baseline;
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: pre;
}
.prefix { text-align: right; padding-right: 1px; }
.suffix { text-align: left; padding-left: 1px; }
.pivot { color: #ef4444; font-weight: 700; }
.theme-light .pivot { color: #dc2626; }

.progress {
  height: 3px; background: rgba(127,127,127,.2);
  border-radius: 99px; margin: 18px 8px 14px;
  overflow: hidden;
}
.progress-bar {
  height: 100%; width: 0%;
  background: #ef4444;
  transition: width .12s linear;
}

.controls {
  display: flex; align-items: center; gap: 10px;
  padding: 0 8px;
}
.ctrl {
  background: transparent; border: 1px solid currentColor;
  color: inherit; opacity: .8;
  padding: 6px 12px; border-radius: 8px;
  font-size: 14px; cursor: pointer;
  transition: opacity .15s, background .15s;
}
.ctrl:hover { opacity: 1; }
.ctrl.primary {
  background: #ef4444; border-color: #ef4444; color: white; opacity: 1;
}
.ctrl.primary:hover { background: #dc2626; }

.wpm { display: flex; align-items: center; gap: 8px; flex: 1; }
.wpm input { flex: 1; accent-color: #ef4444; }
#wpmLabel { min-width: 76px; font-variant-numeric: tabular-nums; font-size: 13px; opacity: .8; }
.counter {
  font-variant-numeric: tabular-nums;
  font-size: 12px; opacity: .6;
  min-width: 80px; text-align: right;
}
.footnote {
  margin-top: 14px; padding: 0 8px;
  font-size: 11px; opacity: .45; text-align: center;
}
`;

  // ----- Message handling -----

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg?.type !== 'rsvp:start') return;
    (async () => {
      const settings = { ...(await loadSettings()), ...(msg.settings || {}) };
      const text = getSelectionText() || getArticleText();
      openReader(text, settings);
    })();
  });
})();
