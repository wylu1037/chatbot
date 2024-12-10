import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return <NotSignedInPage />;
  }
  redirect("/chat");
}

const NotSignedInPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-2xl font-bold">Not Signed In</h1>
    </div>
  );
};
