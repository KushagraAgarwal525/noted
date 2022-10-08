chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addHighlight",
    title: "Highlight",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "addNote",
    title: "Add Note",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  const text = item.selectionText;
  if (item.menuItemId === "addHighlight") {
    chrome.tabs.sendMessage(tab.id, {
      type: "ADD_HIGHLIGHT",
      text,
    });
    console.log(text);
  } else if (item.menuItemId === "addNote") {
    chrome.tabs.sendMessage(tab.id, {
      type: "ADD_NOTE",
      text,
    });
    console.log(text);
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      webUrl: tab.url,
    });
  }
});