import {IMAGES_PATH, PUBLIC_KEY, SERVICE_ID, TEMPLATE_KEY} from "./constants.js";
import {CartStorageManager} from "../managers/cart_storage_manager.js";
import {ProductStorageManager} from "../managers/product_storage_manager.js";


let productManger = new ProductStorageManager()
let cartManager = new CartStorageManager();

export const sendEmail = function (email, message) {
    emailjs.init(PUBLIC_KEY);
    let templateParams = {
        email: email,
        message: message
    };
    emailjs.send(SERVICE_ID, TEMPLATE_KEY, templateParams).then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        return response;
    }, function (error) {
        console.log("FAILED...", error);
    });

}

export const createProductElement = function (product, userEmail) {
    // Create product div
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    // Create product image
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = "description";
    productImage.onclick = function () {
        window.location.href = "gallery.html?productId=" + product.id + "&userEmail=" + userEmail;
    }

    // Create product heading
    const productHeading = document.createElement("h3");
    productHeading.textContent = product.name;

    // Create product price paragraph
    const productPrice = document.createElement("p");
    productPrice.textContent = "price $" + product.price;

    // Create "Add to Cart" button
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";

    // Add event listener to the "Add to Cart" button
    addToCartButton.addEventListener("click", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('userEmail');
        if (userEmail !== null && userEmail !== "null") {
            alert(`the ${product.name} has been add to the cart successfully`);
            cartManager.addProduct(product);
        } else {
            console.log("navigate");
            window.location.href = "../../registration/presentation/login_page.html";
        }

    });

    productDiv.appendChild(productImage);
    productDiv.appendChild(productHeading);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(addToCartButton);

    return productDiv;
}

export const createCartItemElement = function (product) {
    // Create cart item div
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    // Create a cart info section
    const cartInfoDiv = document.createElement("div");
    cartInfoDiv.classList.add("cart-info");

    // Create cart image
    const cartImgDiv = document.createElement("div");
    cartImgDiv.classList.add("cart-img");
    const cartImage = document.createElement("img");
    cartImage.src = product.image;
    cartImage.alt = "product image";
    cartImgDiv.appendChild(cartImage);

    // Create cart brief section
    const cartBriefDiv = document.createElement("div");
    cartBriefDiv.classList.add("cart-brief");
    const cartHeading = document.createElement("h3");
    cartHeading.textContent = product.name;
    const cartDescription = document.createElement("p");
    cartDescription.textContent = product.description;
    cartBriefDiv.appendChild(cartHeading);
    cartBriefDiv.appendChild(cartDescription);

    // Create delete button
    const deleteButtonDiv = document.createElement("div");
    deleteButtonDiv.classList.add("delete-cart-button");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    deleteButton.addEventListener("click", function () {
        cartManager.removeProduct(product.id);
        cartItemDiv.remove();

    });
    deleteButtonDiv.appendChild(deleteButton);

    cartInfoDiv.appendChild(cartImgDiv);
    cartInfoDiv.appendChild(cartBriefDiv);
    cartInfoDiv.appendChild(deleteButtonDiv);

    // Create cart price section
    const cartPriceDiv = document.createElement("div");
    cartPriceDiv.classList.add("cart-price");
    const priceHeading = document.createElement("h3");
    priceHeading.textContent = "price";
    const priceParagraph = document.createElement("p");
    priceParagraph.textContent = `$${product.price}`;
    cartPriceDiv.appendChild(priceHeading);
    cartPriceDiv.appendChild(priceParagraph);

    // Create cart quantity section
    const cartQuantityDiv = document.createElement("div");
    cartQuantityDiv.classList.add("cart-quantity");
    const quantityHeading = document.createElement("h3");
    quantityHeading.textContent = "qty";
    const quantityIconsDiv = document.createElement("div");
    quantityIconsDiv.classList.add("quantity-icons");
    const quantityValue = document.createElement("span");
    quantityValue.textContent = product.quantity;

    quantityIconsDiv.appendChild(quantityValue);
    cartQuantityDiv.appendChild(quantityHeading);
    cartQuantityDiv.appendChild(quantityIconsDiv);

    // Create a cart total price section
    const cartTotalPriceDiv = document.createElement("div");
    cartTotalPriceDiv.classList.add("cart-total-price");
    const totalPriceHeading = document.createElement("h3");
    totalPriceHeading.textContent = "total";
    const totalPriceParagraph = document.createElement("p");
    totalPriceParagraph.textContent = `$${product.price * product.quantity}`;
    cartTotalPriceDiv.appendChild(totalPriceHeading);
    cartTotalPriceDiv.appendChild(totalPriceParagraph);

    // Append all sections to cart item div
    cartItemDiv.appendChild(cartInfoDiv);
    cartItemDiv.appendChild(cartPriceDiv);
    cartItemDiv.appendChild(cartQuantityDiv);
    cartItemDiv.appendChild(cartTotalPriceDiv);

    return cartItemDiv;
};

export function createProductItem(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('dashboard-product-item');

    // Create and append the image element
    const imgElement = document.createElement('img');
    imgElement.src = product.image;
    imgElement.alt = product.name;
    productItem.appendChild(imgElement);

    // Create and append the heading element (product name)
    const headingElement = document.createElement('h3');
    headingElement.textContent = product.name;
    productItem.appendChild(headingElement);

    // Create and append the paragraph element (product price)
    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: ${product.price}`;
    productItem.appendChild(priceElement);

    // Create and append the buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    // Create and append the edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit Product';
    editButton.addEventListener('click', function () {
        openEditForm(product);
    })
    buttonsContainer.appendChild(editButton);

    // Create and append the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete Product';
    deleteButton.addEventListener("click", function () {
        productManger.deleteProduct(product.id);
        productItem.remove();
    })
    buttonsContainer.appendChild(deleteButton);


    // Create and append a clear div for styling purposes
    const clearDiv = document.createElement('div');
    clearDiv.classList.add('clear');
    buttonsContainer.appendChild(clearDiv);

    // Append the button container to the product item
    productItem.appendChild(buttonsContainer);

    return productItem;
}

function openEditForm(product) {

    const editFormContainer = document.createElement('div');
    editFormContainer.classList.add('edit-product-light-box');
    editFormContainer.innerHTML = `
        <div class="edit-product-form-container">
        <div class="form-close-btn">
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
        <form action="">
          <h2>edit product</h2>
          <div class="form-left-part">
            <label for="">id</label><br/>
              <input
                name="id"
                type="number"
                placeholder="enter product id"
              /><br />
              <label for="">name</label><br />
              <input
                name="name"
                type="text"
                placeholder="enter product name"
              /><br />
              <label for="">price</label><br />
              <input
                name="price"
                type="number"
                placeholder="enter product price"
              /><br />
              <label for=""> main image</label><br />
               <input
                    name="image"
                    type="file"
                    accept="image/*"
                    placeholder="upload main image"
              /><br />
              <label for="">description</label><br />
              <input
                name="description"
                type="text"
                placeholder="enter product description"
              /><br />
          </div>
          <div class="form-right-side">
            <label for="">image collection number 1</label><br/>
            <input
                    name="collection1"
                    type="file"
                    accept="image/*"
                    placeholder="upload image for collection 1"
            /><br />
            <label for="">image collection number 2</label><br/>
            <input
                    name="collection2"
                    type="file"
                    accept="image/*"
                    placeholder="upload image for collection 1"
            /><br />
            <label for="">image collection number 3</label><br/>
             <input
                    name="collection3"
                    type="file"
                    accept="image/*"
                    placeholder="upload image for collection 1"
            /><br />
            <label for="">image collection number 4</label><br/>
            <input
                    name="collection4"
                    type="file"
                    accept="image/*"
                    placeholder="upload image for collection 1"
            /><br />
           
            <button type="submit" >submit</button>
          </div>
           <div class="clear"></div>   
              
        </form>
</div>
 `;

    document.body.appendChild(editFormContainer);
    console.log("it's opened")

    const closeEditForm = function () {
        editFormContainer.style.display = 'none';

        const editForm = editFormContainer.querySelector('form');
        editForm.reset();
    }

    const closeButton = editFormContainer.querySelector('.fa-circle-xmark');
    closeButton.addEventListener('click', closeEditForm);

    const editForm = editFormContainer.querySelector('form');
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let collection= [editForm.querySelector('input[name="collection1"]').value,
            editForm.querySelector('input[name="collection2"]').value,
            editForm.querySelector('input[name="collection3"]').value,
            editForm.querySelector('input[name="collection4"]').value]
        let image = editForm.querySelector('input[name="image"]').value;

        const editedProduct = {
            id: parseInt(editForm.querySelector('input[name="id"]').value),
            name: editForm.querySelector('input[name="name"]').value,
            price: parseFloat(editForm.querySelector('input[name="price"]').value),
            // image: editForm.querySelector('input[name="image"]').value,
            image: IMAGES_PATH + splitImage(image),
            description: editForm.querySelector('input[name="description"]').value,
            // collection: [
            //     editForm.querySelector('input[name="collection1"]').value,
            //     editForm.querySelector('input[name="collection2"]').value,
            //     editForm.querySelector('input[name="collection3"]').value,
            //     editForm.querySelector('input[name="collection4"]').value,
            // ],
            collection: [
                IMAGES_PATH + splitImage(collection[0]),
                IMAGES_PATH + splitImage(collection[1]),
                IMAGES_PATH + splitImage(collection[2]),
                IMAGES_PATH + splitImage(collection[3])
            ]
        }
        productManger.modifyProductById(product.id, editedProduct);

        editFormContainer.remove();
    });

}

export function splitImage(imagePath) {
    return imagePath.split('\\')[2];
}