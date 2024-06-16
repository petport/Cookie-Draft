chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.initiator === "http://localhost")
      {
        console.log("Web request received:", details);
        // Only process script requests
        
        if (details.type === "script") {
          try {
            const scriptUrl = new URL(details.url);
            const initiator = details.initiator || details.documentUrl;

          if (initiator && isValidUrl(initiator)) {
            const mainFrameUrl = new URL(initiator);

            // Check if the script is from a third-party origin
            if (scriptUrl.origin !== mainFrameUrl.origin) {
              console.log(`Third-party script detected: ${details.url}. Note: Third-party cookies may be blocked by the browser.`);

              // Store third-party script URLs in local storage
              chrome.storage.local.get(["thirdPartyScripts"], function(result) {
                const thirdPartyScripts = result.thirdPartyScripts || [];
                thirdPartyScripts.push(details.url);
                chrome.storage.local.set({ thirdPartyScripts });
              });
            }
          } else if (initiator && initiator.startsWith("file://")) {
            console.log(`Local file detected as initiator: ${initiator}`);
          } else {
            console.log('Initiator is missing or invalid:', initiator);
          }
        } catch (error) {
          console.error('Error processing script URL:', error, details);
        }
      }
    }
},
  { urls: ["<all_urls>"] }
);

// Helper function to validate URLs
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}