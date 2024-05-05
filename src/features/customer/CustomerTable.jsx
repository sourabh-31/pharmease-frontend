import toast from "react-hot-toast";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CustomerHeader from "./CustomerHeader";
import { useCustomers } from "./useCustomerAction";
import CustomerRow from "./CustomerRow";
import { useInvoiceContext } from "../../context/InvoiceContext";

function CustomerTable() {
  const { isLoading, customers, error } = useCustomers();

  const { customerSearch: searchQuery } = useInvoiceContext();

  const ascCustomers = customers?.sort((a, b) =>
    typeof a.medicineName === "string"
      ? a.medicineName.localeCompare(b.medicineName)
      : a.medicineName - b.medicineName
  );

  const filteredCustomers = ascCustomers.filter((customer) => {
    const nameMatch = customer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const mobileNumberMatch = customer.mobileNumber
      .toString()
      .includes(searchQuery);
    return nameMatch || mobileNumberMatch;
  });

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <CustomerHeader />
      <Table column="1.8fr 1.2fr 1fr 0.8fr 0.8fr">
        <Table.Header>
          <div>Customer Name</div>
          <div>Mobile No.</div>
          <div>Address</div>
          <div>Sex</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={filteredCustomers}
          render={(customer) => (
            <CustomerRow key={customer._id} customer={customer} />
          )}
        />
      </Table>
      <Table.Footer />
    </>
  );
}

export default CustomerTable;
