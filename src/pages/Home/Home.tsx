import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container py={20}>
        <Box textAlign="center" mx="auto" mb={12}>
          <Text
            color="blue.500"
            fontWeight={600}
            fontSize="lg"
            letterSpacing="wide"
            textTransform="uppercase"
            mb={2}
          >
            Bienvenido a
          </Text>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="1.2"
            mb={6}
          >
            <Text color={"black"}>La prueba tecnica de Manuel Forneri</Text>
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Una prueba tecnica para DR Envio
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
