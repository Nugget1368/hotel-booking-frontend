import { MySessionStorage } from "./localStorage";

export default class GuestsApi {
    static getAllGuestsAsync = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        try {
            let response = await fetch(apiUrl + "/guests", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.json();
        }
        catch {
            return [];
        }
    }

    static deleteUserAsync = async (id) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        try {
            let response = await fetch(apiUrl + `/guests/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.json();
        }
        catch {
            return { success: false };
        }
    }

    static createAccountAsync = async (data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/guests/profile/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        catch {
            return { success: false };
        }
    }

    static loginUserAsync = async (data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/guests/profile/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        catch {
            return { success: false };
        }
    }

    static getUserRoleAsync = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        try {
            let response = await fetch(apiUrl + "/guests/profile/role", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response.json();
        }
        catch {
            return { success: false, role: "" };
        }
    }
}
