import { Anchor, Container, Title } from "@mantine/core";
import { NextSeo } from "next-seo";

const PrivacyPolicyPage = () => {
  return (
    <>
      <NextSeo title={"Privacy Policy"} />
      <Container size={"xl"}>
        <Title order={1}>Privacy Policy</Title>
        <p>
          Your privacy is important to us, this privacy policy explains what personal information we collect and how it
          is used. The site collects this information to analyze and provide better experiences with our services.
        </p>
        <Title order={2}>Technologies and personal data</Title>
        <p>
          This site may use tools to collect user data, such as your IP address, web browser and operating system,
          identifying the number of visitors and understand how they use the site.
        </p>
        <Title order={2}>Cookies and advertising network</Title>
        <p>
          We use third-party advertising companies to serve ads when you visit our site. These companies, such as our
          advertisers, may use cookies (small text files placed on your device) and similar technologies to collect
          information for the purpose of displaying ads related to products and services of interest to you.
        </p>
        <p>
          This site may display advertisements served by Google advertising network, which uses cookies to identify user
          preferences and browsing habits. Users can get more information about these cookies and privacy on
          Google&apos;s website.
        </p>
        <p>
          Web browsers accept cookies automatically, but if you prefer you can modify the configuration of your browser
          to refuse cookies. However, this can affect how you are able to interact with our site and other sites on the
          Internet.
        </p>
        <Title order={2}>Other important information</Title>
        <p>
          If there are any questions regarding privacy or need any further information, please contact us at{" "}
          <Anchor href={`mailto:${process.env.NEXT_PUBLIC_APP_EMAIL}`}>{process.env.NEXT_PUBLIC_APP_EMAIL}</Anchor>.
        </p>
      </Container>
    </>
  );
};

export default PrivacyPolicyPage;
