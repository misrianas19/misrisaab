import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DebugPage() {
  const session = await getServerSession(authOptions);

  return (
    <pre style={{ padding: 20, fontSize: 16 }}>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
