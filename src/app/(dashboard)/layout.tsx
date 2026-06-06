import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/backend";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await backendFetch("/auth/me");
  if (!res.ok) {
    redirect("/login");
  }
  const { user } = await res.json();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-[#FBF6EC] text-[#1A1714]">
      <Sidebar user={user} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
