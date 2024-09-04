const youtube = 'https://www.youtube.com';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(youtube)) {
    await chrome.scripting.executeScript({
        target : {tabId : tab.id},
        files : [ "scripts/ytrash.js" ],
      });
  }
});
