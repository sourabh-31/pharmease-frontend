import DashboardDetails from "../features/dashboard/DashboardDetails";
import DashboardOverview from "../features/dashboard/DashboardOverview";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";

function Dashboard() {
  return (
    <section className="px-12 mt-6">
      <Heading>Dashboard</Heading>
      <SubHeading>A quick data overview of the inventory.</SubHeading>
      <DashboardOverview />
      <DashboardDetails />
    </section>
  );
}

export default Dashboard;
