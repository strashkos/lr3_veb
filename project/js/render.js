function renderCategories() {
    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;

    categorySelect.innerHTML = '<option value="all">Усі категорії</option>';

    const categories = [];

    for (let i = 0; i < products.length; i++) {
        if (!categories.includes(products[i].category)) {
            categories.push(products[i].category);
        }
    }

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

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(manufacturer);
        card.appendChild(price);
        card.appendChild(desc);
        card.appendChild(btn);

        productsList.appendChild(card);
    }
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