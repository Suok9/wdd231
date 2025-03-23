document.addEventListener("DOMContentLoaded", async function () {
    const spotlightContainer = document.getElementById("spotlight-container");

    try {
        
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Failed to load member data.");
        
        const members = await response.json();

        
        const eligibleMembers = members.filter(member => 
            member.membership_level === "gold" || member.membership_level === "silver"
        );

        if (eligibleMembers.length === 0) {
            spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
            return;
        }

        
        const shuffled = eligibleMembers.sort(() => Math.random() - 0.5);
        const selectedMembers = shuffled.slice(0, 3);

        
        spotlightContainer.innerHTML = "";
        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p><strong>Membership:</strong> ${member.membership_level.toUpperCase()}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading spotlights:", error);
        spotlightContainer.innerHTML = "<p>Error loading spotlight members.</p>";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});


document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;