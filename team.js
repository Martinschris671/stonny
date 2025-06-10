document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".slf-section-header, .slf-logo-column, .slf-team-column"
  );
  const teamMembers = document.querySelectorAll(".slf-team-member");

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedElements.forEach((el) => {
    if (el) observer.observe(el);
  });

  teamMembers.forEach((member) => {
    const bioContent = member.querySelector(".slf-member-bio");

    member.addEventListener("click", () => {
      const isActive = member.classList.contains("is-active");

      // Close all other active members
      teamMembers.forEach((otherMember) => {
        if (
          otherMember !== member &&
          otherMember.classList.contains("is-active")
        ) {
          otherMember.classList.remove("is-active");
          otherMember.querySelector(".slf-member-bio").style.maxHeight = null;
        }
      });

      member.classList.toggle("is-active");
      if (member.classList.contains("is-active")) {
        bioContent.style.maxHeight = bioContent.scrollHeight + "px";
      } else {
        bioContent.style.maxHeight = null;
      }
    });
  });
});
