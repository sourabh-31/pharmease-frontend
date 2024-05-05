import toast from "react-hot-toast";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { useInvoices } from "../invoice/useInvoiceAction";
import ReportsRow from "./ReportsRow";

function ReportsTable() {
  const { isLoading, invoices, error } = useInvoices();

  console.log(invoices);

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <Table column="1.1fr 1fr 1fr 1fr 1fr 0.8fr">
        <Table.Header>
          <div className="ml-1">Bill No.</div>
          <div>Date</div>
          <div>Name</div>
          <div>Mobile No.</div>
          <div className="-ml-2">Medicine Qty.</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={invoices}
          render={(invoice) => (
            <ReportsRow key={invoice._id} invoice={invoice} />
          )}
        />
      </Table>
      <Table.Footer />
    </>
  );
}

export default ReportsTable;
