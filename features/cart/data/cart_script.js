import * as func from "../../../utils/helper/functions.js";
import {CartStorageManager} from "../../../utils/managers/cart_storage_manager.js";
import {sendEmail} from "../../../utils/helper/functions.js";
import {UserStorageManager} from "../../../utils/managers/user_storage_manager.js";

let cartManager = new CartStorageManager();
let userManager = new UserStorageManager();

const urlParams = new URLSearchParams(window.location.search);
const userEmail = urlParams.get('userEmail');
let user = userManager.getUserByEmail(userEmail);
console.log(user);
window.addEventListener("load",function () {
    const arrowLeftElement = document.querySelector('.cart-header span');
    let cartView= document.querySelector(".products-side");
    let checkOutButton= document.querySelector("#checkoutBtn");
    let totalText= document.querySelector(".checkout-p");

    cartManager.getCartItems().forEach(product => {
        let cartItem = func.createCartItemElement(product);
        cartView.appendChild(cartItem);
    });
    totalText.textContent = `Cart total: $ ${cartManager.getTotalPrice()}`;

    arrowLeftElement.onclick=function () {
        window.location.href = "../../home/presentation/index.html?userEmail=" + userEmail;
    }

    checkOutButton.addEventListener("click",function (e) {
        e.preventDefault();
        console.log(user)
        sendEmail(user.email,`hi ${user.username} Your purchase has been confirmed with total price : ${cartManager.getTotalPrice()}`);

        let cartItems = document.querySelectorAll(".cart-item");
        cartItems.forEach(item=>{
            item.remove();
        });
        cartManager.getCartItems().forEach(product=>{
            cartManager.removeProduct(product.id);
        });
        totalText.textContent = `Cart total: $ ${cartManager.getTotalPrice()}`;
        alert(`Thank you for your purchase! You will receive an email confirmation shortly.`);
    })
})