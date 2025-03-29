    const params = new URLSearchParams(window.location.search);
    document.getElementById("name-output").textContent = params.get("first-name") + " " + params.get("last-name");
    document.getElementById("membership-output").textContent = params.get("membership-level");
    document.getElementById("email-output").textContent = params.get("email");
