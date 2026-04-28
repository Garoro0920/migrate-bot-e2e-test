import { notFound } from "next/navigation";

import { User } from "../../../interfaces";
import { sampleUserData } from "../../../utils/sample-data";
import Layout from "../../../components/Layout";
import ListDetail from "../../../components/ListDetail";

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function generateStaticParams() {
  // Get the paths we want to pre-render based on users
  return sampleUserData.map((user) => ({
    id: user.id.toString(),
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params;

  let item: User | undefined;
  let errors: string | undefined;

  try {
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    item = sampleUserData.find((data) => data.id === Number(id));
  } catch (err: any) {
    errors = err.message;
  }

  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  if (!item) {
    notFound();
  }

  return (
    <Layout
      title={`${
        item ? item.name : "User Detail"
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  );
}
