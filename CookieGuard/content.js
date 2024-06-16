(function() {
  console.log("CookieGuard content script loaded");

  const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
  console.log("Original cookie descriptor:", originalCookieDescriptor);

  redefineCookieSetter();

  const newCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
  console.log("New cookie descriptor:", newCookieDescriptor);

  // Use MutationObserver to handle dynamically added scripts
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'SCRIPT') {
            console.log('[mutation observer] New script added:', node.src);
            node.addEventListener('load', () => {
              console.log('[mutation observer] Script loaded:', node.src);
              redefineCookieSetter();
            });
          }
        });
      }
    });
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });

  // Directly test setting and getting cookies to verify interception
  document.cookie = "testCookie=testValue; path=/";
  console.log("[content.js] Test cookie set directly: ", document.cookie);

  function redefineCookieSetter() {
    if (!originalCookieDescriptor) {
      console.error("Failed to get the original cookie descriptor");
      return;
    }

    Object.defineProperty(Document.prototype, 'cookie', {
      configurable: true,
      enumerable: true,
      get: function() {
        console.log("[getter] Intercepting cookie get");
        const cookies = originalCookieDescriptor.get.call(document);
        console.log("[getter] Getting cookies:", cookies);
        return cookies;
      },
      set: function(cookieString) {
        console.log("[setter] Intercepting cookie set");
        console.log("[setter] Attempting to set cookie:", cookieString);
        originalCookieDescriptor.set.call(document, cookieString);
        console.log("[setter] Cookie set:", cookieString);
      }
    });
    console.log("[cookie property defineProperty done] Cookie getter and setter overridden");
  }
})();