import AddCustomerForm from "../features/invoice/AddCustomerForm";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";

function Invoice() {
  return (
    <section className="px-12 mt-6">
      <div className="flex justify-between items-center mr-4">
        <div>
          <Heading>Invoice</Heading>
          <SubHeading>Generate receipt for the customers.</SubHeading>
        </div>
      </div>
      <AddCustomerForm />
    </section>
  );
}

export default Invoice;
