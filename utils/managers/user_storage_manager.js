import {ADMIN_EMAIL, ADMIN_PASSWORD} from "../helper/constants.js";

export class UserStorageManager {
    constructor() {
        this.userStorageKey = "users";
        if (this.getUsers().length === 0) {
            const initialAdmin = {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
            };
            this.addUser(initialAdmin);
        }
    }
     getUsers() {
        try {
            const serializedUsers = localStorage.getItem(this.userStorageKey);
            return serializedUsers ? JSON.parse(serializedUsers) : [];
        } catch (error) {
            console.error("Error getting users from local storage:", error);
            return [];
        }
    }

    addUser(user) {
        try {
            const users = this.getUsers();

            const existingUser = users.find((u) => u.email === user.email);

            if (!existingUser) {
                users.push(user);
                localStorage.setItem(this.userStorageKey, JSON.stringify(users));
                console.log("Added user:", user);
            } else {
                console.error("User with the same email already exists:", existingUser);
            }
        } catch (error) {
            console.error("Error adding user to local storage:", error);
        }
    }

    getUserByEmail(email) {
        try {
            const users = this.getUsers();
            const user = users.find((u) => u.email === email);
            return user || null;
        } catch (error) {
            console.error("Error getting user by email from local storage:", error);
            return null;
        }
    }
}