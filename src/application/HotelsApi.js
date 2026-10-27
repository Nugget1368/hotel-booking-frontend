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
}
