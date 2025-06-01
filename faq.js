document.addEventListener("DOMContentLoaded", () => {
  const sectionTitle = document.getElementById("faqMainTitle");
  const faqItems = document.querySelectorAll(".sfq-item");

  if (sectionTitle) {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionTitle.classList.add("is-visible");
          titleObserver.unobserve(sectionTitle);
        }
      },
      { threshold: 0.1 }
    );
    titleObserver.observe(sectionTitle);
  }

  let delayCounter = 0;
  const itemObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${delayCounter * 0.08}s`;
          entry.target.classList.add("is-visible");
          delayCounter++;
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );
  faqItems.forEach((item) => itemObserver.observe(item));

  faqItems.forEach((item) => {
    const button = item.querySelector(".sfq-question-button");
    const content = item.querySelector(".sfq-answer-content");

    if (button && content) {
      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Optional: Close all other open items
        // faqItems.forEach(otherItem => {
        //     if (otherItem !== item && otherItem.classList.contains('is-open')) {
        //         otherItem.classList.remove('is-open');
        //         otherItem.querySelector('.sfq-question-button').setAttribute('aria-expanded', 'false');
        //         otherItem.querySelector('.sfq-answer-content').style.maxHeight = null;
        //     }
        // });

        item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", !isOpen);

        if (!isOpen) {
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.style.maxHeight = null;
        }
      });
    }
  });
});
