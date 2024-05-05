import { useEffect, useState } from "react";
import Table from "../../ui/Table";
import TrashIcon from "../../data/inventory-assets/trash-black.svg";
import dayjs from "dayjs";
import { useInvoiceContext } from "../../context/InvoiceContext";

function InvoiceTableRow({ medicine, onQuantityChange }) {
  const { _id, medicineName, pack, batchNumber, expireDate, price } = medicine;

  const [value, setValue] = useState("");

  const { gst } = useInvoiceContext();

  // Calculate GST amount
  const gstAmount = (price * value * gst) / 100;

  // Calculate final amount including GST
  const finalAmount = price * value + gstAmount;

  const handleInputChange = (e) => {
    const newQuantity = +e.target.value;
    setValue(newQuantity);
    onQuantityChange(_id, newQuantity);
  };

  return (
    <Table.Row>
      <div>{medicineName}</div>
      <div>{pack}</div>
      <div>{batchNumber}</div>
      <div>{dayjs(expireDate).format("MM-YYYY")}</div>
      <div>Rs. {price}</div>
      <div>
        <input
          type="text"
          className="border-[1px] border-[#d1d5db] rounded-sm w-12 px-2"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      <div>{gst}%</div>
      <div>Rs. {finalAmount.toFixed(2)}</div>
    </Table.Row>
  );
}

export default InvoiceTableRow;
