// background.js file

// Listen for a right-click event on the page
document.addEventListener("contextmenu", function(event) {
  // Get the video URL from the event target
  let videoUrl = event.target.src;
  // Check if the event target is a YouTube video
  if (videoUrl && videoUrl.includes("youtube.com")) {
    // Create the "Download Video" context menu item
    let downloadItem = {
      "id": "download_video",
      "title": "Download Video",
      "contexts": ["video"]
    };
    // Add the item to the context menu
    chrome.contextMenus.create(downloadItem);
  }
});

// Handle clicks on the "Download Video" context menu item
chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId === "download_video") {
    // Create a download for the video
    chrome.downloads.download({
      "url": info.srcUrl,
      "filename": "video.mp4"
    });
  }
});
