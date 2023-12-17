import {ProductStorageManager} from "../../../utils/managers/product_storage_manager.js";
import {CartStorageManager} from "../../../utils/managers/cart_storage_manager.js";

let productStorageManager = new ProductStorageManager();

// Getting product id
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');
const userEmail = urlParams.get('userEmail');
// Get the product
let product = productStorageManager.getProductById(productId);

let cartManager = new CartStorageManager();


window.addEventListener("load", function () {

    let productNameElement = document.querySelector(".product-info-h");
    let productInfoElement = document.querySelector(".product-info-p");
    let productPriceElement = document.querySelector(".price-p");

    let mainImageElement = document.querySelector(".main-img");
    let imagesCollection = document.querySelectorAll(".gallery-img")

    let addToCartButton = document.querySelector("button");
    let backArrowButton = document.querySelector(".back-to-list");

    backArrowButton.onclick = function () {
        window.location.href = "index.html?userEmail=" + userEmail;

    }

    mainImageElement.src = product.image;
    for (let i = 0; i < imagesCollection.length; i++) {
        imagesCollection[i].src = product.collection[i];
    }

    imagesCollection.forEach(image=>{
        image.addEventListener('click',function (){
            let temp = mainImageElement.src;
            mainImageElement.src=image.src;
            image.src=temp;
        })
    })

    productNameElement.textContent = product.name;
    productInfoElement.textContent = product.description;
    productPriceElement.textContent = `price : ${product.price}$`;

    addToCartButton.onclick=function () {
        if(userEmail  !== "null"){
            console.log(userEmail)
            cartManager.addProduct(product);
        }else {
            console.log("navigate");
            window.location.href = "../../registration/presentation/login_page.html";
        }
    };
})