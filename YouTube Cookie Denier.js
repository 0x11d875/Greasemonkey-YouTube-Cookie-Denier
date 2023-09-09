// ==UserScript==
// @name     YouTube Cookie Denier
// @version  1.0
// @grant    none
// ==/UserScript==

// Function to deny cookie questions
function denyCookies() {
  // Find all elements that potentially contain cookie questions
  const potentialQuestionElements = document.querySelectorAll('[role="dialog"], [aria-label="Dialog"]');

  // Loop through each potential question element
  potentialQuestionElements.forEach((questionElement) => {
    // Check if the element's content indicates it as a cookie question
    const buttons = questionElement.querySelectorAll('button');
    buttons.forEach((button) => {
      const buttonText = button.textContent.toLowerCase();
      if (buttonText.includes('reject') || buttonText.includes('deny')) {
        button.click();
        console.log("FJI Debug: Denied cookie question");
        observer.disconnect(); // Stop observing mutations
      }
    });
  });
}

// Create a MutationObserver to detect changes in the document
const observer = new MutationObserver(() => {
  denyCookies();
});

// Configuration for the observer (targeting the whole document and its subtree)
const observerConfig = {
  childList: true,
  subtree: true
};

// Observe changes in the document with the configured options
observer.observe(document, observerConfig);
