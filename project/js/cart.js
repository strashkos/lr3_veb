function addToCart(productId) {
    let product = null;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }

    if (!product) return;

    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCartToStorage(cart);
    renderCart();
}

function removeFromCart(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart.splice(i, 1);
            break;
        }
    }

    saveCartToStorage(cart);
    renderCart();
}

function clearCart() {
    cart = [];
    saveCartToStorage(cart);
    renderCart();
}

function validateCheckoutForm(data) {
    if (!data.name || data.name.length < 2) {
        return "Вкажіть коректне ім'я.";
    }

    if (!/^\+?[0-9\s()-]{10,}$/.test(data.phone)) {
        return "Вкажіть коректний номер телефону.";
    }

    if (!data.city || data.city.length < 2) {
        return "Вкажіть місто.";
    }

    if (!data.postOffice) {
        return "Оберіть пошту.";
    }

    if (!data.address || data.address.length < 5) {
        return "Вкажіть адресу доставки.";
    }

    if (!data.paymentType) {
        return "Оберіть тип оплати.";
    }

    return "";
}

function renderReceipt(order) {
    const receipt = document.getElementById("receipt");
    if (!receipt) return;

    receipt.innerHTML = "";

    const title = document.createElement("h4");
    title.textContent = "Чек";

    const meta = document.createElement("p");
    meta.textContent = "Дата: " + order.date;

    const customer = document.createElement("div");
    customer.className = "receipt-block";
    customer.innerHTML =
        "<p><strong>Покупець:</strong> " + order.name + "</p>" +
        "<p><strong>Телефон:</strong> " + order.phone + "</p>" +
        "<p><strong>Місто:</strong> " + order.city + "</p>" +
        "<p><strong>Пошта:</strong> " + order.postOffice + "</p>" +
        "<p><strong>Адреса:</strong> " + order.address + "</p>" +
        "<p><strong>Оплата:</strong> " + order.paymentType + "</p>";

    const listTitle = document.createElement("h5");
    listTitle.textContent = "Замовлення";

    const items = document.createElement("div");
    items.className = "receipt-items";

    for (let i = 0; i < order.items.length; i++) {
        const row = document.createElement("p");
        row.textContent = order.items[i].name + " x " + order.items[i].quantity + " = " + (order.items[i].price * order.items[i].quantity) + " грн";
        items.appendChild(row);
    }

    const total = document.createElement("p");
    total.className = "receipt-total";
    total.textContent = "Загальна сума: " + order.total + " грн";

    receipt.appendChild(title);
    receipt.appendChild(meta);
    receipt.appendChild(customer);
    receipt.appendChild(listTitle);
    receipt.appendChild(items);
    receipt.appendChild(total);
}

function saveOrderHistory(order) {
    const orders = getOrdersFromStorage();
    orders.unshift(order);
    saveOrdersToStorage(orders);
}

function checkout() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const post = document.getElementById("postOffice").value;
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentType").value;

    const validationMessage = validateCheckoutForm({
        name: name,
        phone: phone,
        city: city,
        postOffice: post,
        address: address,
        paymentType: payment
    });

    if (validationMessage !== "") {
        alert(validationMessage);
        return;
    }

    if (cart.length === 0) {
        alert("Корзина порожня.");
        return;
    }

    let total = 0;
    const orderItems = [];
    const userEmail = typeof getCookie === "function" ? getCookie("userAuth") : "";
    const userName = typeof getCookie === "function" ? getCookie("userName") : "";

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
        orderItems.push({
            name: cart[i].name,
            price: cart[i].price,
            quantity: cart[i].quantity
        });
    }

    const order = {
        id: Date.now(),
        userEmail: userEmail,
        userName: userName,
        date: new Date().toLocaleString("uk-UA"),
        customerName: name,
        phone: phone,
        city: city,
        postOffice: post,
        address: address,
        paymentType: payment,
        items: orderItems,
        total: total
    };

    if (userEmail !== "") {
        saveOrderHistory(order);
    }

    renderReceipt({
        date: order.date,
        name: name,
        phone: phone,
        city: city,
        postOffice: post,
        address: address,
        paymentType: payment,
        items: orderItems,
        total: total
    });

    clearCart();
    document.getElementById("orderForm").reset();
}