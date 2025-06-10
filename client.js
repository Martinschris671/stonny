document.addEventListener("DOMContentLoaded", () => {
  const sectionHeader = document.getElementById("clientsGridHeader");
  const clientGrid = document.getElementById("clientGrid");
  const sectionFooter = document.getElementById("clientSectionFooter"); // For animation

  // Using the same client project data from the previous "Our Projects" section
  const clientProjectsData = [
    {
      id: "client1",
      number: "01",
      title: "Six Bedroom Duplex", // Shortened title for grid
      location: "Imo Owerri, Nigeria",
      scope:
        "Full architectural design from concept to blueprint, and comprehensive civil engineering oversight for structural integrity and site development. Managed all phases of construction for a luxury residential duplex, including high-end finishes and gatehouse integration.",
      imageUrl: "project/imo.png",
    },
    {
      id: "client2",
      number: "02",
      title: "Impresit Resort & Garden",
      location: "Abuja, Karmo",
      scope:
        "Master planning and execution for a large-scale resort complex. This included detailed landscaping design, construction of recreational facilities, guest accommodations, and integrated garden spaces, creating a serene and engaging destination.",
      imageUrl: "project/impresit.png",
    },
    {
      id: "client3",
      number: "03",
      title: "Heroes Faith Church",
      location: "Imo State, Owerri",
      scope:
        "Turnkey construction of a significant Church Building and adjacent Event Centre. Our responsibilities spanned from foundation work through to the intricate details of the architectural finishing, ensuring a space suitable for large congregations and diverse events.",
      imageUrl: "project/church.png",
    },
    {
      id: "client4",
      number: "04",
      title: "Industrial Warehouse", // Shortened
      location: "Ogun State",
      scope:
        "Design and build of a large-scale industrial warehousing complex. Focused on robust structural design, optimized logistical flow, integrated office spaces, and durable material selection suitable for heavy-duty operations.",
      imageUrl: "project/FQ5hmrAXMAE7npI.jpg",
    },
  ];

  function createClientCard(project, index) {
    const card = document.createElement("article");
    card.classList.add("ocg-client-card");
    card.dataset.projectId = project.id;

    card.innerHTML = `
                <div class="ocg-card-image-wrapper">
                    <img src="${project.imageUrl}" alt="${project.title}">
                </div>
                <div class="ocg-card-content-preview">
                    <div> <!-- Wrapper for title/location to group them -->
                        <h3 class="ocg-card-project-title">${project.title}</h3>
                        <p class="ocg-card-project-location">${
                          project.location
                        }</p>
                    </div>
                    <a href="#" class="ocg-explore-button" aria-expanded="false" aria-controls="detail-${
                      project.id
                    }">
                        Explore Project
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </a>
                </div>
                <div class="ocg-card-detail-content" id="detail-${project.id}">
                    <div class="ocg-card-detail-scope">
                        <p>${project.scope.replace(/\n/g, "</p><p>")}</p>
                    </div>
                </div>
            `;

    const exploreButton = card.querySelector(".ocg-explore-button");
    const detailContent = card.querySelector(".ocg-card-detail-content");

    exploreButton.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = card.classList.contains("is-expanded");

      // Close all other expanded cards
      document
        .querySelectorAll(".ocg-client-card.is-expanded")
        .forEach((expandedCard) => {
          if (expandedCard !== card) {
            expandedCard.classList.remove("is-expanded");
            expandedCard.querySelector(
              ".ocg-card-detail-content"
            ).style.maxHeight = null;
            expandedCard
              .querySelector(".ocg-explore-button")
              .setAttribute("aria-expanded", "false");
            expandedCard.querySelector(
              ".ocg-explore-button svg"
            ).style.transform = "rotate(0deg)";
          }
        });

      card.classList.toggle("is-expanded");
      exploreButton.setAttribute("aria-expanded", !isExpanded);

      if (!isExpanded) {
        detailContent.style.maxHeight = detailContent.scrollHeight + "px";
        exploreButton.querySelector("svg").style.transform = "rotate(90deg)"; // Arrow points down
      } else {
        detailContent.style.maxHeight = null;
        exploreButton.querySelector("svg").style.transform = "rotate(0deg)"; // Arrow points right
      }
    });
    return card;
  }

  if (clientGrid) {
    clientProjectsData.forEach((project, index) => {
      const cardElement = createClientCard(project, index);
      clientGrid.appendChild(cardElement);
    });
  }

  // Intersection Observer for entry animations
  const animatedElements = document.querySelectorAll(
    ".ocg-section-header, .ocg-client-card, .op-section-footer-brand"
  );
  let delayCounter = 0;
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("ocg-client-card")) {
            entry.target.style.transitionDelay = `${delayCounter * 0.08}s`;
            delayCounter++;
          }
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
});
