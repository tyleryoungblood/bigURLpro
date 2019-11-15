chrome.browserAction.onClicked.addListener(function(tab) {
   // when a user clicks the extension icon, execute content.js
   // content.js has access to the current tab's DOM while
   // background.js doesn't.
   chrome.tabs.executeScript(null, {file: "content.js"});
});

chrome.runtime.onMessage.addListener(function(request) {
   if ( request.scheme == "dark" )
      chrome.browserAction.setIcon({
         path : {
            "128": "icon128dark.png",
            "48": "icon48dark.png",
            "32": "icon32dark.png",
            "16": "icon16dark.png"
         }
      });
});