document.getElementById('timestamp').value = new Date().toISOString();

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});

function openModal(id) { document.getElementById(id).style.display = "flex"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }



  function saveData(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const firstName = document.querySelector('input[name="first-name"]').value;
    const lastName = document.querySelector('input[name="last-name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const businessName = document.querySelector('input[name="organization"]').value;
    const membershipLevel = document.querySelector('select[name="membership-level"]').value;
    const timestamp = new Date().toLocaleString();

    // Store data in localStorage
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('businessName', businessName);
    localStorage.setItem('membershipLevel', membershipLevel);
    localStorage.setItem('timestamp', timestamp);

    // Redirect to thank you page
    window.location.href = 'thankyou.html';
  }
