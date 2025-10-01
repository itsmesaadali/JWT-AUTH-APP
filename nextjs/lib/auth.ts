import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from 'resend'
import ForgotPasswordEmail from "@/components/emails/reset-password";
import EmailVerification from "@/components/emails/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  emailVerification:{
    sendVerificationEmail: async({ user, url, }) => {
      resend.emails.send({
        from:'onboarding@resend.dev',  
        to:user.email,
        subject:'Verify your email',
        react:EmailVerification({username:user.name, verifyUrl:url, userEmail:user.email })
      })
    },
    sendOnSignUp:true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async({ user, url }) => {
      resend.emails.send({
        from:'onboarding@resend.dev',  
        to:user.email,
        subject:'Reset your password',
        react:ForgotPasswordEmail({username:user.name, resetUrl:url , userEmail:user.email})
      })
    },
    requireEmailVerification: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins:[nextCookies()]
});


