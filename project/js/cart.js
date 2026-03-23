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

function checkout() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const receipt = document.getElementById("receipt");

    if (name === "" || phone === "") {
        alert("Заповніть ім'я та телефон.");
        return;
    }

    if (cart.length === 0) {
        alert("Корзина порожня.");
        return;
    }

    let text = "ЧЕК\n";
    text += "Покупець: " + name + "\n";
    text += "Телефон: " + phone + "\n\n";
    text += "Товари:\n";

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        text += cart[i].name + " x " + cart[i].quantity + " = " + (cart[i].price * cart[i].quantity) + " грн\n";
        total += cart[i].price * cart[i].quantity;
    }

    text += "\nЗагальна сума: " + total + " грн";

    receipt.textContent = text;

    clearCart();
    document.getElementById("orderForm").reset();
}