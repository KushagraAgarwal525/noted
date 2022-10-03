(() => {
  console.log("in content script");
  let youtubeLeftControls, youtubePlayer;
  let currentWebsite = "";
  let currentVideoBookmarks = [];

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.type === "NEW") {
      currentWebsite = webUrl;
      console.log("neww!!!!!!!!!!!");
      newWebsiteOpened();
    } else if (type === "ADD_HIGHLIGHT") {
      console.log("highlight added");
    }
  });

  const newWebsiteOpened = () => {
    return "";
  };

})();

// Source: https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text

function getSelectionText() {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}
