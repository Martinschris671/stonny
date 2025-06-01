document.addEventListener("DOMContentLoaded", () => {
  const sectionHeader = document.getElementById("servicesCardHeader");
  const servicesGrid = document.getElementById("servicesGrid");

  const servicesData = [
    {
      title: "Residential Construction",
      description:
        "Building homes that blend comfort, elegance, and functionality. Custom-built homes, luxury villas, and apartment complexes tailored to your unique lifestyle and aspirations.",
      fullDescriptionItems: [
        // UPDATED: Now an array for list items
        "Building homes that blend comfort, elegance, and functionality.",
        "Custom-built homes, luxury villas, and apartment complexes.",
      ],
    },
    {
      title: "Commercial Construction",
      description:
        "Designing and constructing spaces for businesses, including offices, retail stores, and malls, ensuring modern aesthetics and operational efficiency.",
      fullDescriptionItems: [
        "Designing and constructing spaces for businesses, including offices, retail stores, and mall.",
        "Ensuring modern aesthetics and operational efficiency.",
      ],
    },
    {
      title: "Renovation & Remodelling",
      description:
        "Transforming existing spaces with innovative designs and modern finishes for residential, commercial, and industrial properties.",
      fullDescriptionItems: [
        "Transforming existing spaces with innovative designs and modern finishes.",
        "Residential, commercial, and industrial renovation services.",
      ],
    },
    {
      title: "Project Management",
      description:
        "Comprehensive oversight from planning to execution, ensuring projects are delivered on time and within budget with utmost precision.",
      fullDescriptionItems: [
        "Comprehensive Oversight From Planning To Execution.",
        "Ensuring projects are delivered on time and within budget.",
      ],
    },
    {
      title: "Infrastructure Development",
      description:
        "Roads, Bridges, And Public Utilities To Enhance Connectivity. Expertise In Large-scale Civil Engineering Projects.",
      fullDescriptionItems: [
        "Roads, Bridges, And Public Utilities To Enhance Connectivity.",
        "Expertise In Large-scale Civil Engineering Projects.",
      ],
    },
    {
      title: "Architectural Design",
      description:
        "Combining architectural innovation, superior construction, and reliable materials to bring visions to life with an emphasis on aesthetics and functionality.",
      fullDescriptionIntro:
        "STONNY CONSTRUCTION LTD. combines architectural innovation, superior construction, and reliable building materials to bring your visions to life.", // Optional intro paragraph
      fullDescriptionItems: [
        "Creative and functional designs tailored to your needs.",
        "Emphasis on aesthetics, sustainability, and functionality.",
      ],
    },
    {
      title: "Sales of Building Materials",
      description:
        "High-quality materials for all types of construction projects, including cements, aggregates, bricks, roofing, finishes, and MEP supplies.",
      fullDescriptionIntro:
        "High-quality material for all types of construction project.",
      fullDescriptionItems: [
        "Cements, sand, and aggregates.",
        "Bricks, blocks, and tiles.",
        "Roofing materials, paints and finishes.",
        "Plumbing, electrical, and HVAC supplies.",
        "Competitive pricing with reliable delivery services.",
      ],
    },
  ];

  function createServiceCard(service, index) {
    const card = document.createElement("article");
    card.classList.add("scg-service-card");
    card.dataset.serviceIndex = index; // Store index to access original data

    // Initial short description
    card.innerHTML = `
                <div> 
                    <h3 class="scg-card-title">${service.title}</h3>
                    <p class="scg-card-description">${service.description}</p> 
                </div>
                <a href="#" class="scg-read-more-link" aria-label="Read more about ${service.title}">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </a>
            `;

    const readMoreLink = card.querySelector(".scg-read-more-link");
    const descriptionEl = card.querySelector(".scg-card-description");

    readMoreLink.addEventListener("click", (e) => {
      e.preventDefault();
      const isActive = card.classList.contains("is-active");

      document
        .querySelectorAll(".scg-service-card.is-active")
        .forEach((activeCard) => {
          if (activeCard !== card) {
            activeCard.classList.remove("is-active");
            const desc = activeCard.querySelector(".scg-card-description");
            const originalIndex = activeCard.dataset.serviceIndex;
            desc.innerHTML = servicesData[originalIndex].description; // Reset to short paragraph
            activeCard.querySelector(
              ".scg-read-more-link"
            ).innerHTML = `Read More <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`;
          }
        });

      card.classList.toggle("is-active");

      if (card.classList.contains("is-active")) {
        let fullHtml = "";
        if (service.fullDescriptionIntro) {
          fullHtml += `<p>${service.fullDescriptionIntro}</p>`;
        }
        if (
          service.fullDescriptionItems &&
          service.fullDescriptionItems.length > 0
        ) {
          fullHtml += '<ul class="scg-full-description-list">';
          service.fullDescriptionItems.forEach((item) => {
            fullHtml += `<li>${item}</li>`;
          });
          fullHtml += "</ul>";
        }
        descriptionEl.innerHTML = fullHtml;
        readMoreLink.innerHTML = `Show Less <svg style="transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`;
      } else {
        descriptionEl.innerHTML = service.description; // Revert to short paragraph
        readMoreLink.innerHTML = `Read More <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`;
      }
    });
    return card;
  }

  servicesData.forEach((service, index) => {
    const cardElement = createServiceCard(service, index);
    servicesGrid.appendChild(cardElement);
  });

  const animatedElements = document.querySelectorAll(
    ".scg-section-header, .scg-service-card"
  );
  let delayCounter = 0;
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("scg-service-card")) {
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
