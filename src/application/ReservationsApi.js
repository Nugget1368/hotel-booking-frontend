import { MySessionStorage } from "./localStorage";

export default class ReservationsApi {
    static getReservationsAsync = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        try {
            let response = await fetch(apiUrl + "/reservations", {
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

    static getUserReservationAsync = async (token) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + `/reservations/user/${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.json();
        }
        catch {
            return null;
        }
    }

    static createGuestReservationAsync = async (data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/reservations/guest", {
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

    static createUserReservationAsync = async (token, data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/reservations/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        catch {
            return { success: false };
        }
    }

    static deleteReservationAsync = async (id) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        try {
            let response = await fetch(apiUrl + `/reservations/${id}`, {
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

    static editReservationAsync = async (id, data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        let newData = { checkIn: data.checkIn, checkOut: data.checkOut, roomType: data.roomType };
        try {
            let response = await fetch(apiUrl + `/reservations/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });
            return response.json();
        }
        catch {
            return { success: false };
        }
    }
}
