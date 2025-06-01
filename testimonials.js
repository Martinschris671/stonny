document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("testimonialsHeader");
  const graphicAccent = document.getElementById("testimonialGraphicAccent");
  const contentContainer = document.getElementById("testimonialContent");
  const navContainer = document.getElementById("testimonialNav");
  const prevButton = document.getElementById("tstPrevBtn");
  const nextButton = document.getElementById("tstNextBtn");
  const slideCounter = document.getElementById("tstSlideCounter"); // Optional

  const testimonialsData = [
    {
      quote:
        "Working with STONNY was an absolute dream. Their vision transformed our space beyond our wildest expectations. Every detail was considered, resulting in a home that is both stunningly beautiful and perfectly functional.",
      author: "Adebayo Philips",
      company: "Homeowner, Lagos",
    },
    {
      quote:
        "The level of professionalism and creativity is unmatched. Our commercial space now reflects our brand perfectly and has significantly enhanced our client experience. Truly a high-end service from start to finish.",
      author: "Chidinma Eze",
      company: "CEO, Tech Innovate Ltd.",
    },
    {
      quote:
        "From the initial concept to the final nail, STONNY CONSTRUCTION demonstrated exceptional expertise and a commitment to quality. They are not just builders; they are true partners in creating lasting landmarks.",
      author: "Dr. Ifeanyi Okoro",
      company: "Project Developer",
    },
    {
      quote:
        "Our infrastructure project was complex and demanding, but STONNY delivered on time and within budget, exceeding all our expectations for quality and efficiency. Highly recommended.",
      author: "Chief Aliyu Bello",
      company: "Community Leader",
    },
  ];

  let currentTestimonialIndex = 0;

  function displayTestimonial(index) {
    const testimonial = testimonialsData[index];

    // Create new elements for animation
    const quoteEl = document.createElement("blockquote");
    quoteEl.classList.add("tst-testimonial-quote", "tst-text-item");
    quoteEl.textContent = testimonial.quote;

    const authorEl = document.createElement("p");
    authorEl.classList.add("tst-testimonial-author", "tst-text-item");
    authorEl.innerHTML = `${testimonial.author} <span class="tst-testimonial-author-company">${testimonial.company}</span>`;

    // Clear previous content with exit animation
    Array.from(contentContainer.children).forEach((child) => {
      child.classList.add("is-exiting");
      child.addEventListener(
        "transitionend",
        () => {
          if (child.classList.contains("is-exiting")) {
            // Ensure it's still meant to be removed
            child.remove();
          }
        },
        { once: true }
      );
    });

    // Add new content after a short delay for exit animation to start
    setTimeout(() => {
      contentContainer.appendChild(quoteEl);
      contentContainer.appendChild(authorEl);

      // Trigger enter animation
      requestAnimationFrame(() => {
        // Ensure elements are in DOM
        quoteEl.classList.add("is-entering");
        authorEl.classList.add("is-entering");
      });
    }, 50); // Small delay should be less than exit transition

    updateNavButtons();
    if (slideCounter) {
      // Update optional counter
      slideCounter.textContent = `${index + 1} / ${testimonialsData.length}`;
    }
  }

  function updateNavButtons() {
    prevButton.disabled = currentTestimonialIndex === 0;
    nextButton.disabled =
      currentTestimonialIndex === testimonialsData.length - 1;
  }

  prevButton.addEventListener("click", () => {
    if (currentTestimonialIndex > 0) {
      currentTestimonialIndex--;
      displayTestimonial(currentTestimonialIndex);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentTestimonialIndex < testimonialsData.length - 1) {
      currentTestimonialIndex++;
      displayTestimonial(currentTestimonialIndex);
    }
  });

  // Intersection Observer for entry animations
  const animatedElements = [header, graphicAccent, navContainer];
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );
  animatedElements.forEach((el) => {
    if (el) observer.observe(el);
  });

  // Initial display
  if (testimonialsData.length > 0) {
    // Delay initial display to allow section header etc. to animate in
    setTimeout(() => {
      displayTestimonial(0);
      if (slideCounter) slideCounter.style.display = "inline"; // Show counter if used
    }, 800); // Adjust delay based on other entry animations
  } else {
    contentContainer.innerHTML = "<p>No testimonials yet.</p>";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
});
