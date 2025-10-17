import { MySessionStorage } from "./localStorage";

export default class Api {
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
        catch (e) {
            console.log(e);
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
        catch (e) {
            console.log(e);
        }
    }

    static createReservationAsync = async (id, data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let newData = { ...data, "guestId": id };
        try {
            let response = await fetch(apiUrl + "/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            });
            return response.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    static makeUserReservationAsync = async (token, data) => {
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
        catch (e) {
            console.log(e);
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
        catch (e) {
            console.log(e);
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
        catch (e) {
            console.log(e);
        }
    }

    static createGuestAsync = async (data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/guests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return response.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    static makeReservationAsync = async (data) => {
        let resp = await this.createGuestAsync(data).then((response) => {
            if(!response.success){
                //TODO: Kan vi hitta användaren?
                response = this.loginUserAsync(data);
                console.log(response);
                throw new Error(response.message);
            }
            return response;
        }).then((response) => {
            let id = response.userId;
            if(!id)
                throw new Error("Missing id");
            let reservationResponse = this.createReservationAsync(id, data);
            return reservationResponse;
        }).then((response) => {
            if(!response.success)
                throw new Error(response.message);
            return true;
        }).catch(() => {
            return false;
        });
        return resp;
    }

    static getGuestFromEmailAsync = async (email) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let encodedemail = encodeURIComponent(email);
        try {
            let response = await fetch(apiUrl + `/guests/${encodedemail}`);
            return response.json();
        }
        catch (e) {
            console.log(e);
        }
    }

    static createAccountAsync = async (data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log(data);
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
        catch (e) {
            console.log(e);
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
        catch (e) {
            console.log(e);
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
        catch (e) {
            console.log(e);
        }
    }
}