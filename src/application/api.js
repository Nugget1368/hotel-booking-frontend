export default class Api {
    static get = async (path) => {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const response = await fetch(apiUrl + path);
            return response.json();
        }
        catch (e) {
            console.log(e);
        }
    }
}