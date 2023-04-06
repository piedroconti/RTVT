// background-script.js

const apiKey = "YOUR_GOOGLE_CLOUD_API_KEY";
const apiUrl = "https://www.googleapis.com/speech/v1p1beta1/speech:recognize?key=" + apiKey;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "videoId") {
    handleVideoId(request.videoId);
  }
});

async function handleVideoId(videoId) {
  const audioUrl = await getAudioUrl(videoId);
  const audioData = await fetchAudioData(audioUrl);
  const transcription = await transcribeAudio(audioData);

  // Send transcription to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "updateSubtitle",
      subtitle: transcription,
    });
  });
}

async function getAudioUrl(videoId) {
  // Replace this function with your method for fetching the audio stream URL
  // using the 'pytube' library or an alternative method.
}

async function fetchAudioData(url) {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  return new Uint8Array(data);
}

async function transcribeAudio(audioData) {
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
    enableAutomaticPunctuation: true,
  };

  const audio = {
    content: arrayBufferToBase64(audioData),
  };

  const payload = {
    config: config,
    audio: audio,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data.results[0].alternatives[0].transcript;
}

function arrayBufferToBase64(buffer) {
  const binary = String.fromCharCode.apply(null, buffer);
  return btoa(binary);
}
