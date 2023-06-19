import { displayError } from "./modules/error.mjs";
import { initializeCookies } from "./modules/cookies.mjs";
import {
  showSpinner,
  spinner,
  validateYoutubeUrlAndId,
  createDownloadButton,
  updateUI,
  showFab,
} from "./modules/utils.mjs";

const form = document.querySelector("form");
const submitBtn = document.querySelector("#submitBtn");
const videoTitle = document.querySelector("#video-title");

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
        // Retrieve the custom data from the response headers
        const customData = JSON.parse(response.headers.get("Custom-Data"));
        const originalTitle = customData.originalTitle;
        const fileName = customData.fileName;
        let res = await response.json();
        let fileURL = res.url;
        // Store the data
        const data = { originalTitle, fileName, downloadURL: fileURL };
        // Update the UI with the response data
        createDownloadButton(data);
        updateUI(link, data);
      } catch (err) {
        console.error(err);
        displayError(err);
      } finally {
        // Enable the submit button
        submitBtn.disabled = false;
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
