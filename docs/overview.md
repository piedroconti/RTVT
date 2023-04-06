Creating a browser extension is a great idea to enhance the user experience. Here's a high-level outline of the steps you would need to follow to create a Google Chrome extension that automatically displays subtitles when you play a YouTube video:

1. Develop a content script that injects a subtitle display area (e.g., a div element) into the YouTube video page.

2. Use the YouTube IFrame Player API to detect when the video is played, paused, or seeking. You can find the API documentation here.

3. Send a message from the content script to a background script with the video URL.

4. In the background script, use the pytube library to obtain the video's audio stream URL.

5. Use the google-cloud-speech library to transcribe the audio stream in real-time as the video plays.

6. Send the transcribed subtitles back to the content script, which will then display the subtitles in the injected subtitle display area.

7. Implement a user interface to toggle subtitles on or off and to choose the transcription language.
