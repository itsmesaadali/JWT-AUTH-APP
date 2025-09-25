// lib/action/action.ts
import { toast } from "react-toastify";
import { signupSchema, loginSchema } from "@/lib/utils/validateSchema";
import { z } from "zod";
import { useAuth } from "@/context/auth-provider";

interface AuthActions {
  login: (values: z.infer<typeof loginSchema>, setLoading?: (l: boolean) => void) => Promise<void>;
  signup: (values: z.infer<typeof signupSchema>, setLoading?: (l: boolean) => void) => Promise<void>;
  handleGoogleLogin: (idToken: string, setLoading?: (l: boolean) => void) => Promise<void>;
}

export const useAuthActions = (): AuthActions => {
  const { login, register, googleLogin } = useAuth();

  const handleLogin = async (values: z.infer<typeof loginSchema>, setLoading?: (l: boolean) => void) => {
    setLoading?.(true);
    try {
      const user = await login({ email: values.email, password: values.password });
      toast.success(`Welcome back, ${user.name || "user"}!`);
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Login failed";
      toast.error(msg);
      throw error;
    } finally {
      setLoading?.(false);
    }
  };

  const handleSignup = async (values: z.infer<typeof signupSchema>, setLoading?: (l: boolean) => void) => {
    setLoading?.(true);
    try {
      const user = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast.success(`Account created. Welcome, ${user.name}!`);
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Signup failed";
      toast.error(msg);
      throw error;
    } finally {
      setLoading?.(false);
    }
  };

  const handleGoogleLogin = async (idToken: string, setLoading?: (l: boolean) => void) => {
    setLoading?.(true);
    try {
      const user = await googleLogin(idToken);
      toast.success(`Signed in with Google!`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Google Sign-In failed");
      throw error;
    } finally {
      setLoading?.(false);
    }
  };

  return { login: handleLogin, signup: handleSignup, handleGoogleLogin };
};
