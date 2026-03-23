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
        editBtn.onclick = function () {
            fillForm(product.id);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Видалити";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function () {
            deleteProduct(product.id);
        };

        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(editBtn);
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
    renderAdminProducts();
}

function saveProduct(event) {
    event.preventDefault();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const manufacturer = document.getElementById("productManufacturer").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const image = document.getElementById("productImage").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    let currentProducts = getProductsFromStorage();

    if (id === "") {
        const newProduct = {
            id: Date.now(),
            name: name,
            category: category,
            manufacturer: manufacturer,
            price: price,
            image: image,
            description: description
        };

        currentProducts.push(newProduct);
    } else {
        for (let i = 0; i < currentProducts.length; i++) {
            if (currentProducts[i].id == id) {
                currentProducts[i].name = name;
                currentProducts[i].category = category;
                currentProducts[i].manufacturer = manufacturer;
                currentProducts[i].price = price;
                currentProducts[i].image = image;
                currentProducts[i].description = description;
                break;
            }
        }
    }

    saveProductsToStorage(currentProducts);
    document.getElementById("productForm").reset();
    document.getElementById("productId").value = "";
    renderAdminProducts();
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
});