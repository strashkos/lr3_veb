function getProductFormValues() {
    return {
        id: document.getElementById("productId").value,
        name: document.getElementById("productName").value.trim(),
        category: document.getElementById("productCategory").value.trim(),
        manufacturer: document.getElementById("productManufacturer").value.trim(),
        price: Number(document.getElementById("productPrice").value),
        image: document.getElementById("productImage").value.trim(),
        description: document.getElementById("productDescription").value.trim()
    };
}

function validateProductForm(values) {
    if (values.name.length < 2) {
        return "Вкажіть назву товару.";
    }

    if (values.category.length < 2) {
        return "Вкажіть категорію товару.";
    }

    if (values.manufacturer.length < 2) {
        return "Вкажіть виробника.";
    }

    if (!Number.isFinite(values.price) || values.price <= 0) {
        return "Вкажіть коректну ціну.";
    }

    if (values.image.length < 3) {
        return "Вкажіть шлях до зображення.";
    }

    return "";
}

function ensureStoredCategories(currentProducts) {
    let currentCategories = getCategoriesFromStorage();

    if (currentCategories.length === 0) {
        currentCategories = collectUniqueCategories(currentProducts);
        saveCategoriesToStorage(currentCategories);
    }

    return currentCategories;
}

function renderAdminProducts() {
    const list = document.getElementById("adminProductsList");
    if (!list) return;

    const currentProducts = getProductsFromStorage();
    list.innerHTML = "";

    if (currentProducts.length === 0) {
        list.innerHTML = "<p>Товарів немає.</p>";
        return;
    }

    for (let i = 0; i < currentProducts.length; i++) {
        const product = currentProducts[i];

        const card = document.createElement("div");
        card.className = "admin-card";

        const title = document.createElement("h4");
        title.textContent = product.name;

        const info = document.createElement("p");
        info.textContent =
            "Категорія: " + product.category +
            " | Виробник: " + product.manufacturer +
            " | Ціна: " + product.price + " грн";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Редагувати";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", function () {
            fillForm(product.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Видалити";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
            deleteProduct(product.id);
        });

        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(editBtn);
        card.appendChild(deleteBtn);

        list.appendChild(card);
    }
}

function renderAdminCategories() {
    const list = document.getElementById("adminCategoriesList");
    if (!list) return;

    const currentProducts = getProductsFromStorage();
    const currentCategories = ensureStoredCategories(currentProducts);

    list.innerHTML = "";

    if (currentCategories.length === 0) {
        list.innerHTML = "<p>Категорій немає.</p>";
        return;
    }

    for (let i = 0; i < currentCategories.length; i++) {
        const category = currentCategories[i];
        const count = currentProducts.filter(function (product) {
            return product.category === category;
        }).length;

        const card = document.createElement("div");
        card.className = "admin-card admin-category-card";

        const title = document.createElement("h4");
        title.textContent = category;

        const info = document.createElement("p");
        info.textContent = "Товарів у категорії: " + count;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Видалити категорію";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function () {
            deleteCategory(category);
        });

        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(deleteBtn);

        list.appendChild(card);
    }
}

function fillForm(id) {
    const currentProducts = getProductsFromStorage();

    for (let i = 0; i < currentProducts.length; i++) {
        if (currentProducts[i].id === id) {
            document.getElementById("productId").value = currentProducts[i].id;
            document.getElementById("productName").value = currentProducts[i].name;
            document.getElementById("productCategory").value = currentProducts[i].category;
            document.getElementById("productManufacturer").value = currentProducts[i].manufacturer;
            document.getElementById("productPrice").value = currentProducts[i].price;
            document.getElementById("productImage").value = currentProducts[i].image;
            document.getElementById("productDescription").value = currentProducts[i].description;
            break;
        }
    }
}

function deleteProduct(id) {
    let currentProducts = getProductsFromStorage();
    currentProducts = currentProducts.filter(function (product) {
        return product.id !== id;
    });

    saveProductsToStorage(currentProducts);
    ensureStoredCategories(currentProducts);
    renderAdminProducts();
    renderAdminCategories();
}

function saveProduct(event) {
    event.preventDefault();

    const values = getProductFormValues();
    const validationMessage = validateProductForm(values);

    if (validationMessage !== "") {
        alert(validationMessage);
        return;
    }

    let currentProducts = getProductsFromStorage();
    let currentCategories = ensureStoredCategories(currentProducts);

    if (values.id === "") {
        const newProduct = {
            id: Date.now(),
            name: values.name,
            category: values.category,
            manufacturer: values.manufacturer,
            price: values.price,
            image: values.image,
            description: values.description
        };

        currentProducts.push(newProduct);
    } else {
        for (let i = 0; i < currentProducts.length; i++) {
            if (currentProducts[i].id == values.id) {
                currentProducts[i].name = values.name;
                currentProducts[i].category = values.category;
                currentProducts[i].manufacturer = values.manufacturer;
                currentProducts[i].price = values.price;
                currentProducts[i].image = values.image;
                currentProducts[i].description = values.description;
                break;
            }
        }
    }

    if (!currentCategories.includes(values.category)) {
        currentCategories.push(values.category);
    }

    saveProductsToStorage(currentProducts);
    saveCategoriesToStorage(currentCategories);
    document.getElementById("productForm").reset();
    document.getElementById("productId").value = "";
    renderAdminProducts();
    renderAdminCategories();
}

function saveCategory(event) {
    event.preventDefault();

    const input = document.getElementById("categoryName");
    const categoryName = input.value.trim();

    if (categoryName.length < 2) {
        alert("Вкажіть назву категорії.");
        return;
    }

    const currentCategories = ensureStoredCategories(getProductsFromStorage());

    if (currentCategories.includes(categoryName)) {
        alert("Така категорія вже існує.");
        return;
    }

    currentCategories.push(categoryName);
    saveCategoriesToStorage(currentCategories);
    input.value = "";
    renderAdminCategories();
}

function deleteCategory(categoryName) {
    const fallbackCategory = "Без категорії";
    let currentCategories = ensureStoredCategories(getProductsFromStorage());
    let currentProducts = getProductsFromStorage();

    if (categoryName === fallbackCategory && currentCategories.includes(fallbackCategory)) {
        alert("Категорію 'Без категорії' не можна видалити, поки вона використовується як запасна.");
        return;
    }

    const usedByProducts = currentProducts.some(function (product) {
        return product.category === categoryName;
    });

    if (usedByProducts) {
        const confirmed = confirm("Категорія використовується товарами. Переназначити їх на 'Без категорії'?");

        if (!confirmed) {
            return;
        }

        currentProducts = currentProducts.map(function (product) {
            if (product.category === categoryName) {
                return {
                    id: product.id,
                    name: product.name,
                    category: fallbackCategory,
                    manufacturer: product.manufacturer,
                    price: product.price,
                    image: product.image,
                    description: product.description
                };
            }

            return product;
        });

        if (!currentCategories.includes(fallbackCategory)) {
            currentCategories.push(fallbackCategory);
        }
    }

    currentCategories = currentCategories.filter(function (item) {
        return item !== categoryName;
    });

    if (currentCategories.length === 0) {
        currentCategories.push(fallbackCategory);
    }

    saveProductsToStorage(currentProducts);
    saveCategoriesToStorage(currentCategories);
    renderAdminProducts();
    renderAdminCategories();
}

document.addEventListener("DOMContentLoaded", function () {
    checkAdminAccess();

    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.onclick = loginAdmin;
    }

    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", saveProduct);
    }

    const categoryForm = document.getElementById("categoryForm");
    if (categoryForm) {
        categoryForm.addEventListener("submit", saveCategory);
    }
});