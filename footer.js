document.addEventListener("DOMContentLoaded", () => {
  // Set current year in copyright
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Intersection Observer for footer entry animation
  const siteFooter = document.getElementById("siteFooter");
  if (siteFooter) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          siteFooter.classList.add("is-visible");
          observer.unobserve(siteFooter);
        }
      },
      { threshold: 0.1 }
    ); // Trigger when 10% visible
    observer.observe(siteFooter);
  }
});
