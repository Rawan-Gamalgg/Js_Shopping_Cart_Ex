
//DOM elements
var inputName = document.getElementById("product_name");
var inputPrice = document.getElementById("product_price");
var inputQuantity = document.getElementById("product_quantity");
var addBtn = document.getElementById("addProduct_btn");
var container = document.getElementById("product_container");

// Default products
var defaultProducts = [
    {
        id: 1,
        name: "product_1",
        price: 500,
        quantity: 1,
        desc: ""
    }
];

// Storage Functions
function saveToLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products))
}

function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');

    if (!storedProducts || storedProducts === 'undefined') {
        return null;
    }
    try {
        return JSON.parse(storedProducts);
    } catch (e) {
        console.error("Failed to parse products from storage", e);
        return null;
    }
};

// Initialize products 
var products = (function () {
    // Clear any invalid data
    if (!localStorage.getItem('products')) {//undefined or null
        localStorage.removeItem('products');

    }

    const loadedProducts = loadFromLocalStorage();
    return loadedProducts !== null ? loadedProducts : defaultProducts;
})();

// Save defaults products to local storage if storage was empty
if (!loadFromLocalStorage() ||
    JSON.parse(localStorage.getItem('products')).length === 0
) {
    saveToLocalStorage(defaultProducts);

}

// Display Functions
function displayData(items) {
    product_container.innerHTML = "";
    if(items.length === 0){
        product_container.innerHTML = "<p>Your Cart is Empty!. Please add some products.</p>";
        return;
    }
    items.forEach(function (item) {
        product_container.innerHTML += `
            <div class="product-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>
                Quantity: 
                <button onclick='changeQuantity(${item.id}, -1)'>-</button>
                ${item.quantity}
                <button onclick='changeQuantity(${item.id}, 1)'>+</button>
                </p>
                 <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                <p>${item.desc ? item.desc : ''}</p>
                <button class='delete_product' onclick='deleteProduct(${item.id})'>
                Delete
                </button>
            </div>`;
    });
}



// Event Handlers
//Displays products when the page finishes loading
// This ensures that the products are displayed even if the page is refreshed.
window.onload = function () {
    displayData(products);
    inputName.focus();
};

// Add Product Event
addBtn.addEventListener('click', addProduct);
inputQuantity.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addProduct();
    }
})

function addProduct() {
    //validate the inputs
    var productName = inputName.value.trim();
    if (productName === "") {
        alert("Please enter the product name");
        inputName.focus(); // Puts cursor back in the name field
        return;
    }

    const productPrice = parseFloat(inputPrice.value.trim());
    if (isNaN(productPrice) || productPrice <= 0) {
        alert("Please enter a valid positive price");
        inputPrice.focus();
        return;
    }
    const productQuantity = parseInt(inputQuantity.value.trim());
    if (isNaN(productQuantity) || productQuantity < 1) {
        alert("Quantity must be at least 1");
        inputQuantity.focus();
        return;

    }
    const productExists = products.find(p =>
         p.name.toLowerCase() === productName.toLowerCase() && p.price === productPrice);
    if (productExists) {
        if (confirm("Product already exists! Update quantity instead?")) {
            // If the product already exists, update its quantity
            productExists.quantity += productQuantity;
            saveToLocalStorage(products);
            displayData(products);
        }
        return;
    }
    // Find the next available ID
    // If you have gaps in IDs, this will still work as it finds the max ID and adds 1.
    var newProductId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
    //add the new product
    products.push({
        id: newProductId,
        name: productName,
        price: productPrice,
        desc: "",
        quantity: productQuantity
    });

    saveToLocalStorage(products);
    displayData(products);

    //clear inputs
    inputName.value = "";
    inputPrice.value = "";
    inputQuantity.value = "1";
    alert(`${productName} added successfully!`);
    inputName.focus(); // put cursor back in name field
};

//change the product quantity
function changeQuantity(id, change) {
    //find the product with id
    const product = products.find(p => p.id === id);
    const newQuantity = product.quantity + change;
    // if the new quantity is 0 or less, then don't change 
    if (newQuantity < 1) return;
    product.quantity = newQuantity;
    saveToLocalStorage(products);
    displayData(products);
}
//delete product
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        // if product with given ID exists, filter it out
        products = products.filter(product => product.id !== id);
        saveToLocalStorage(products);
        displayData(products);
    }

}
// Add clear all button functionality
// Function to clear all products
function clearAllProducts() {
    if (confirm("Are you sure you want to delete all products?")) {
        products = [];
        saveToLocalStorage(products);
        displayData(products);
    }
}

var clearAllBtn = document.getElementById("clearAll_btn");
clearAllBtn.addEventListener('click', clearAllProducts);

