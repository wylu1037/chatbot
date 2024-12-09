import { auth } from "@/server/auth";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return <NotSignedInPage />;
  }
  return <main className=""></main>;
}

const NotSignedInPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-2xl font-bold">Not Signed In</h1>
    </div>
  );
};
