export class ProductStorageManager {
    constructor() {
        this.productStorageKey = "products";
    }
    getProducts() {
        try {
            const serializedProducts = localStorage.getItem(this.productStorageKey);
            return serializedProducts ? JSON.parse(serializedProducts) : [];
        } catch (error) {
            console.error("Error getting products from local storage:", error);
            return [];
        }
    }

    addProduct(product) {
        try {
            const products = this.getProducts();
            const existingProduct = products.find((p) => p.id === product.id);

            if (!existingProduct) {
                products.push(product);
                localStorage.setItem(this.productStorageKey, JSON.stringify(products));
                console.log("Added product:", product);
            } else {
                console.log("Product already exists:", existingProduct);
            }
        } catch (error) {
            console.error("Error adding product to local storage:", error);
        }
    }

    deleteProduct(productId) {
        try {
            let products = this.getProducts();
            products = products.filter((product) => product.id !== productId);
            localStorage.setItem(this.productStorageKey, JSON.stringify(products));
        } catch (error) {
            console.error("Error deleting product from local storage:", error);
        }
    }

    getProductById(productId) {
        try {
            const products = this.getProducts();
            const product = products.find((p) => p.id == productId);
            return product || null;
        } catch (error) {
            console.error("Error getting product by ID from local storage:", error);
            return null;
        }
    }

    modifyProductById(productId, updatedProduct) {
        try {
            const products = this.getProducts();
            const productIndex = products.findIndex((p) => p.id == productId);

            if (productIndex !== -1) {
                const product = products[productIndex];
                Object.assign(product, updatedProduct);

                products[productIndex] = product;

                localStorage.setItem(this.productStorageKey, JSON.stringify(products));
            }
        } catch (error) {
            console.error("Error modifying product by id from local storage:", error);
        }
    }

}