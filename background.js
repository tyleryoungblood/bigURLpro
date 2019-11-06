chrome.browserAction.onClicked.addListener(function(tab) {
   // when a user clicks the extension icon, execute content.js
   // content.js has access to the current tab's DOM while
   // background.js doesn't.
   chrome.tabs.executeScript(null, {file: "content.js"});
});