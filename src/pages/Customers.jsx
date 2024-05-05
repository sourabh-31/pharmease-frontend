import PlusIcon from "../data/inventory-assets/plus.svg";
import AddCustomerForm from "../features/customer/AddCustomerForm";
import CustomerTable from "../features/customer/CustomerTable";

import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import SubHeading from "../ui/SubHeading";

function Customers() {
  return (
    <section className="pl-12 pr-16 mt-6">
      <div className="flex items-center justify-between">
        <div>
          <Heading>Customers</Heading>
          <SubHeading>List of all customers</SubHeading>
        </div>
        <Modal>
          <Modal.Open opens="addCustomer">
            <Button img={PlusIcon} bgColor="#01a768">
              Add New Customer
            </Button>
          </Modal.Open>
          <Modal.Window name="addCustomer">
            <AddCustomerForm />
          </Modal.Window>
        </Modal>
      </div>
      <CustomerTable />
    </section>
  );
}

export default Customers;
