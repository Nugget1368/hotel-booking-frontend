export default class Api {
    static getReservationsAsync = async (path) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(apiUrl + path);
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
            const response = await fetch(apiUrl + `/reservations`, {
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
    static createGuestAsync = async (data) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(apiUrl + `/guests`, {
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

    static makeReservationAsync = async (data)=>{
        this.createGuestAsync(data).then((response) => {
            if(!response.success)
                throw new Error(response.message);
            return response;
        }).then((response) => {
            let id = response.guestId;
            if(!id)
                throw new Error("Missing id");
            return this.createReservationAsync(id, data);
        }).then((response) => {
            if(!response.success)
                throw new Error(response.message);
            return response;
        })
    }

    static getGuestFromEmailAsync = async (email) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let encodedemail = encodeURIComponent(email);
        try {
            const response = await fetch(apiUrl + `/guests/${encodedemail}`);
            return response.json();
        }
        catch (e) {
            console.log(e);
        }
    }
}