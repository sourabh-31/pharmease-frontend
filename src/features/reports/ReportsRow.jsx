import Table from "../../ui/Table";
import DoubleArrowIcon from "../../data/inventory-assets/double-arrow.svg";

function ReportsRow({ invoice }) {
  const { _id, billNo, name, mobileNumber, medicineInfo, paidAt } = invoice;

  return (
    <Table.Row>
      <div>{billNo}</div>
      <div>{paidAt}</div>
      <div>{name}</div>
      <div>{mobileNumber}</div>
      <div>{medicineInfo?.length}</div>
      <button className="flex items-center gap-3">
        <p className="text-sm font-semibold">View Detail</p>
        <img src={DoubleArrowIcon} alt="doubleArrow" />
      </button>
    </Table.Row>
  );
}

export default ReportsRow;
