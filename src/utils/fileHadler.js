class FileHandler {
        static async fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;

                // Tar bort exempelvis "data:image/png;base64,"
                const base64 = result.split(",")[1];

                resolve(base64);
            };

            reader.onerror = () => reject(reader.error);

            reader.readAsDataURL(file);
        });
    }
}

export default FileHandler