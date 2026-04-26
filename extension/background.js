chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'start-rsvp') return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'rsvp:start' });
  } catch (err) {
    // content script not present on this tab (e.g. chrome:// pages)
    console.warn('RSVP: cannot inject on this tab', err);
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.type !== 'rsvp:start-from-popup') return;
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, { type: 'rsvp:start', settings: msg.settings });
  });
});
