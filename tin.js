document.addEventListener("DOMContentLoaded", () => {
  const sectionHeader = document.getElementById("techInnovationHeader");
  const innovationItems = document.querySelectorAll(".tin-innovation-item");

  if (sectionHeader) {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionHeader.classList.add("is-visible");
          headerObserver.unobserve(sectionHeader);
        }
      },
      { threshold: 0.1 }
    );
    headerObserver.observe(sectionHeader);
  }

  let itemDelayCounter = 0;
  const itemObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${itemDelayCounter * 0.08}s`;
          entry.target.classList.add("is-visible");
          itemDelayCounter++;
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );
  innovationItems.forEach((item) => itemObserver.observe(item));

  innovationItems.forEach((item) => {
    const button = item.querySelector(".tin-item-button");
    const descriptionWrapper = item.querySelector(
      ".tin-item-description-wrapper"
    );
    // const iconElement = item.querySelector('.tin-item-icon-wrapper i'); // Get the <i> element

    if (button && descriptionWrapper) {
      button.addEventListener("click", () => {
        const isOpen = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
          descriptionWrapper.style.maxHeight =
            descriptionWrapper.scrollHeight + "px";
          // Optional: Add a class to the icon for specific open state if needed
          // if (iconElement) iconElement.classList.add('icon-active');
        } else {
          descriptionWrapper.style.maxHeight = null;
          // if (iconElement) iconElement.classList.remove('icon-active');
        }
      });
    }
  });
});
