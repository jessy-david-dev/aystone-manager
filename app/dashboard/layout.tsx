import Providers from "@/app/providers";
import Sidebar from "./Sidebar";

export const metadata = { title: "Dashboard | Aystone" };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-[#0e0e10] text-amber-50">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </Providers>
  );
}
