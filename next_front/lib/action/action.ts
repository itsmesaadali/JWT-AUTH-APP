import { toast } from "react-toastify";
import { signupSchema, loginSchema } from "@/lib/utils/validateSchema";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";

const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-script")) {
      return resolve();
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-script";
    script.onload = () => resolve();
    script.onerror = () => reject("Google script failed to load");
    document.body.appendChild(script);
  });
};

interface AuthActions {
  login: (
    values: z.infer<typeof loginSchema>,
    setLoading?: (loading: boolean) => void
  ) => Promise<void>;
  signup: (
    values: z.infer<typeof signupSchema>,
    setLoading?: (loading: boolean) => void
  ) => Promise<void>;
  googleSignIn: (setLoading?: (loading: boolean) => void) => Promise<void>;
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

 const handleGoogleSignIn = async (setLoading?: (loading: boolean) => void) => {
  setLoading?.(true);
  try {
    await loadGoogleScript();

    if (!window.google || !window.google.accounts?.oauth2) {
      throw new Error("Google API not loaded properly");
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      scope: "email profile openid", // required!
      callback: async (response: any) => {
        try {
          if (response.access_token) {
            await googleLogin(response.access_token);
            toast.success("Signed in with Google!");
          } else {
            throw new Error("No access token received");
          }
        } catch (error: any) {
          toast.error(error.message || "Google Sign-In failed");
        } finally {
          setLoading?.(false);
        }
      },
    });

    tokenClient.requestAccessToken();
  } catch (error: any) {
    toast.error(error.message || "Google Sign-In initialization failed");
    setLoading?.(false);
  }
};


  return {
    login: handleLogin,
    signup: handleSignup,
    googleSignIn: handleGoogleSignIn,
  };
};
