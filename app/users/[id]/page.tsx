import { notFound } from "next/navigation";

import { User } from "../../../interfaces";
import { sampleUserData } from "../../../utils/sample-data";
import Layout from "../../../components/Layout";
import ListDetail from "../../../components/ListDetail";

// Pre-render only these paths at build time.
// Any other routes will 404 (equivalent to { fallback: false }).
export async function generateStaticParams() {
  // Get the paths we want to pre-render based on users
  return sampleUserData.map((user) => ({
    id: user.id.toString(),
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
const StaticPropsDetail = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const item: User | undefined = sampleUserData.find(
      (data) => data.id === Number(id)
    );

    if (!item) {
      notFound();
    }

    return (
      <Layout
        title={`${item ? item.name : "User Detail"} | Next.js + TypeScript Example`}
      >
        {/* By rendering item here, the component receives `item` as data at build time */}
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
