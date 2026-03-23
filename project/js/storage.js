function saveProductsToStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function getProductsFromStorage() {
    const data = localStorage.getItem("products");
    return data ? JSON.parse(data) : [];
}

function saveCartToStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartFromStorage() {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
}