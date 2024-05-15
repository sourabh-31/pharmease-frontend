import Table from "../../ui/Table";
import DoubleArrowIcon from "../../data/inventory-assets/double-arrow.svg";
import TrashIcon from "../../data/inventory-assets/trash-black.svg";
import { useReportContext } from "../../context/ReportContext";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteInvoice } from "../invoice/useInvoiceAction";
import ViewReport from "./ViewReport";

function ReportsRow({ invoice }) {
  const { _id, billNo, name, mobileNumber, medicineInfo, paidAt } = invoice;

  const { deleteClicked } = useReportContext();

  const { isDeleting, deleteInvoice } = useDeleteInvoice();

  return (
    <Table.Row>
      <div>{billNo}</div>
      <div>{paidAt}</div>
      <Modal>
        {deleteClicked ? (
          <Modal.Open opens="delete-invoice">
            <button className="flex items-center gap-3">
              <img src={TrashIcon} alt="trashIcon" className="w-4" />
              <p className="text-sm font-semibold">Delete</p>
            </button>
          </Modal.Open>
        ) : (
          <Modal.Open opens="view-report">
            <button className="flex items-center gap-3">
              <p className="text-sm font-semibold">View Detail</p>
              <img src={DoubleArrowIcon} alt="doubleArrow" />
            </button>
          </Modal.Open>
        )}
        <Modal.Window name="view-report">
          <ViewReport invoice={invoice} />
        </Modal.Window>
        <Modal.Window name="delete-invoice">
          <ConfirmDelete
            resourceName={billNo}
            disabled={isDeleting}
            onConfirm={() => deleteInvoice(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ReportsRow;
