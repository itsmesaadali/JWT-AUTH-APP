import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface EmailVerificationProps {
    username:string;
    userEmail:string;
    verifyUrl:string;
}

const EmailVerification = (props:EmailVerificationProps) => {
  const { username, verifyUrl, userEmail  } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Verify your email address to complete your registration</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section>
              <Heading className="text-[32px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                Verify Your Email
              </Heading>
            </Section>

            {/* Main Content */}
            <Section>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Hi there!
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Thank you {username }for signing up! To complete your registration and secure your account, 
                please verify your email address by clicking the button below.
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[32px]">
                Email: <strong>{userEmail}</strong>
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verifyUrl}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                If the button doesn't work, you can also copy and paste this link into your browser:
              </Text>
              
              <Text className="text-[14px] text-blue-600 leading-[20px] mb-[32px] break-all">
                {verifyUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[32px]">
                This verification link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[32px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] mb-[8px] m-0">
                If you didn't create an account, you can safely ignore this email.
              </Text>
              
              <Text className="text-[12px] text-gray-500 leading-[16px] mb-[16px]">
                Best regards,<br />
                The Team
              </Text>

              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                © 2025 Your Company Name. All rights reserved.<br />
                123 Business Street, Rawalpindi, Pakistan
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default EmailVerification;