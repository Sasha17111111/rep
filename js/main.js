async function getProducts() {
    const response = await fetch('products.json')
    const data = await response.json();

    return data;
}

getProducts().then(function(products) {
    let productsList = document.querySelector('.products-list')

    if(productsList) {
        products.forEach(product => {
            productsList.innerHTML += getProductHtml(product);
        });
    }
})
function getProductHtml(product) { 
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100">
                <img src="images/${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                </div>
                <div class="card-footer">
                    <span class="text-primary">$${product.price}</span>
                </div>
            </div>
        </div>
    `;
}
async function getProducts() {
    const response = await fetch('products.json');
    const data = await response.json();
    return data;
}

getProducts().then(function(products) {
    let productsList = document.querySelector('.products-list');

    if(productsList) {
        products.forEach(product => {
            productsList.innerHTML += getProductHtml(product);
        });
    }
});
