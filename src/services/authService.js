import api from "./api";

export const authService = {
  // Login with Sanctum session (CSRF token approach)
  async login(email, password) {
    try {
      // Step 1: Get CSRF cookie from sanctum/csrf-cookie endpoint
      await api.get("/sanctum/csrf-cookie");

      // Step 2: Login with credentials
      const response = await api.post("/api/mobile/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Logout
  async logout() {
    const response = await api.post("/logout");
    return response.data;
  },

  // Get current user
  async getUser() {
    const response = await api.get("/api/mobile/auth/user");
    return response.data;
  },
};
