import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  VStack,
  HStack,
  Box,
  Flex,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { getCurrentUser, logout } from "../../services/productService";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { AddProductForm } from "../../components/AddProductForm/AddProductForm";
import { Product, User } from "../../types";

const applyPremiumDiscounts = (
  products: Product[],
  premiumBrands: string[] = []
): Product[] => {
  if (!premiumBrands || premiumBrands.length === 0) return products;

  return products.map((product) => {
    if (premiumBrands.includes(product.brand)) {
      return {
        ...product,
        specialPrice: product.price * 0.9,
      };
    }
    return product;
  });
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const fetchProducts = useCallback(async (currentUser?: User | null) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products`
      );

      if (!response.ok) {
        throw new Error(`Error al cargar productos: ${response.status}`);
      }

      const data = await response.json();
      let productsData: Product[] = [];

      if (Array.isArray(data)) {
        productsData = data;
      } else if (data?.products) {
        productsData = Array.isArray(data.products) ? data.products : [];
      } else if (data?.data) {
        productsData = Array.isArray(data.data) ? data.data : [];
      }

      const userToUse = currentUser || getCurrentUser();
      setUser(userToUse);

      const productsToShow = userToUse?.premium_brands
        ? applyPremiumDiscounts(productsData, userToUse.premium_brands)
        : productsData;

      setProducts(productsToShow);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error al cargar los productos. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleProductAdded = useCallback(() => {
    const currentUser = getCurrentUser();
    fetchProducts(currentUser);
  }, [fetchProducts]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    fetchProducts(currentUser);
  }, [fetchProducts]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const userInfo = user && (
    <Box mb={4} p={4} bg="black" borderRadius="md" color="white">
      <HStack mb={user.premium_brands?.length ? 2 : 0}>
        <Text fontWeight="bold">Usuario:</Text>
        <Text>{user.email}</Text>
      </HStack>
      {user.premium_brands && user.premium_brands.length > 0 && (
        <HStack>
          <Text fontWeight="bold">Marcas premium:</Text>
          <Text>{user.premium_brands.join(", ")}</Text>
        </HStack>
      )}
    </Box>
  );

  return (
    <Container maxW="container.xl" py={6}>
      <Box mb={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          mb={6}
          gap={4}
        >
          <VStack align="stretch">
            <Heading fontSize="2xl" color="gray.800" fontWeight="semibold">
              Nuestros Productos
            </Heading>
            <Text color="gray.600" fontSize="md">
              Descubre nuestra selección de productos de las mejores marcas.
            </Text>
          </VStack>
        </Flex>
        {user && (
          <Box alignSelf={{ base: "stretch", md: "flex-end" }}>
            <AddProductForm onProductAdded={handleProductAdded} />
          </Box>
        )}
        {userInfo}
      </Box>

      {products.length === 0 ? (
        <Center h="50vh">
          <Text>No se encontraron productos.</Text>
        </Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={(id) => {
                console.log("Ver detalles del producto:", id);
              }}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
