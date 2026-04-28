import Link from "next/link";
import Layout from "../../components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Next.js + TypeScript Example",
};

const AboutPage = () => (
  <Layout>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

export default AboutPage;
