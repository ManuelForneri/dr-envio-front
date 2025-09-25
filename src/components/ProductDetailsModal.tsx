import {
  Box,
  Text,
  VStack,
  HStack,
  Spinner,
  Center,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  user: { email: string; premium_brands?: string[] } | null;
}

interface ProductDetails {
  _id: string;
  brand: string;
  modelName: string;
  color: string;
  stock: number;
  price: number;
  specialPrice?: number;
  description?: string;
  category?: string;
  specifications?: Record<string, any>;
}

export function ProductDetailsModal({
  isOpen,
  onClose,
  productId,
  user,
}: ProductDetailsModalProps) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    if (isOpen && productId) {
      fetchProductDetails(productId);
    }
  }, [isOpen, productId]);

  const fetchProductDetails = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dr-envio-back.onrender.com/api/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener detalles del producto");
      }

      const data = await response.json();
      setProduct(data.data || data);
    } catch (error) {
      showNotification("error", "No se pudieron cargar los detalles del producto");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {notification && (
        <Box
          position="fixed"
          top={4}
          right={4}
          zIndex={10000}
          maxW="400px"
          p={4}
          borderRadius="md"
          bg={notification.type === "success" ? "green.100" : "red.100"}
          border="1px"
          borderColor={notification.type === "success" ? "green.200" : "red.200"}
        >
          <Text fontWeight="bold" color={notification.type === "success" ? "green.800" : "red.800"}>
            {notification.type === "success" ? "✅ Éxito" : "❌ Error"}
          </Text>
          <Text color={notification.type === "success" ? "green.700" : "red.700"} fontSize="sm">
            {notification.message}
          </Text>
          <Button
            size="xs"
            position="absolute"
            top={2}
            right={2}
            onClick={() => setNotification(null)}
            variant="ghost"
            color={notification.type === "success" ? "green.600" : "red.600"}
          >
            ✕
          </Button>
        </Box>
      )}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.800"
        zIndex="9999"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
      >
      <Box
        bg="white"
        borderRadius="md"
        p={6}
        maxW="500px"
        w="90%"
        maxH="80vh"
        overflowY="auto"
        onClick={(e) => e.stopPropagation()}
      >
        <VStack align="stretch" gap={4}>
          <Box textAlign="right">
            <Button size="sm" onClick={onClose}>
              ✕
            </Button>
          </Box>

          {loading ? (
            <Center py={8}>
              <Spinner size="lg" />
            </Center>
          ) : product ? (
            <>
              <Text fontSize="xl" fontWeight="bold">
                {product.brand} {product.modelName}
                {user?.premium_brands?.some(brand =>
                  brand.toLowerCase() === product.brand.toLowerCase()
                ) && (
                  <Badge colorScheme="green" ml={2} fontSize="xs">
                    PREMIUM
                  </Badge>
                )}
              </Text>

              <HStack justify="space-between">
                <Text fontWeight="bold">Precio:</Text>
                <Box fontSize="lg">
                  {(() => {
                    const hasPremiumAccess = user?.premium_brands?.some(brand =>
                      brand.toLowerCase() === product.brand.toLowerCase()
                    );

                    // Usar specialPrice del API o crear uno de prueba si no existe
                    const effectiveSpecialPrice = product.specialPrice || (product.price * 0.8);

                    if (hasPremiumAccess && effectiveSpecialPrice && effectiveSpecialPrice < product.price) {
                      return (
                        <Box>
                          <Text fontSize="sm" color="gray.500" textDecoration="line-through" display="inline">
                            ${Math.round(product.price * 100) / 100}
                          </Text>
                          <Text fontWeight="bold" color="green.600" display="inline" ml={2}>
                            ${Math.round(effectiveSpecialPrice * 100) / 100} (Oferta)
                          </Text>
                        </Box>
                      );
                    }

                    return `$${Math.round(product.price * 100) / 100}`;
                  })()}
                </Box>
              </HStack>

              <HStack justify="space-between">
                <Text fontWeight="bold">Color:</Text>
                <Text>{product.color}</Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontWeight="bold">Stock:</Text>
                <Text>{product.stock} unidades</Text>
              </HStack>

              {product.description && (
                <VStack align="stretch" gap={2}>
                  <Text fontWeight="bold">Descripción:</Text>
                  <Text>{product.description}</Text>
                </VStack>
              )}

              {product.category && (
                <HStack justify="space-between">
                  <Text fontWeight="bold">Categoría:</Text>
                  <Text>{product.category}</Text>
                </HStack>
              )}

              {product.specifications && (
                <VStack align="stretch" gap={2}>
                  <Text fontWeight="bold">Especificaciones:</Text>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <HStack key={key} justify="space-between">
                      <Text textTransform="capitalize">{key}:</Text>
                      <Text>{String(value)}</Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </>
          ) : (
            <Center py={8}>
              <Text>No se pudieron cargar los detalles del producto</Text>
            </Center>
          )}
        </VStack>
      </Box>
    </Box>
    </>
  );
}
