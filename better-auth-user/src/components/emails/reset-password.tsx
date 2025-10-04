import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps  {
    username:string,
    resetUrl:string,
    userEmail:string,
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { userEmail , resetUrl, username  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[580px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello, {username}
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
              
              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If the button doesn't work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0">
                For security questions, please contact our support team.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px] mt-[32px]">
              <Text className="text-[14px] text-gray-500 leading-[20px] m-0 mb-[8px]">
                Best regards,<br />
                The Security Team
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0 mb-[8px]">
                123 Security Street, Tech City, TC 12345
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                <Link href="#" className="text-gray-400 underline">Unsubscribe</Link> | 
                © 2025 Your Company Name. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};



export default ForgotPasswordEmail;