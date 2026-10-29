import { MySessionStorage } from "./localStorage";
import FileHandler from "../utils/fileHadler.js"
export default class HotelsApi {
    static getHotelsAsync = async () => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/hotels", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.json();
        }
        catch {
            return null;
        }
    }
    static getHotelByIdAsync = async (hotelId) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            let response = await fetch(apiUrl + "/hotels/" + hotelId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.json();
        }
        catch {
            return null;
        }
    }
    static createHotelAsync = async (hotel) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        const img = hotel.img ? await FileHandler.fileToBase64(hotel.img) : null;
        console.log("img: ", img);
        const imgType = hotel.img ? hotel.img.type : null;
        try {
            let response = await fetch(apiUrl + "/hotels", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...hotel, img: img, imgType: imgType })
            });
            return response.json();
        }
        catch {
            return null;
        }
    }
    static updateHotelAsync = async (hotel) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        const img = hotel.img ? await FileHandler.fileToBase64(hotel.img) : null;
        const imgType = hotel.img ? hotel.img.type : null;
        try {
            let response = await fetch(apiUrl + "/hotels/" + hotel.id, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({ ...hotel, img: img, imgType: imgType })
            });
            return response.json();
        }
        catch {
            return null;
        }
    }
    static deleteHotelAsync = async (hotelId) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        let token = MySessionStorage.getUserToken();
        try {
            let response = await fetch(apiUrl + "/hotels/" + hotelId, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            return response.json();
        }
        catch {
            return null;
        }
    }
}
