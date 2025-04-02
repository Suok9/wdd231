
 
    // Retrieve data from localStorage
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const businessName = localStorage.getItem('businessName');
    const membershipLevel = localStorage.getItem('membershipLevel');
    const timestamp = localStorage.getItem('timestamp');

    // Display data in the thank you page
    document.getElementById('name-output').textContent = `${firstName} ${lastName}`;
    document.getElementById('membership-output').textContent = membershipLevel;
    document.getElementById('email-output').textContent = email;
    document.getElementById('phone-output').textContent = phone;
    document.getElementById('business-output').textContent = businessName;
    document.getElementById('timestamp-output').textContent = timestamp;
  