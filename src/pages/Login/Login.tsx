import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Input,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { checkEmail } from "../../services/productService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const showError = (message: string) => {
    alert(`Error: ${message}`);
  };

  const showSuccess = (message: string) => {
    alert(`Éxito: ${message}`);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { exists, user } = await checkEmail(email);

      if (exists && user) {
        showSuccess("Inicio de sesión exitoso");
        navigate("/products");
      } else {
        showError("El correo no está registrado o los datos son incompletos");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocurrió un error al verificar el correo";
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/products");
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
        <Box>
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={2} color="black">
              Iniciar Sesión
            </Heading>
            <Text color="black">Ingresa tu correo para continuar</Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <Box width="100%" mb={4}>
              <Text
                color={"black"}
                as="label"
                display="block"
                mb={2}
                fontWeight="medium"
              >
                Correo electrónico
              </Text>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="tucorreo@ejemplo.com"
                size="lg"
                width="100%"
                color="black"
                required
              />
            </Box>

            <Box mb={4}>
              <Button
                variant={"surface"}
                type="submit"
                size="lg"
                width="100%"
                loading={loading}
                loadingText="Iniciando sesión..."
              >
                Iniciar sesión
              </Button>
            </Box>
          </Box>

          <HStack>
            <Box flex={1} borderBottom="1px" borderColor="gray.200" />
            <Text color="black" px={2}>
              o
            </Text>
            <Box flex={1} borderBottom="1px" borderColor="gray.200" />
          </HStack>

          <Button
            variant="subtle"
            size="lg"
            width="100%"
            onClick={handleGuestAccess}
            disabled={loading}
          >
            Continuar como invitado
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
