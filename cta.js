document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for entry animation
  const ctaSection = document.getElementById("getQuoteCtaSection");

  if (ctaSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ctaSection.classList.add("is-visible");
          observer.unobserve(ctaSection); // Animate only once
        }
      },
      { threshold: 0.2 }
    ); // Trigger when 20% visible

    observer.observe(ctaSection);
  }
});
