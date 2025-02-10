import DashboardLayout from "@/layouts/dashboardLayout";
import { withLayout } from "@/utils/withLayout";

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang di Dashboard</p>
      {/* <Link href={`/dashboard/profile/${user.id}`}>{user.name}</Link> */}
    </div>
  );
}

export default withLayout(DashboardPage, DashboardLayout);
