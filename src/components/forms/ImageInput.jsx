import { useState } from "react";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function ImageInput({image, setImage}) {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setImage(null);
    setPreview("");

    if (!file) return;

    // Kontrollera filtypen
    if (!file.type.startsWith("image/")) {
      setError("Välj en bildfil.");
      event.target.value = "";
      return;
    }

    // Kontrollera filstorleken
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Bilden får inte vara större än 10 MB.");
      event.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <div>
      <label htmlFor="hotel-image">
        Hotel Image
      </label>

      <input
        id="hotel-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {error && <p role="alert">{error}</p>}

      {image && (
        <div>
          <p>Selected Image: {image.name}</p>
          <p>
            Size: {(image.size / (1024 * 1024)).toFixed(2)} MB
          </p>

          <img
            src={preview}
            alt="Förhandsvisning av hotellbild"
            style={{ maxWidth: "300px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageInput;