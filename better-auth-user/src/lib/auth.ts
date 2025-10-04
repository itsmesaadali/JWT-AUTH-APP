// Database imports

import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";


// Better auth imports

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod } from "better-auth/plugins";

// Resend email imports

import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import EmailVerification from "@/components/emails/verify-email";
import UpdateVerifyEmail from "@/components/emails/update-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  user: {
    changeEmail: {
      enabled: true,
     sendChangeEmailVerification: async({user, url})=> {
       resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: 'Approve email change',
        react: UpdateVerifyEmail({
          companyName: 'Better auth web',
          verifyUrl: url,
          userEmail: user.email,
        }),
      });
     },
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email",
        react: EmailVerification({
          username: user.name,
          verifyUrl: url,
          userEmail: user.email,
        }),
      });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
        prompt: "select_account", 
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
},
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
    },
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [lastLoginMethod(), nextCookies()],
});
