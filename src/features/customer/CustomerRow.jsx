import { useInvoiceContext } from "../../context/InvoiceContext";

import DoubleArrowIcon from "../../data/inventory-assets/double-arrow.svg";
import TrashIcon from "../../data/inventory-assets/trash-black.svg";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

import Table from "../../ui/Table";
import ViewCustomer from "./ViewCustomer";
import { useDeleteCustomer } from "./useCustomerAction";

function CustomerRow({ customer }) {
  const { _id, name, mobileNumber, address, sex } = customer;

  const { isDeleting, deleteCustomer } = useDeleteCustomer();

  const { isCustomerDeleteClicked } = useInvoiceContext();

  return (
    <Table.Row>
      <div>{name}</div>
      <div>{mobileNumber}</div>
      <div>{address}</div>
      <div>{sex}</div>
      <Modal>
        {isCustomerDeleteClicked ? (
          <Modal.Open opens="deleteCustomer">
            <button className="flex items-center gap-3">
              <img src={TrashIcon} alt="trashIcon" className="w-4" />
              <p className="text-sm font-semibold">Delete</p>
            </button>
          </Modal.Open>
        ) : (
          <Modal.Open opens="viewCustomer">
            <button className="flex items-center gap-3">
              <p className="text-sm font-semibold">View Detail</p>
              <img src={DoubleArrowIcon} alt="doubleArrow" />
            </button>
          </Modal.Open>
        )}

        <Modal.Window name="viewCustomer">
          <ViewCustomer customer={customer} />
        </Modal.Window>

        <Modal.Window name="deleteCustomer">
          <ConfirmDelete
            resourceName={name}
            disabled={isDeleting}
            onConfirm={() => deleteCustomer(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CustomerRow;
