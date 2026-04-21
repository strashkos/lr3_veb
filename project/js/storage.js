function saveProductsToStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function saveCategoriesToStorage(categories) {
    localStorage.setItem("categories", JSON.stringify(categories));
}

function getProductsFromStorage() {
    const data = localStorage.getItem("products");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("Помилка читання products з localStorage:", error);
        localStorage.removeItem("products");
        return [];
    }
}

function getCategoriesFromStorage() {
    const data = localStorage.getItem("categories");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("Помилка читання categories з localStorage:", error);
        localStorage.removeItem("categories");
        return [];
    }
}

function collectUniqueCategories(products) {
    const categories = [];

    for (let i = 0; i < products.length; i++) {
        const category = products[i].category;

        if (category && !categories.includes(category)) {
            categories.push(category);
        }
    }

    return categories;
}

function saveCartToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveUsersToStorage(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getUsersFromStorage() {
    const data = localStorage.getItem("users");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("Помилка читання users з localStorage:", error);
        localStorage.removeItem("users");
        return [];
    }
}

function saveOrdersToStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

function getOrdersFromStorage() {
    const data = localStorage.getItem("orders");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("Помилка читання orders з localStorage:", error);
        localStorage.removeItem("orders");
        return [];
    }
}

function getCartFromStorage() {
    const data = localStorage.getItem("cart");

    if (!data) {
        return [];
    }

    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.log("Помилка читання cart з localStorage:", error);
        localStorage.removeItem("cart");
        return [];
    }
}