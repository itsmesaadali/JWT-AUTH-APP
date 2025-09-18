// @/lib/action/action.ts
import { toast } from "react-toastify";
import { signupSchema, loginSchema } from "@/lib/utils/validateSchema";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";


interface AuthActions {
  login: (
    values: z.infer<typeof loginSchema>,
    setLoading?: (loading: boolean) => void
  ) => Promise<void>;
  signup: (
    values: z.infer<typeof signupSchema>,
    setLoading?: (loading: boolean) => void
  ) => Promise<void>;
  // This new function will handle the ID token from the component
  handleGoogleLogin: (idToken: string, setLoading?: (loading: boolean) => void) => Promise<void>;
}

export const useAuthActions = (): AuthActions => {
  const { login, register, googleLogin } = useAuth();

  const handleLogin = async (
    values: z.infer<typeof loginSchema>,
    setLoading?: (loading: boolean) => void
  ) => {
    setLoading?.(true);
    try {
      await login({ email: values.email, password: values.password });
      toast.success("Successfully logged in!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading?.(false);
    }
  };

  const handleSignup = async (
    values: z.infer<typeof signupSchema>,
    setLoading?: (loading: boolean) => void
  ) => {
    setLoading?.(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      toast.success("Account created successfully!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading?.(false);
    }
  };

  const handleGoogleLogin = async (idToken: string, setLoading?: (loading: boolean) => void) => {
    setLoading?.(true);
    try {
      await googleLogin(idToken);
      toast.success("Signed in with Google!");
    } catch (error: any) {
      toast.error(error.message || "Google Sign-In failed");
      throw error; 
    } finally {
      setLoading?.(false);
    }
  };

  return {
    login: handleLogin,
    signup: handleSignup,
    handleGoogleLogin, 
  };
};