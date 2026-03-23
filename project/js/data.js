let products = [];
let filteredProducts = [];
let cart = getCartFromStorage();

async function loadProducts() {
    const savedProducts = getProductsFromStorage();

    if (savedProducts.length > 0) {
        products = savedProducts;
        filteredProducts = [...products];
        initPage();
        return;
    }

    try {
        const response = await fetch("data/products.json");
        const data = await response.json();

        products = data;
        filteredProducts = [...products];

        saveProductsToStorage(products);
        initPage();
    } catch (error) {
        console.log("Помилка завантаження JSON:", error);
    }
}