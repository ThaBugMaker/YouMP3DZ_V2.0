import { displayError } from "./error.js";

// Check if a given URL is valid for YouTube
export function validateYoutubeUrlAndId(link) {
  // Check if url matches YouTube URL patterns
  const pattern1 = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&]+)$/;
  const pattern2 = /^(https?:\/\/)?(www\.)?youtu\.be\/([^&]+)$/;

  // Check if the URL matches either pattern
  if (pattern1.test(link) || pattern2.test(link)) {
    // If the URL matches, extract the video ID
    const match = link.match(pattern1) || link.match(pattern2);
    const videoId = match[3];
    const videoID = videoId;

    // Check if the video ID is valid
    if (videoId.length !== 11) {
      // If the video ID is not valid, display an error message
      displayError("The video ID is not valid.");
      // Return false to indicate that the URL is not valid
      return false;
    }

    // If the video ID is valid, return true
    return {
      videoID,
      videoId: true,
    };
  }

  // If the URL does not match any of the patterns, return false
  return false;
}

export function showSpinner() {
  // Get the video info container
  const videoInfo = document.querySelector(".video-info");
  // Create a spinner element
  spinner.classList.add("spinner");
  // videoInfo.appendChild(spinner);
  videoInfo.insertBefore(spinner, videoInfo.firstChild);
}
export const spinner = document.createElement("div");

export async function createDownloadButton(data) {
  const btn = document.querySelector(".btn");
  // If there is no download URL, hide the download button container
  if (!data.downloadURL) {
    console.log(data);
    btn.classList.add("hidden"); // Hide the download button container
    return;
  }

  if (data) {
    let downloadURL = data.downloadURL;
    const file = await fetch(`${downloadURL}`, {
      headers: {
        "X-Post-flag": true,
      },
      responseType: "blob",
    });
    let fileUrl = decodeURIComponent(file.url);
    btn.addEventListener("click", () => {
      open(fileUrl);
      location.reload();
    });
    btn.classList.remove("hidden"); // Show the download button container

    const form = document.querySelector("form");
    form.style.padding = "0.5em 1em 4em"; // Modify the padding
  } else {
    btn.classList.add("hidden"); // Hide the download button container
    btn.innerHTML = ""; // Remove the content inside the container
  }
}

export function updateUI(link, data) {
  const { videoID, videoId } = validateYoutubeUrlAndId(link);
  let title = document.querySelector("#video-title");
  let iframe = document.querySelector("#video-iframe");

  if (!data.originalTitle) {
    displayError("Internal Server Error: 500");
    return;
  } else if (videoId) {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoID}`;
    title.innerText = data.originalTitle;
  } else {
    displayError("Invalid YouTube URL");
  }
}
export async function updateRateLimitRemaining(data) {
  let xRateLimitRemaining = data.xRateLimitRemaining;
  sessionStorage.setItem("xRateLimitRemaining", xRateLimitRemaining);
  let remaining = document.querySelector("#remaining");
  remaining.innerText = xRateLimitRemaining;
}

export function showFab() {
  document.addEventListener("DOMContentLoaded", () => {
    const fab = document.getElementById("fab");
    let clickCount = 0;
    let delayTimer;

    // Check if the current page is the index page
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      fab.style.display = "flex"; // Show the FAB

      const handleHover = () => {
        if (!isTouchDevice()) {
          fab.classList.add("hover");
        }
      };

      const handleUnhover = () => {
        fab.classList.remove("hover");
      };

      const handleClick = () => {
        if (isTouchDevice()) {
          clickCount++;

          if (clickCount === 1) {
            // First click: Apply hover effect
            fab.classList.add("hover");
          } else if (clickCount === 2) {
            // Second click: Remove hover effect and Perform the action
            clearTimeout(delayTimer);
            // Reset the click count
            clickCount = 0;
            // Remove hover effect
            fab.classList.remove("hover");
            // Perform the action
            window.open("/terms-and-privacy", "_blank");
          }

          // Reset the click count and remove hover effect after a delay
          clearTimeout(delayTimer);
          delayTimer = setTimeout(() => {
            clickCount = 0;
            fab.classList.remove("hover");
          }, 2000); // Adjust the delay time as needed
        } else {
          window.open("/terms-and-privacy", "_blank");
        }
      };

      fab.addEventListener("mouseenter", handleHover);
      fab.addEventListener("mouseleave", handleUnhover);
      fab.addEventListener("click", handleClick);

      document.addEventListener("click", (event) => {
        if (!fab.contains(event.target)) {
          // Clicked outside the button area, reset click count and remove hover effect
          clickCount = 0;
          fab.classList.remove("hover");
        }
      });
    } else {
      fab.style.display = "none"; // Hide the FAB
    }
  });
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
