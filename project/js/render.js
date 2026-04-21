function renderCategories() {
    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;

    categorySelect.innerHTML = '<option value="all">Усі категорії</option>';

    const categoriesList = getCategoriesFromStorage();
    const categories = categoriesList.length > 0 ? categoriesList : collectUniqueCategories(products);

    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement("option");
        option.value = categories[i];
        option.textContent = categories[i];
        categorySelect.appendChild(option);
    }
}

function renderProducts(list) {
    const productsList = document.getElementById("productsList");
    if (!productsList) return;

    productsList.innerHTML = "";

    if (list.length === 0) {
        productsList.innerHTML = "<p>Товари не знайдені.</p>";
        return;
    }

    for (let i = 0; i < list.length; i++) {
        const product = list[i];

        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const title = document.createElement("h3");
        title.textContent = product.name;

        const category = document.createElement("p");
        category.textContent = "Категорія: " + product.category;

        const manufacturer = document.createElement("p");
        manufacturer.textContent = "Виробник: " + product.manufacturer;

        const price = document.createElement("p");
        price.textContent = "Ціна: " + product.price + " грн";

        const desc = document.createElement("p");
        desc.textContent = product.description;

        const btn = document.createElement("button");
        btn.textContent = "Додати в корзину";
        btn.addEventListener("click", function () {
            addToCart(product.id);
        });

        const detailsBtn = document.createElement("button");
        detailsBtn.textContent = "Детальніше";
        detailsBtn.addEventListener("click", function () {
            showProductDetails(product.id);
        });

        const actions = document.createElement("div");
        actions.className = "product-actions";

        actions.appendChild(btn);
        actions.appendChild(detailsBtn);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(manufacturer);
        card.appendChild(price);
        card.appendChild(desc);
        card.appendChild(actions);

        productsList.appendChild(card);
    }

    const details = document.getElementById("productDetails");
    if (details) {
        if (list.length > 0) {
            showProductDetails(list[0].id);
        } else {
            details.innerHTML = "<p>Товари не знайдені.</p>";
        }
    }
}

function showProductDetails(productId) {
    const details = document.getElementById("productDetails");
    if (!details) return;

    let selectedProduct = null;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            selectedProduct = products[i];
            break;
        }
    }

    if (!selectedProduct) {
        details.innerHTML = "<p>Оберіть товар для перегляду деталей.</p>";
        return;
    }

    details.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "product-details-card";

    const image = document.createElement("img");
    image.src = selectedProduct.image;
    image.alt = selectedProduct.name;

    const info = document.createElement("div");
    info.className = "product-details-info";

    const title = document.createElement("h3");
    title.textContent = selectedProduct.name;

    const category = document.createElement("p");
    category.textContent = "Категорія: " + selectedProduct.category;

    const manufacturer = document.createElement("p");
    manufacturer.textContent = "Виробник: " + selectedProduct.manufacturer;

    const price = document.createElement("p");
    price.textContent = "Ціна: " + selectedProduct.price + " грн";

    const description = document.createElement("p");
    description.textContent = selectedProduct.description;

    const addButton = document.createElement("button");
    addButton.textContent = "Додати в корзину";
    addButton.addEventListener("click", function () {
        addToCart(selectedProduct.id);
    });

    info.appendChild(title);
    info.appendChild(category);
    info.appendChild(manufacturer);
    info.appendChild(price);
    info.appendChild(description);
    info.appendChild(addButton);

    wrapper.appendChild(image);
    wrapper.appendChild(info);
    details.appendChild(wrapper);
}

function renderCart() {
    const cartList = document.getElementById("cartList");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartList || !cartTotal) return;

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Корзина порожня.</p>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    const clearButton = document.createElement("button");
    clearButton.textContent = "Очистити корзину";
    clearButton.className = "clear-cart-btn";
    clearButton.addEventListener("click", clearCart);

    cartList.appendChild(clearButton);

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];

        const div = document.createElement("div");
        div.className = "cart-item";

        const text = document.createElement("p");
        text.textContent = item.name + " x " + item.quantity + " = " + (item.price * item.quantity) + " грн";

        const btn = document.createElement("button");
        btn.textContent = "Видалити";
        btn.addEventListener("click", function () {
            removeFromCart(item.id);
        });

        div.appendChild(text);
        div.appendChild(btn);

        cartList.appendChild(div);

        total += item.price * item.quantity;
    }

    cartTotal.textContent = total;
}