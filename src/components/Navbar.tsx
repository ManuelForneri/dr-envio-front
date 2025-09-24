import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

interface NavbarProps {
  isAuthenticated: boolean;
  userEmail: string;
  onLogout: () => void;
}

export default function Navbar({
  isAuthenticated,
  userEmail,
  onLogout,
}: NavbarProps) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
      px={4}
      py={3}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        justify="space-between"
        align="center"
      >
        <Heading
          as="h1"
          size="lg"
          color="blue.600"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          DR Envíos
        </Heading>

        {isAuthenticated ? (
          <Flex align="center" gap={4}>
            {userEmail && (
              <Text
                fontSize="sm"
                color="gray.600"
                display={{ base: "none", md: "block" }}
              >
                {userEmail}
              </Text>
            )}
            <Flex align="center" gap={2}>
              <FaSignOutAlt style={{ color: "#E53E3E" }} />
              <Button
                colorScheme="red"
                size="sm"
                variant="outline"
                onClick={handleLogoutClick}
              >
                <Text
                  as="span"
                  color="red"
                  display={{ base: "none", md: "inline" }}
                >
                  Cerrar sesión
                </Text>
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex gap={2}>
            <Button
              colorScheme="blue"
              size="sm"
              variant="surface"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
