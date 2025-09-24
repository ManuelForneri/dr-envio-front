import { Box, Container } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userDataStr = localStorage.getItem("userData");

    let email = "";

    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        email = userData.email || "";
      } catch (e) {
        console.error("Error parsing userData:", e);
      }
    }

    if (!email) {
      email = localStorage.getItem("userEmail") || "";
    }

    const authStatus = !!(token || userDataStr);

    console.log("Auth check:", {
      token,
      userData: userDataStr,
      email,
      authStatus,
    });

    setIsAuthenticated(authStatus);
    setUserEmail(email);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");

    setIsAuthenticated(false);
    setUserEmail("");

    window.location.href = "/login";
  };

  return (
    <Box minH="100vh" bg="white">
      <Navbar
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
