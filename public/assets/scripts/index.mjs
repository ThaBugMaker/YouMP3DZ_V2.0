import { displayError } from "./modules/error.js";
import { initializeCookies } from "./modules/cookies.js";
import {
  showSpinner,
  spinner,
  validateYoutubeUrlAndId,
  createDownloadButton,
  updateRateLimitRemaining,
  updateUI,
  showFab,
} from "./modules/utils.js";

const form = document.querySelector("form");
const submitBtn = document.querySelector("#submitBtn");

let remainingElement = document.querySelector("#remaining");
let storedValue = sessionStorage.getItem("xRateLimitRemaining");
let xRateLimitRemaining;

addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  return false;
});
document.addEventListener("DOMContentLoaded", function () {
  // Detect the user's preferred color scheme
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set the `data-dark` attribute based on the detected mode
  document.documentElement.setAttribute(
    "data-dark",
    prefersDarkMode ? "1" : "0"
  );
  // Update Remaining Downloads Available From stored Session
  if (!storedValue) {
    remainingElement.innerText = 50;
  } else {
    let parsedValue = JSON.parse(storedValue);
    remainingElement.innerText = parsedValue;
  }
  let iframe = document.querySelector("#video-iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/1gI_HGDgG7c`;
  let fAwsome = document.querySelector("#fawsome");
  fAwsome.rel = "stylesheet";
  setTimeout(() => {
    // console.clear();
  }, 1500);
});
function handleForm() {
  if (!form) {
    return;
  }
  form.addEventListener("submit", async (e) => {
    // Prevent the form from submitting normally
    e.preventDefault();
    // Get the URL input element
    const input = document.querySelector("#yt-link");
    // Get the input value and trim whitespace
    const link = input.value.trim();

    //  Check if user entred valid url
    const isUrlValidAndIdValid = validateYoutubeUrlAndId(link);

    if (isUrlValidAndIdValid) {
      // Show the spinner and disable submit button
      spinner.style.display = "inline-block";
      showSpinner();
      submitBtn.disabled = true;

      // Send a POST request to the server
      try {
        const response = await fetch("/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Post-Flag": "true",
          },
          body: JSON.stringify({ url: link }),
        });
        xRateLimitRemaining = response.headers.get("X-Ratelimit-Remaining");

        // console.log(JSON.stringify(response.headers));

        // Retrieve the custom data from the response headers
        let res = await response.json();
        const customData = JSON.parse(response.headers.get("Custom-Data"));

        const decodedTitle = decodeURIComponent(customData.originalTitle);
        const decodedFileUrl = decodeURIComponent(res.url);
     
        // Store the data
        const data = {
          originalTitle: decodedTitle,
          // fileName: customData.fileName,
          fileName: decodedFileName,
          downloadURL: decodedFileUrl,
          xRateLimitRemaining,
        };

        // Call the function to update the rate limit remaining value
        updateRateLimitRemaining(data);
        // Update the UI with the response data
        createDownloadButton(data);
        updateUI(link, data);

        if (response.status === 410) {
          let body = await response.json();
          const error = body.message;
          displayError(error);
          return;
        }
        if (response.status === 404) {
          let body = await response.json();
          const error = body.message;
          displayError(error);
          return;
        }
        if (response.status === 429) {
          displayError("Download limit exceeded. Please try again later.");
          return;
        }
      } catch (err) {
        console.error(err);
        displayError(err);
      } finally {
        // Enable the submit button
        // submitBtn.disabled = false;
        // Hide the spinner
        spinner.style.display = "none";
      }
    } else {
      displayError("Invalid YouTube URL");
    }
  });
}
handleForm();
showFab();
// Call the initializeCookies function to set up the cookies notice
initializeCookies();
