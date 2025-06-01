document.addEventListener("DOMContentLoaded", () => {
  const openModalButton = document.getElementById("openVideoModalBtn");
  const closeModalButton = document.getElementById("closeVideoModalBtn");
  const videoModalOverlay = document.getElementById("videoModalOverlay");
  const videoPlayerContainer = document.getElementById("videoPlayerContainer");

  // --- VIDEO FILE CONFIGURATION ---
  // 1. Download the video from: https://www.pexels.com/video/drone-shot-of-a-construction-site-14408107/
  // 2. Rename it if desired (e.g., "construction_video.mp4").
  // 3. Create a 'videos' folder next to your HTML file.
  // 4. Place the video file inside the 'videos' folder.
  // 5. Update videoFileName and localVideoUrl below if you used a different name or path.

  const videoFileName = "88231-602915804_small.mp4"; // Make sure this matches your downloaded file name
  const localVideoUrl = `videos/${videoFileName}`; // Path relative to your HTML file

  let currentVideoElement = null; // To keep track of the video element

  function openModal() {
    if (videoModalOverlay) {
      // Create video element
      const videoElement = document.createElement("video");
      videoElement.setAttribute("width", "100%");
      videoElement.setAttribute("height", "100%");
      videoElement.setAttribute("controls", ""); // Show default browser controls
      videoElement.setAttribute("autoplay", ""); // Attempt autoplay
      videoElement.setAttribute("playsinline", ""); // Important for iOS
      // videoElement.setAttribute('loop', ''); // Uncomment to loop

      const sourceElement = document.createElement("source");
      sourceElement.setAttribute("src", localVideoUrl);
      sourceElement.setAttribute("type", "video/mp4");

      videoElement.appendChild(sourceElement);
      videoElement.innerHTML += "Your browser does not support the video tag."; // Fallback text

      videoPlayerContainer.innerHTML = ""; // Clear placeholder
      videoPlayerContainer.appendChild(videoElement);
      currentVideoElement = videoElement; // Store reference

      videoModalOverlay.classList.add("is-active");
      document.body.classList.add("vm-modal-open");

      // Attempt to play, catch errors if autoplay is blocked
      videoElement.play().catch((error) => {
        console.warn("Video autoplay was prevented by the browser:", error);
        // User will have to click play on the controls
      });
    }
  }

  function closeModal() {
    if (videoModalOverlay) {
      videoModalOverlay.classList.remove("is-active");
      document.body.classList.remove("vm-modal-open");

      // Pause and reset the video to stop playback and free resources
      if (currentVideoElement) {
        currentVideoElement.pause();
        currentVideoElement.removeAttribute("src"); // Important to stop loading
        currentVideoElement.load(); // Resets the media element
      }
      videoPlayerContainer.innerHTML = "<span>Video Player Area</span>"; // Reset to placeholder
      currentVideoElement = null;
    }
  }

  if (openModalButton) {
    openModalButton.addEventListener("click", openModal);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  if (videoModalOverlay) {
    videoModalOverlay.addEventListener("click", (event) => {
      if (event.target === videoModalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      videoModalOverlay.classList.contains("is-active")
    ) {
      closeModal();
    }
  });
});
