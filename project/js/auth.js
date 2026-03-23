function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i].trim();
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }

    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function loginAdmin() {
    const login = document.getElementById("adminLogin").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const message = document.getElementById("loginMessage");

    if (login === "admin" && password === "12345") {
        setCookie("adminAuth", "true", 1);
        message.textContent = "Вхід успішний.";
        checkAdminAccess();
    } else {
        message.textContent = "Неправильний логін або пароль.";
    }
}

function logoutAdmin() {
    deleteCookie("adminAuth");
    location.reload();
}

function checkAdminAccess() {
    const loginSection = document.getElementById("loginSection");
    const adminSection = document.getElementById("adminSection");

    if (!loginSection || !adminSection) return;

    if (getCookie("adminAuth") === "true") {
        loginSection.classList.add("hidden");
        adminSection.classList.remove("hidden");
        renderAdminProducts();
    } else {
        loginSection.classList.remove("hidden");
        adminSection.classList.add("hidden");
    }
}