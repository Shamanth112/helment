import { Sidebar } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-layout">
      <Sidebar user={null} notificationCount={2} />
      <main className="app-main pt-14 lg:pt-0 pb-20 lg:pb-0">
        <div className="min-h-full p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}