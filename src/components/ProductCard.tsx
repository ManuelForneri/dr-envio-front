import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";

interface Product {
  _id: string;
  brand: string;
  modelName: string;
  color: string;
  stock: number;
  price: number;
  specialPrice?: number;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack align="stretch">
        <Box>
          <Heading size="md" mb={2}>
            {product.brand} {product.modelName}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Color: {product.color}
          </Text>
        </Box>

        <HStack justify="space-between" align="center">
          {product.specialPrice ? (
            <Box>
              <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                ${Math.round(product.price * 100) / 100}
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="green.600">
                ${Math.round(product.specialPrice * 100) / 100}
              </Text>
            </Box>
          ) : (
            <Text fontWeight="bold" fontSize="lg">
              ${Math.round(product.price * 100) / 100}
            </Text>
          )}
          {product.specialPrice && (
            <Badge colorScheme="green" fontSize="xs">
              OFERTA
            </Badge>
          )}
        </HStack>

        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color="gray.500">
            Stock: {product.stock}
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => onViewDetails(product._id)}
          >
            Ver detalles
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
