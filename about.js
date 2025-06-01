// JavaScript remains UNCHANGED from the previous version.
// The top padding adjustment is purely a CSS change.
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".aus-section-title-wrapper, .aus-tabs-navigation"
  );
  const tabButtons = document.querySelectorAll(".aus-tab-button");
  const tabContents = document.querySelectorAll(".aus-tab-content");
  const activeTabIndicator = document.getElementById("activeTabIndicator");
  const valueItems = document.querySelectorAll(".aus-value-item");

  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);
  animatedElements.forEach((el) => observer.observe(el));

  function setActiveTabIndicator(activeButton) {
    if (!activeButton || !activeTabIndicator) return;
    activeTabIndicator.style.left = `${activeButton.offsetLeft}px`;
    activeTabIndicator.style.width = `${activeButton.offsetWidth}px`;
  }

  function switchTab(targetTabId) {
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === targetTabId);
      if (button.dataset.tab === targetTabId) {
        setActiveTabIndicator(button);
      }
    });
    tabContents.forEach((content) => {
      content.classList.toggle(
        "is-active",
        content.dataset.content === targetTabId
      );
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchTab(button.dataset.tab);
    });
  });

  valueItems.forEach((item) => {
    const button = item.querySelector(".aus-value-button");
    const descriptionWrapper = item.querySelector(
      ".aus-value-description-wrapper"
    );

    if (button && descriptionWrapper) {
      button.addEventListener("click", () => {
        const isOpen = item.classList.toggle("is-open");
        if (isOpen) {
          descriptionWrapper.style.maxHeight =
            descriptionWrapper.scrollHeight + "px";
        } else {
          descriptionWrapper.style.maxHeight = null;
        }
      });
    }
  });

  if (tabButtons.length > 0) {
    setTimeout(() => {
      switchTab(tabButtons[0].dataset.tab);
      window.addEventListener("resize", () => {
        const currentActiveButton = document.querySelector(
          ".aus-tab-button.is-active"
        );
        if (currentActiveButton) setActiveTabIndicator(currentActiveButton);
      });
    }, 300);
  }
});
