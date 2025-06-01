// --- PASTE YOUR PROVIDED JAVASCRIPT HERE ---
// (The script handling form validation and mailto: link generation)
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formStatusMessage = document.getElementById("formStatusMessage");

  const MY_EMAIL_ADDRESS = "info@stonnyconstructionltd.com"; // !!! REPLACE THIS !!!
  const YOUR_NAME_FOR_EMAIL = "STONNY Construction"; // !!! REPLACE THIS for email body !!!

  function validateField(field) {
    const wrapper = field.closest(".cfs-form-group"); // Find the parent group
    const errorElement = wrapper
      ? wrapper.querySelector(".form-error-message-unique")
      : null;

    let isValid = true;
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }
    field.classList.remove("invalid");

    if (field.hasAttribute("required") && field.value.trim() === "") {
      if (errorElement) errorElement.textContent = "This field is required.";
      isValid = false;
    } else if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        if (errorElement)
          errorElement.textContent = "Please enter a valid email.";
        isValid = false;
      }
    } else if (
      field.tagName === "SELECT" &&
      field.hasAttribute("required") &&
      field.value === ""
    ) {
      if (errorElement) errorElement.textContent = "Please select an option.";
      isValid = false;
    }

    if (!isValid) {
      if (errorElement) errorElement.classList.add("visible");
      field.classList.add("invalid");
    }
    return isValid;
  }

  if (contactForm) {
    const formFields = contactForm.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    formFields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("invalid")) {
          validateField(field);
        }
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let isFormValid = true;
      formFields.forEach((field) => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        formStatusMessage.textContent = "Please correct the errors above.";
        formStatusMessage.className =
          "form-status-message-unique error visible";
        return;
      }

      formStatusMessage.textContent = "Preparing your message...";
      formStatusMessage.className = "form-status-message-unique visible";

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const service = document.getElementById("contactService").value;
      const message = document.getElementById("contactMessage").value.trim();

      const subject = `Website Inquiry: ${service} - From ${name}`;
      const body = `Hello ${YOUR_NAME_FOR_EMAIL},\n\nI am reaching out from the STONNY Construction website contact form.\n\nName: ${name}\nEmail: ${email}\nService of Interest: ${service}\n\nMessage:\n${message}\n\nI look forward to discussing this further.\n\nBest regards,\n${name}\n`;
      const mailtoLink =
        `mailto:${MY_EMAIL_ADDRESS}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
      try {
        window.location.href = mailtoLink;
        formStatusMessage.textContent =
          "Your email application should open. Please review your message and click send!";
        formStatusMessage.className =
          "form-status-message-unique success visible";
        setTimeout(() => {
          contactForm.reset();
          formFields.forEach((field) => {
            field.classList.remove("invalid");
            const wrapper = field.closest(".cfs-form-group");
            const errorElement = wrapper
              ? wrapper.querySelector(".form-error-message-unique")
              : null;
            if (errorElement) errorElement.classList.remove("visible");
          });
          formStatusMessage.textContent = "";
          formStatusMessage.className = "form-status-message-unique"; // Reset classes
        }, 10000); // Increased timeout
      } catch (e) {
        console.error("Error opening mailto link:", e);
        formStatusMessage.textContent =
          "Could not automatically open your email app. This can be due to browser settings. Please copy the details or email us directly.";
        formStatusMessage.className =
          "form-status-message-unique error visible";
      }
    });
  }

  // Scroll Reveal Logic (from your previous script)
  const srElements = document.querySelectorAll(".scroll-reveal");
  if (typeof IntersectionObserver === "function") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Adjusted threshold
    );
    srElements.forEach((el) => observer.observe(el));
  } else {
    srElements.forEach((el) => el.classList.add("is-visible"));
  }
});
