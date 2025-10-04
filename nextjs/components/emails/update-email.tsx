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

interface UpdateEmailVerificationProps {
    userEmail:string;
    companyName:string;
    verifyUrl:string;
}
const UpdateVerifyEmail = (props: UpdateEmailVerificationProps) => {
  const { userEmail = "john.doe@example.com", verifyUrl = "#", companyName = "YourApp" } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your updated email address to secure your account</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="mx-auto bg-white rounded-[8px] shadow-sm max-w-[600px] px-[40px] py-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Verify Your Updated Email
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Confirm your new email address to secure your account
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Your email address has been successfully updated in your {companyName} account. To complete this change and ensure your account remains secure, please verify your new email address by clicking the button below.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                Your new email address: <strong>{userEmail}</strong>
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={verifyUrl}
                className="bg-green-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Verify Updated Email
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                If the button doesn't work, copy and paste this link into your browser:
              </Text>
              <Link
                href={verifyUrl}
                className="text-green-600 text-[14px] break-all underline"
              >
                {verifyUrl}
              </Link>
            </Section>

            {/* Important Notice */}
            <Section className="bg-amber-50 border border-amber-200 rounded-[8px] p-[20px] mb-[32px]">
              <Text className="text-[14px] text-amber-800 leading-[20px] m-0 mb-[8px]">
                <strong>Important:</strong>
              </Text>
              <Text className="text-[14px] text-amber-700 leading-[20px] m-0">
                Until you verify this new email address, you'll continue to receive important notifications at your previous email. This verification link will expire in 24 hours for security purposes.
              </Text>
            </Section>

            {/* Security Note */}
            <Section className="bg-gray-50 rounded-[8px] p-[20px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px]">
                <strong>Didn't update your email?</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                If you didn't request this email change, please contact our support team immediately to secure your account.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                {companyName} Team
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                123 Business Street, Suite 100
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[16px]">
                San Francisco, CA 94105
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                © 2024 {companyName}. All rights reserved. |{' '}
                <Link href="#" className="text-gray-400 underline">
                  Contact Support
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default UpdateVerifyEmail;