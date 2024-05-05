import ReportsHeader from "../features/reports/ReportsHeader";
import ReportsTable from "../features/reports/ReportsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";
import TrashIcon from "../data/inventory-assets/trash.svg";

function Reports() {
  return (
    <section className="px-12 mt-6">
      <div className="flex justify-between items-center mr-4">
        <div>
          <Heading>Reports</Heading>
          <SubHeading>Sales related report of the pharmacy.</SubHeading>
        </div>
        <Button bgColor="#f0483e" img={TrashIcon} imgWidth="1.1rem">
          Delete Report
        </Button>
      </div>
      <ReportsHeader />
      <ReportsTable />
    </section>
  );
}

export default Reports;
