
fetch("data/discover.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("discover-cards");

    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  });

// Visitor message using localStorage
const msgContainer = document.getElementById("visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  msgContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const difference = now - Number(lastVisit);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days < 1) {
    msgContainer.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    msgContainer.textContent = "You last visited 1 day ago.";
  } else {
    msgContainer.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// Footer dynamic year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});