// content-script.js

// Inject subtitle display area
const subtitleDiv = document.createElement("div");
subtitleDiv.id = "subtitle-display";
subtitleDiv.style.position = "absolute";
subtitleDiv.style.bottom = "10%";
subtitleDiv.style.left = "5%";
subtitleDiv.style.width = "90%";
subtitleDiv.style.textAlign = "center";
subtitleDiv.style.fontSize = "24px";
subtitleDiv.style.color = "white";
subtitleDiv.style.textShadow = "2px 2px 4px black";
subtitleDiv.style.zIndex = "10000";

const player = document.querySelector(".html5-video-player");
player.appendChild(subtitleDiv);

// Function to handle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "updateSubtitle") {
    subtitleDiv.innerText = request.subtitle;
  }
});

// YouTube IFrame Player API
let playerApiReady = false;
let playerApiInterval;

function onYouTubeIframeAPIReady() {
  playerApiReady = true;
}

function initPlayerApi() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function checkPlayerApi() {
  if (playerApiReady) {
    clearInterval(playerApiInterval);
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const videoId = new URLSearchParams(
        new URL(iframe.src).search
      ).get("v");
      if (videoId) {
        chrome.runtime.sendMessage({
          type: "videoId",
          videoId: videoId,
        });
      }
    }
  }
}

initPlayerApi();
playerApiInterval = setInterval(checkPlayerApi, 1000);
