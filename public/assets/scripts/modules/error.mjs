export function displayError(errorMessage) {
  // Check if an error message is already displayed
  const existingError = document.querySelector(".error");

  if (existingError) {
    existingError.textContent = `${errorMessage}`;
  } else {
    // Create a new error message element
    const errorDiv = document.createElement("span");
    errorDiv.classList.add("error");
    errorDiv.textContent = `${errorMessage}`;
    const form = document.querySelector("form");
    form.insertBefore(errorDiv, form.lastChild);

    // Remove the error message after 3 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
}
