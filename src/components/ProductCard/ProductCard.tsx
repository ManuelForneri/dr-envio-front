import { Box, Text, Badge, Button } from "@chakra-ui/react";

interface ProductCardProps {
  product: {
    _id: string;
    brand: string;
    modelName: string;
    color: string;
    price: number;
    specialPrice?: number;
    stock: number;
  };
  onViewDetails?: (id: string) => void;
}

export const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  return (
    <Box
      key={product._id}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={5}
      bg="white"
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
        borderColor: 'blue.300'
      }}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box mb={4}>
        <Text 
          fontWeight="bold" 
          fontSize="xl"
          color="gray.800"
          mb={1}
        >
          {product.brand}
        </Text>
        <Text 
          fontSize="md" 
          color="gray.600"
          mb={2}
        >
          {product.modelName}
        </Text>
        <Text 
          fontSize="sm" 
          color="gray.500"
        >
          Color: {product.color}
        </Text>
      </Box>

      <Box mt="auto" mb={4}>
        <Box mb={3}>
          {product.specialPrice ? (
            <Box>
              <Text
                as="span"
                textDecoration="line-through"
                color="gray.500"
                fontSize="md"
                mr={2}
              >
                ${product.price.toFixed(2)}
              </Text>
              <Text
                as="span"
                fontSize="xl"
                fontWeight="bold"
                color="green.600"
                bg="green.50"
                px={2}
                py={0.5}
                borderRadius="md"
              >
                ${product.specialPrice.toFixed(2)}
              </Text>
            </Box>
          ) : (
            <Text 
              fontSize="xl" 
              fontWeight="bold"
              color="gray.800"
            >
              ${product.price.toFixed(2)}
            </Text>
          )}
        </Box>

        <Badge
          colorScheme={product.stock > 0 ? "green" : "red"}
          px={2}
          py={1}
          borderRadius="md"
          fontSize="0.8em"
          variant={product.stock > 0 ? "subtle" : "solid"}
        >
          {product.stock > 0 ? `En stock (${product.stock})` : "Sin stock"}
        </Badge>
      </Box>

      <Button
        width="100%"
        colorScheme="blue"
        size="md"
        disabled={product.stock === 0}
        onClick={() => onViewDetails?.(product._id)}
        mt="auto"
        _hover={{
          transform: 'translateY(-1px)',
          boxShadow: 'md'
        }}
      >
        {product.stock > 0 ? "Ver Detalles" : "No disponible"}
      </Button>
    </Box>
  );
};

export default ProductCard;
