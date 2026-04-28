import { notFound } from "next/navigation";

import { User } from "../../../interfaces";
import { sampleUserData } from "../../../utils/sample-data";
import Layout from "../../../components/Layout";
import ListDetail from "../../../components/ListDetail";

// Get the paths we want to pre-render based on users
export async function generateStaticParams() {
  return sampleUserData.map((user) => ({
    id: user.id.toString(),
  }));
}

type Props = {
  params: { id: string };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const StaticPropsDetail = async ({ params }: Props) => {
  try {
    const { id } = params;
    const item: User | undefined = sampleUserData.find(
      (data) => data.id === Number(id)
    );

    // { fallback: false } means other routes should 404.
    if (!item) {
      notFound();
    }

    return (
      <Layout
        title={`${item ? item.name : "User Detail"} | Next.js + TypeScript Example`}
      >
        {item && <ListDetail item={item} />}
      </Layout>
    );
  } catch (err: any) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {err.message}
        </p>
      </Layout>
    );
  }
};

export default StaticPropsDetail;
