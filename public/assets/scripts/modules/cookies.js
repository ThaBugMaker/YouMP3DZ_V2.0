// cookies.js

export function initializeCookies() {
  // Check if user has already accepted cookies
  if (!localStorage.getItem("cookiesAccepted")) {
    // Create cookies notice element
    var cookiesNotice = document.createElement("div");
    cookiesNotice.id = "cookies-notice";

    // Create cookies notice content
    var noticeText = document.createElement("p");
    noticeText.innerHTML = `This website uses cookies by <strong>Google</strong> and <strong>YouTube</strong> to provide certain functionalities, such as Google Fonts and embedded YouTube videos.`;
    cookiesNotice.appendChild(noticeText);

    var acceptButton = document.createElement("button");
    var seeMoreButton = document.createElement("button");
    acceptButton.id = "accept-cookies";
    seeMoreButton.id = "seeMoreButton";
    acceptButton.textContent = "Accept";
    seeMoreButton.textContent = "Read More";
    cookiesNotice.appendChild(acceptButton);
    cookiesNotice.appendChild(seeMoreButton);

    // Append cookies notice to the body element
    document.body.appendChild(cookiesNotice);

    // Handle accept cookies button click
    acceptButton.addEventListener("click", function () {
      // Save acceptance in localStorage
      localStorage.setItem("cookiesAccepted", true);

      // Remove cookies notice from the page
      cookiesNotice.remove();
    });

    seeMoreButton.addEventListener("click", () => {
      window.open("https://policies.google.com/technologies/cookies", "_blank");
    });
  }
}
