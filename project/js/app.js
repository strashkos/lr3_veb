function showInfo() {
    alert("Ласкаво просимо до магазину будівельних інструментів!");
}

function initPage() {
    renderCategories();
    renderProducts(filteredProducts);
    renderCart();

    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const resetBtn = document.getElementById("resetBtn");
    const orderForm = document.getElementById("orderForm");

    if (searchInput) {
        searchInput.oninput = filterProducts;
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", filterProducts);
    }

    if (resetBtn) {
        resetBtn.onclick = resetFilters;
    }

    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();
            checkout();
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});