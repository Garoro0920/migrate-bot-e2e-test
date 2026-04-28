import { notFound } from "next/navigation";

import { User } from "../../../interfaces";
import { sampleUserData } from "../../../utils/sample-data";
import Layout from "../../../components/Layout";
import ListDetail from "../../../components/ListDetail";

// Pre-render only these paths at build time.
// Paths not returned here will 404 (equivalent to fallback: false).
export async function generateStaticParams() {
  // Get the paths we want to pre-render based on users
  return sampleUserData.map((user) => ({
    id: user.id.toString(),
  }));
}

type Props = {
  params: { id: string };
};

// This function runs at build time on the server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const StaticPropsDetail = async ({ params }: Props) => {
  try {
    const { id } = params;
    const item: User | undefined = sampleUserData.find(
      (data) => data.id === Number(id)
    );

    if (!item) {
      // { fallback: false } behaviour: unknown ids should 404
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
