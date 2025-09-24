import { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";

interface ProductFormData {
  brand: string;
  modelName: string;
  color: string;
  stock: number;
  price: number;
}

interface AddProductFormProps {
  onProductAdded: () => void;
}

export const AddProductForm = ({ onProductAdded }: AddProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    brand: "",
    modelName: "",
    color: "",
    stock: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }

      setFormData({
        brand: "",
        modelName: "",
        color: "",
        stock: 0,
        price: 0,
      });

      setShowForm(false);

      onProductAdded();
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo crear el producto. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <Button onClick={() => setShowForm(true)} colorScheme="blue" mb={4}>
        Agregar Producto
      </Button>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #000",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <p
        style={{
          fontSize: "1.125rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Agregar Nuevo Producto
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Marca
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Ej: Samsung"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Modelo
            </label>
            <input
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              placeholder="Ej: Galaxy S21"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Color
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Ej: Negro"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Stock
            </label>
            <input
              type="number"
              name="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.25rem" }}>
              Precio
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
            }}
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #E2E8F0",
                borderRadius: "0.375rem",
                backgroundColor: "red",
                cursor: "pointer",
                opacity: isSubmitting ? 0.5 : 1,
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.375rem",
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
                opacity: isSubmitting ? 0.5 : 1,
              }}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
