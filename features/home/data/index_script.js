import * as func from "../../../utils/helper/functions.js";
import {ProductModel} from "./models/product_model.js";
import {ProductStorageManager} from "../../../utils/managers/product_storage_manager.js";
import * as data from "../../../utils/helper/constants.js";
import {UserStorageManager} from "../../../utils/managers/user_storage_manager.js";


let userStorageManager = new UserStorageManager();

let productStorageManager = new ProductStorageManager();
const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('userEmail');


const products = [
    new ProductModel(1, "White Chair 1", 10, data.IMAGE_1, data.PRODUCT_DESCRIPTION_1, data.IMAGES_COLLECTION_1),
    new ProductModel(2, "Couch 2", 20, data.IMAGE_2, data.PRODUCT_DESCRIPTION_2, data.IMAGES_COLLECTION_2),
    new ProductModel(3, "Long Table ", 30, data.IMAGE_3, data.PRODUCT_DESCRIPTION_3, data.IMAGES_COLLECTION_3),
    new ProductModel(4, "Modern Table", 40, data.IMAGE_4, data.PRODUCT_DESCRIPTION_4, data.IMAGES_COLLECTION_4),
    new ProductModel(5, "Chair", 50, data.IMAGE_5, data.PRODUCT_DESCRIPTION_5, data.IMAGES_COLLECTION_5)
];

products.forEach(product => {
    const existingProduct = productStorageManager.getProductById(product.id);

    if (!existingProduct) {
        productStorageManager.addProduct(product);
        console.log("Added product:", product);
    } else {
        console.log("Product already exists:", existingProduct);
    }
});
window.addEventListener("load", function () {
    let dashboardButton = document.querySelector('#dashboard-button');
    let loginButton = document.querySelector('#login-button');
    const contactUsLink = document.querySelector('.nav_header-content li:nth-child(3)');
    const aboutUsLink = document.querySelector('.nav_header-content li:nth-child(5)');
    const cartIcon = document.querySelector('#cart-icon');

    cartIcon.addEventListener('click', function () {
        window.location.href = "../../cart/presentation/cart.html?userEmail=" + userEmail;
    });

    contactUsLink.onclick = function() {
        window.location.href = "../../contact_us/presentation/contact_us.html?userEmail=" + userEmail;
    };

    aboutUsLink.onclick = function() {
        window.location.href = "../../about-us/presentation/about-us.html?userEmail=" + userEmail;
    };

    if(userEmail!==null && userEmail !== "null"){
        loginButton.style.display="none";
    }

    loginButton.addEventListener('click',function (){
        window.location.href = '../../registration/presentation/login_page.html';
    })
    dashboardButton.addEventListener('click', function () {
        window.location.href = '../../dashboard/presentation/dashboard.html';
    })

    //bn5fy el dashboard button
    if (userEmail !== data.ADMIN_EMAIL) {
        dashboardButton.style.display = "none";
    }
    let productView = document.querySelector(".products_view");
    productStorageManager.getProducts().forEach(product => {
        const productElement = func.createProductElement(product,userEmail);
        productView.appendChild(productElement);
    });
    console.log(productStorageManager.getProducts());
})