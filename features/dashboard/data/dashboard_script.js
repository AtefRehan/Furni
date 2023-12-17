import {ProductStorageManager} from "../../../utils/managers/product_storage_manager.js";
import {createProductItem, splitImage} from "../../../utils/helper/functions.js";
import {ProductModel} from "../../home/data/models/product_model.js";
import {IMAGES_PATH} from "../../../utils/helper/constants.js";
import {UserStorageManager} from "../../../utils/managers/user_storage_manager.js";

const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('userEmail');

const productStorageManager = new ProductStorageManager();
const userStorageManger = new UserStorageManager();
let allProducts = productStorageManager.getProducts();

window.addEventListener('load', function () {

    let mainDiv = document.querySelector('.dashboard-products-container');
    let backArrowElement = document.querySelector("#close-button");
    // console.log(backArrowElement);
    const addProductButton = document.querySelector('.add-product-container button');
    //
    const formCloseBtn = document.querySelector('.add-product-light-box .form-close-btn');
    const addProductForm = document.querySelector('.add-product-light-box form');
    const addProductPopUp = document.querySelector('.add-product-light-box');

    allProducts.forEach(product => {
        let productElement = createProductItem(product)
        mainDiv.appendChild(productElement);
    });

    backArrowElement.addEventListener('click',function (){
        console.log("hii")
        console.log(userEmail)
        window.location.href = "../../home/presentation/index.html?userEmail=" + userStorageManger.getUsers()[0].email;

    })

    addProductButton.addEventListener('click', function () {
        addProductPopUp.style.display = 'block';
    });

    formCloseBtn.addEventListener('click', function () {
        const addProductLightBox = document.querySelector('.add-product-light-box');
        addProductLightBox.style.display = 'none';
    });

    addProductForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const id = parseInt(addProductForm.querySelector('input[name="id"]').value);
        const name = addProductForm.querySelector('input[name="name"]').value;
        const price = parseFloat(addProductForm.querySelector('input[name="price"]').value);
        const image = addProductForm.querySelector('input[name="image"]').value;
        const path = IMAGES_PATH + splitImage(image);
        const description = addProductForm.querySelector('input[name="description"]').value;
        const collection1 = addProductForm.querySelector('input[name="collection1"]').value;
        const collection1_path = IMAGES_PATH + splitImage(collection1);

        const collection2 = addProductForm.querySelector('input[name="collection2"]').value;
        const collection2_path = IMAGES_PATH + splitImage(collection2);

        const collection3 = addProductForm.querySelector('input[name="collection3"]').value;
        const collection3_path = IMAGES_PATH + splitImage(collection3);

        const collection4 = addProductForm.querySelector('input[name="collection4"]').value;
        const collection4_path = IMAGES_PATH + splitImage(collection4);


        const newProduct = new ProductModel(id, name, price, path, description, [collection1_path, collection2_path, collection3_path, collection4_path]);

        productStorageManager.addProduct(newProduct);

        addProductPopUp.style.display = 'none';

    });
});