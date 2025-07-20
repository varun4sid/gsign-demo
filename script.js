function decodeJwtResponse(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );
    return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
    const userObject = decodeJwtResponse(response.credential);

    document.getElementById("name").textContent = userObject.name;
    document.getElementById("email").textContent = userObject.email;
    document.getElementById("picture").src = userObject.picture;

    document.getElementById("user-info").style.display = "block";
}
