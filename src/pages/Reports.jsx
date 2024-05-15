import ReportsHeader from "../features/reports/ReportsHeader";
import ReportsTable from "../features/reports/ReportsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";
import TrashIcon from "../data/inventory-assets/trash.svg";
import { useReportContext } from "../context/ReportContext";

function Reports() {
  const { setDeleteClicked, deleteClicked } = useReportContext();

  function handleDeleteClicked() {
    setDeleteClicked((click) => !click);
  }

  return (
    <section className="px-12 mt-6">
      <div className="flex justify-between items-center mr-4">
        <div>
          <Heading>Reports</Heading>
          <SubHeading>Sales related report of the pharmacy.</SubHeading>
        </div>
        <Button
          bgColor={deleteClicked ? "#03a9f5" : "#f0483e"}
          img={!deleteClicked && TrashIcon}
          imgWidth="1.1rem"
          onClick={handleDeleteClicked}
        >
          {deleteClicked ? "Cancel Delete" : "Delete Report"}
        </Button>
      </div>
      <ReportsHeader />
      <ReportsTable />
    </section>
  );
}

export default Reports;
