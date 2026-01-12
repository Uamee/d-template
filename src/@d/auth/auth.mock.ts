import Cookies from "js-cookie";
import api from "../../services/api";
import type { User } from "./AuthContext";

export const USE_AUTH_MOCK = true; // TODO: se basear na .env.xxx selecionada

const MOCK_TOKEN = "mock-jwt-token-xyz-123";

export const MOCK_USER: User = {
  id: "mock-id-123",
  email: "diogo.brando@domvsit.com.br",
  name: "Diogo Brando",
  provider: "local",
  microsoftId: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isAdmin: true,
};

export async function mockLoginRequest(email: string): Promise<User> {
  console.log("--- MOCK LOGIN INITIATED ---");
  console.log("Email:", email);

  await new Promise((resolve) => setTimeout(resolve, 800));

  Cookies.set("app-token", MOCK_TOKEN, { expires: 7, path: "/" });
  api.defaults.headers.common["Authorization"] = `Bearer ${MOCK_TOKEN}`;

  return MOCK_USER;
}

export function mockSessionRecovery(): User {
  api.defaults.headers.common["Authorization"] = `Bearer ${MOCK_TOKEN}`;
  return MOCK_USER;
}
