function getCurrentUserSession() {
    return {
        email: getCookie("userAuth"),
        name: getCookie("userName")
    };
}

function findUserByEmail(email) {
    const users = getUsersFromStorage();
    const normalizedEmail = email.toLowerCase();

    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === normalizedEmail) {
            return users[i];
        }
    }

    return null;
}

function validateUserForm(name, email, password) {
    if (name.length < 2) {
        return "Вкажіть ім'я.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return "Вкажіть коректний email.";
    }

    if (password.length < 4) {
        return "Пароль має містити мінімум 4 символи.";
    }

    return "";
}

function setUserSession(user) {
    setCookie("userAuth", user.email, 7);
    setCookie("userName", user.name, 7);
}

function clearUserSession() {
    deleteCookie("userAuth");
    deleteCookie("userName");
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document.getElementById("registerConfirmPassword").value.trim();
    const message = document.getElementById("registerMessage");

    const validationMessage = validateUserForm(name, email, password);
    if (validationMessage !== "") {
        message.textContent = validationMessage;
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Паролі не співпадають.";
        return;
    }

    if (findUserByEmail(email)) {
        message.textContent = "Користувач з таким email вже існує.";
        return;
    }

    const users = getUsersFromStorage();
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    users.push(user);
    saveUsersToStorage(users);
    setUserSession(user);
    message.textContent = "Реєстрацію успішно виконано.";

    document.getElementById("registerForm").reset();
    updateUserView();
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {
        message.textContent = "Введіть email і пароль.";
        return;
    }

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
        message.textContent = "Невірний email або пароль.";
        return;
    }

    setUserSession(user);
    message.textContent = "Вхід успішний.";
    document.getElementById("loginForm").reset();
    updateUserView();
}

function logoutUser() {
    clearUserSession();
    location.reload();
}

function renderUserOrders(email) {
    const list = document.getElementById("userOrdersList");
    if (!list) return;

    const orders = getOrdersFromStorage().filter(function (order) {
        return order.userEmail === email;
    });

    list.innerHTML = "";

    if (orders.length === 0) {
        list.innerHTML = "<p>Поки що немає оформлених замовлень.</p>";
        return;
    }

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const card = document.createElement("div");
        card.className = "user-order-card";

        const title = document.createElement("h4");
        title.textContent = "Замовлення №" + order.id;

        const meta = document.createElement("p");
        meta.textContent = "Дата: " + order.date + " | Сума: " + order.total + " грн";

        const items = document.createElement("p");
        const names = [];
        for (let j = 0; j < order.items.length; j++) {
            names.push(order.items[j].name + " x " + order.items[j].quantity);
        }
        items.textContent = "Товари: " + names.join(", ");

        card.appendChild(title);
        card.appendChild(meta);
        card.appendChild(items);
        list.appendChild(card);
    }
}

function updateUserView() {
    const session = getCurrentUserSession();
    const authSection = document.getElementById("authSection");
    const accountSection = document.getElementById("accountSection");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    if (!authSection || !accountSection) return;

    if (session.email !== "") {
        authSection.classList.add("hidden");
        accountSection.classList.remove("hidden");

        if (profileName) {
            profileName.textContent = session.name;
        }

        if (profileEmail) {
            profileEmail.textContent = session.email;
        }

        renderUserOrders(session.email);
        return;
    }

    authSection.classList.remove("hidden");
    accountSection.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const logoutBtn = document.getElementById("logoutUserBtn");

    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
    }

    updateUserView();
});