export class CartStorageManager {
    constructor() {
        this.cartStorageKey = 'cart';
    }

    getCartItems() {
        try {
            const serializedCartItems = localStorage.getItem(this.cartStorageKey);
            return serializedCartItems ? JSON.parse(serializedCartItems) : [];
        } catch (error) {
            console.error('Error getting cart items from local storage:', error);
            return [];
        }
    }

    addProduct(product) {
        try {
            const cartItems = this.getCartItems();
            const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                cartItems[existingProductIndex].quantity += 1;
            } else {
                cartItems.push({ ...product, quantity: 1 });
            }

            localStorage.setItem(this.cartStorageKey, JSON.stringify(cartItems));
            console.log('Added product to cart:', product);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }

    removeProduct(productId) {
        try {
            let cartItems = this.getCartItems();
            cartItems = cartItems.filter(item => item.id !== productId);
            localStorage.setItem(this.cartStorageKey, JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    getTotalPrice() {
        return this.getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}