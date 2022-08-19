/**
 * Clears any session storage on a window removed
 */
chrome.windows.onRemoved.addListener(() => {
  chrome.storage.session.clear()
})
