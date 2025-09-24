export interface User {
  _id: string;
  email: string;
  name: string;
  premium_brands?: string[];
}

export interface Product {
  _id: string;
  modelName: string;
  color: string;
  stock: number;
  price: number;
  specialPrice?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
let currentUser: User | null = null;

export const checkApiStatus = async (): Promise<{
  status: string;
  message: string;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      return { status: "ok", message: "API is running" };
    }
    return {
      status: "error",
      message: `API returned status: ${response.status}`,
    };
  } catch (error) {
    return { status: "error", message: `Error connecting to API: ${error}` };
  }
};

export const checkEmail = async (
  email: string
): Promise<{ exists: boolean; user?: User }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Error al verificar el correo");
  }

  const responseData = await response.json();
  const userData = responseData.data?.user;
  const exists = responseData.status === "success" && !!userData;

  if (exists && userData) {
    currentUser = userData;
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  return { exists, user: userData };
};

export const getCurrentUser = (): User | null => {
  if (!currentUser) {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
    }
  }
  return currentUser;
};

export const logout = (): void => {
  currentUser = null;
  localStorage.removeItem("userData");
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
};
