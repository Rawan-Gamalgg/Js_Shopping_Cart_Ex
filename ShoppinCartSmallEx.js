var input = document.getElementById('product_input');
var addBtn = document.getElementById('addProduct_btn');
var product_container = document.getElementById('product_container');

var products = [
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


//Display Data
function displayData(items) {
    product_container.innerHTML = "";
    items.forEach(function (item) {
        //ecmascript Template literals 
        product_container.innerHTML +=
            `<div> ${item.name}</div>
    <button class='delete_product' onclick='deleteProduct(${item.id})'> 
    Delete 
    </button>`;

    });
};


//display the Data only if page loaded
window.onload = function () {
    displayData(products);
};

//Add Product
addBtn.addEventListener('click', addProduct);
function addProduct() {
    //validate if the input is empty
    if (input.value == "") alert("You Should enter a name for the product to add");
    else {
        //add new product
        //check if products array is empty
        var lastProductId = products.length ? products[products.length - 1].id : 0;
        var newProductId = lastProductId + 1;

        products.push({ id: newProductId, name: input.value });
        var newProduct = products[lastProductId];

        //display the added product
        product_container.innerHTML +=
            `<div> ${newProduct.name}</div>
    <button class='delete_product' id='${newProduct.id}' onclick='deleteProduct(${newProduct.id})'> 
    Delete 
    </button>`;

        input.value = "";


    }

}
//Delete a product
//when delete button is clicked 
//delete the product with id = from products array
function deleteProduct(id) {
    //define an array that holds the existing products id's
    var index = products.map(function (product) {
        return product.id;
    });

    //check if the id of the product we want to delete is in the existing products
    if (index.indexOf(id) != -1) {
        products.splice(index.indexOf(id), 1);
        displayData(products);
        window.onload = function () {
            displayData(products);
        };
    }


}


