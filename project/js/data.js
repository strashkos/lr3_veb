let products = [];
let categories = [];
let filteredProducts = [];
let cart = getCartFromStorage();

async function loadProducts() {
    const savedProducts = getProductsFromStorage();
    const savedCategories = getCategoriesFromStorage();

    if (savedProducts.length > 0) {
        products = savedProducts;
        categories = savedCategories.length > 0 ? savedCategories : collectUniqueCategories(products);
        filteredProducts = [...products];

        if (savedCategories.length === 0) {
            saveCategoriesToStorage(categories);
        }

        initPage();
        return;
    }

    try {
        const response = await fetch("data/product.json");

        if (!response.ok) {
            throw new Error("Не вдалося завантажити product.json");
        }

        const data = await response.json();

        products = Array.isArray(data) ? data : [];
        categories = collectUniqueCategories(products);
        filteredProducts = [...products];

        saveProductsToStorage(products);
        saveCategoriesToStorage(categories);
        initPage();
    } catch (error) {
        console.log("Помилка завантаження JSON:", error);

        products = [];
        categories = savedCategories.length > 0 ? savedCategories : [];
        filteredProducts = [];
        initPage();
    }
}