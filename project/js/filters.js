function filterProducts() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase().trim();
    const categoryValue = document.getElementById("categorySelect").value;

    filteredProducts = products.filter(function (product) {
        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.manufacturer.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "all" || product.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    renderProducts(filteredProducts);
}

function resetFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("categorySelect").value = "all";
    filteredProducts = [...products];
    renderProducts(filteredProducts);
}