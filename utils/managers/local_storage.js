// import {ADMIN_EMAIL, ADMIN_PASSWORD} from "../helper/constants.js";
//
// export class LocalStorageManager {
//     constructor() {
//         if (!LocalStorageManager.instance) {
//             this.userStorageKey = "users";
//             this.productStorageKey = "products";
//             LocalStorageManager.instance = this;
//
//             if (this.getUsers().length === 0) {
//                 const initialAdmin = {
//                     userName: ADMIN_EMAIL,
//                     password: ADMIN_PASSWORD,
//                 };
//                 this.addUser(initialAdmin);
//             }
//         }
//         return LocalStorageManager.instance;
//     }
//
//     getUsers() {
//         try {
//             const serializedUsers = localStorage.getItem(this.userStorageKey);
//             return serializedUsers ? JSON.parse(serializedUsers) : [];
//         } catch (error) {
//             console.error("Error getting users from local storage:", error);
//             return [];
//         }
//     }
//
//     addUser(user) {
//         try {
//             const users = this.getUsers();
//
//             const existingUser = users.find((u) => u.email === user.email);
//
//             if (!existingUser) {
//                 users.push(user);
//                 localStorage.setItem(this.userStorageKey, JSON.stringify(users));
//                 console.log("Added user:", user);
//             } else {
//                 console.error("User with the same email already exists:", existingUser);
//             }
//         } catch (error) {
//             console.error("Error adding user to local storage:", error);
//         }
//     }
//
//     getUserByEmail(email) {
//         try {
//             const users = this.getUsers();
//             const user = users.find((u) => u.email === email);
//             return user || null;
//         } catch (error) {
//             console.error("Error getting user by email from local storage:", error);
//             return null;
//         }
//     }
//
//     getProducts() {
//         try {
//             const serializedProducts = localStorage.getItem(this.productStorageKey);
//             return serializedProducts ? JSON.parse(serializedProducts) : [];
//         } catch (error) {
//             console.error("Error getting products from local storage:", error);
//             return [];
//         }
//     }
//
//     addProduct(product) {
//         try {
//             const products = this.getProducts();
//             const existingProduct = products.find((p) => p.id === product.id);
//
//             if (!existingProduct) {
//                 products.push(product);
//                 localStorage.setItem(this.productStorageKey, JSON.stringify(products));
//                 console.log("Added product:", product);
//             } else {
//                 console.log("Product already exists:", existingProduct);
//             }
//         } catch (error) {
//             console.error("Error adding product to local storage:", error);
//         }
//     }
//
//     deleteProduct(productId) {
//         try {
//             let products = this.getProducts();
//             products = products.filter((product) => product.id !== productId);
//             localStorage.setItem(this.productStorageKey, JSON.stringify(products));
//         } catch (error) {
//             console.error("Error deleting product from local storage:", error);
//         }
//     }
//
//     getProductById(productId) {
//         try {
//             const products = this.getProducts();
//             const product = products.find((p) => p.id == productId);
//             return product || null;
//         } catch (error) {
//             console.error("Error getting product by ID from local storage:", error);
//             return null;
//         }
//     }
//
//     modifyProductById(productId, name = "", price = 0, image = "", description = "", collection = []) {
//         try {
//             const products = this.getProducts();
//             const productIndex = products.findIndex((p) => p.id == productId);
//             const product = products.find((p) => p.id === productId);
//
//             product.name = name;
//             product.price = price;
//             product.image = image;
//             product.description = description;
//             product.collection = collection;
//             products[productIndex] = product;
//             localStorage.setItem(this.productStorageKey, JSON.stringify(products));
//
//         } catch (error) {
//             log.error("Error modifying product by id from local storage :", error);
//         }
//     }
// }