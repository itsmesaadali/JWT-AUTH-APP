import api from "@/lib/axios";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/login", data);
    return res.data; // backend sends user + sets cookie
  },

  register: async (data: { name: string; email: string; password: string }) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  me: async () => {
    const res = await api.get("/users/me");
    return res.data;
  },

  refresh: async () => {
    const res = await api.get("/auth/refresh");
    return res.data;
  },

  logout: async () => {
    const res = await api.post("/auth/logout");
    return res.data;
  },
};
