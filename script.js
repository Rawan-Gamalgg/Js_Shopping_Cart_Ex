var input = document.getElementById('product_input');
var addBtn = document.getElementById('addProduct_btn');
var product_container = document.getElementById('product_container');

function saveProductsToStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProductsFromStorage() {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : null;
}

var products = loadProductsFromStorage() || [
    {
        id: 1,
        name: "product_1",
        price: 500,
        desc: ""
    },
    {
        id: 2,
        name: "product_2",
        price: 450,
        desc: ""
    },
    {
        id: 3,
        name: "product_3",
        price: 1500,
        desc: ""
    },
    {
        id: 4,
        name: "product_4",
        price: 730,
        desc: ""
    }
];

// Save initial products if none were loaded
if (!loadProductsFromStorage()) {
    saveProductsToStorage();
}

//Display Data
function displayData(items) {
    product_container.innerHTML = "";
    items.forEach(function(item) {
        product_container.innerHTML += `
            <div class="product-item">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>${item.desc? item.desc : ''}</p>
                <button class='delete_product' onclick='deleteProduct(${item.id})'> 
                    Delete 
                </button>
            </div>`;
    });
}


//display the Data only if page loaded
window.onload = function () {
    displayData(products);
};

//Add Product
addBtn.addEventListener('click', addProduct);
function addProduct() {
    if (input.value == "") {
        alert("You Should enter a name for the product to add");
    } else {
        var lastProductId = products.length ? products[products.length - 1].id : 0;
        var newProductId = lastProductId + 1;

        products.push({ 
            id: newProductId, 
            name: input.value,
            price: 0,       // Default price
            desc: ""        // Default description
        });
        
        //saveProductsToStorage();  // Save to localStorage
        displayData(products);
        input.value = "";
    }
}
//Delete product
function deleteProduct(id) {
    var index = products.map(function(product) {
        return product.id;
    }).indexOf(id);
    
    if (index !== -1) {
        products.splice(index, 1);
        saveProductsToStorage();  // Save to localStorage
        displayData(products);
    }
}






