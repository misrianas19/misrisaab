import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/AdminDashboard";
import Navbar from "@/components/Navbar";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Not logged in
  if (!session) {
    redirect("/auth/login");
  }

  // Logged in but not admin
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#030305] pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              ADMIN <span className="text-neon-cyan">PORTAL</span>
            </h1>
            <p className="text-gray-400">
              Overview of business performance and inquiries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AdminDashboard />
        </div>
      </div>
    </main>
  );
}
