document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
            displayGallery(products);
            displayRecommendations(products);
        })
        .catch(error => console.error('Ошибка загрузки товаров:', error));

    document.getElementById('checkout').addEventListener('click', checkoutCart);
    document.getElementById('open-cart').addEventListener('click', openCart);
    document.querySelector('.close').addEventListener('click', closeCart);
    window.addEventListener('click', outsideClick);
});

let cart = [];

function displayProducts(products) {
    const container = document.querySelector('#product-container');
    container.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="images/${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Цена: $${product.price}</p>
            <button onclick="addToCart('${product.title}', ${product.price})">Купить</button>
        `;

        container.appendChild(productElement);
    });
}

function displayGallery(products) {
    const container = document.querySelector('#gallery-container');
    container.innerHTML = '';
    products.forEach(product => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
            <img src="images/${product.image}" alt="${product.title}">
        `;
        container.appendChild(galleryItem);
    });
}

function displayRecommendations(products) {
    const container = document.querySelector('#recommendations-container');
    container.innerHTML = '';

    // Simple recommendation logic for demonstration
    const recommendedProducts = products.slice(0, 3);

    recommendedProducts.forEach(product => {
        const recommendation = document.createElement('div');
        recommendation.classList.add('recommendation');

        recommendation.innerHTML = `
            <img src="images/${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
        `;

        container.appendChild(recommendation);
    });
}

function addToCart(title, price) {
    cart.push({ title, price });
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;

    const container = document.querySelector('#cart-container');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p>Ваша корзина пуста.</p>';
    } else {
        const ul = document.createElement('ul');
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price;
            const li = document.createElement('li');
            li.innerText = `${item.title} - $${item.price}`;
            ul.appendChild(li);
        });
        container.appendChild(ul);

        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.innerText = `Общая стоимость: $${totalPrice.toFixed(2)}`;
    }
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function outsideClick(event) {
    if (event.target == document.getElementById('cart-modal')) {
        closeCart();
    }
}

function checkoutCart() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
    } else {
        alert('Ваш заказ был успешно оформлен!');
        cart = [];
        updateCart();
        closeCart();
    }
}
