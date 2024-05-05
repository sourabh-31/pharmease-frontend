import { useEffect } from "react";
import { useInvoiceContext } from "../../context/InvoiceContext";
import {
  useGetMedicine,
  useGetMedicinesByGroup,
} from "../inventory/useMedicineAction";
import InvoiceTableRow from "./InvoiceTableRow";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import AddGroup from "./AddGroup";
import AddMedicine from "./AddMedicine";
import AddDiscount from "./AddDiscount";
import AddGst from "./AddGst";

function InvoiceTable() {
  const {
    groupId,
    setGroupId,
    medId,
    setMedId,
    setGrossTotal,
    gst,
    medicinesList,
    setMedicinesList,
    selectedMedicines,
    setSelectedMedicines,
  } = useInvoiceContext();

  const { medicinesByGroup } = useGetMedicinesByGroup(groupId);
  const { singleMedicine } = useGetMedicine(medId);

  const handleQuantityChange = (medicineId, newQuantity) => {
    setSelectedMedicines((prevSelectedMedicines) => {
      const existingMedicineIndex = prevSelectedMedicines.findIndex(
        (med) => med.id === medicineId
      );

      if (existingMedicineIndex !== -1) {
        const updatedMedicines = [...prevSelectedMedicines];
        updatedMedicines[existingMedicineIndex].quantity = newQuantity;
        return updatedMedicines;
      } else {
        return [
          ...prevSelectedMedicines,
          { id: medicineId, quantity: newQuantity },
        ];
      }
    });
  };

  useEffect(() => {
    // Reset states when component unmounts
    return () => {
      setMedicinesList([]);
      setSelectedMedicines([]);
      setMedId("");
      setGroupId("");
    };
  }, []);

  useEffect(() => {
    const updatedMedicines = selectedMedicines.map((medicine) => {
      const medicineDetails = medicinesList.find(
        (med) => med._id === medicine.id
      );
      const price = medicineDetails ? medicineDetails.price : 0;
      const gstAmount = (price * medicine.quantity * gst) / 100;
      const total = price * medicine.quantity + gstAmount;
      const totalWithDecimal = parseFloat(total.toFixed(2));

      return { ...medicine, total: totalWithDecimal };
    });

    const updatedMedicinesStringified = JSON.stringify(updatedMedicines);
    const selectedMedicinesStringified = JSON.stringify(selectedMedicines);

    if (updatedMedicinesStringified !== selectedMedicinesStringified) {
      setSelectedMedicines(updatedMedicines);
    }
  }, [selectedMedicines, medicinesList, gst]);

  useEffect(() => {
    const customObjects = selectedMedicines
      .map((selectedMedicine) => {
        const medicineDetails = medicinesList.find(
          (med) => med._id === selectedMedicine.id
        );

        if (medicineDetails) {
          const { _id, medicineName, pack, batchNumber, expireDate, price } =
            medicineDetails;
          const { quantity, total } = selectedMedicine;

          return {
            _id,
            medicineName,
            pack,
            batchNumber,
            expireDate,
            price,
            quantity,
            gst,
            total,
          };
        }

        return null;
      })
      .filter(Boolean);

    setGrossTotal(customObjects);
  }, [setGrossTotal, selectedMedicines, medicinesList, gst]);

  useEffect(() => {
    const newMedicines = medicinesByGroup.filter(
      (newMedicine) =>
        !medicinesList.some(
          (existingMedicine) => existingMedicine._id === newMedicine._id
        )
    );
    if (newMedicines.length > 0) {
      setMedicinesList((prevMedicinesList) => [
        ...prevMedicinesList,
        ...newMedicines,
      ]);
    }
  }, [medicinesByGroup, medicinesList]);

  useEffect(() => {
    if (singleMedicine && Object.keys(singleMedicine).length > 0) {
      const isSingleMedicineAlreadyAdded = medicinesList.some(
        (medicine) => medicine._id === singleMedicine._id
      );

      if (!isSingleMedicineAlreadyAdded) {
        setMedicinesList((prevMedicinesList) => [
          ...prevMedicinesList,
          singleMedicine,
        ]);
      }
    }
  }, [singleMedicine, medicinesList]);

  function handleRemoveClicked() {
    setMedicinesList([]);
    setSelectedMedicines([]);
    setGroupId("");
    setMedId("");
  }

  return (
    <div>
      <div className="flex justify-between items-center mr-1 mb-12">
        <div className="flex gap-6">
          <Modal>
            <Modal.Open opens="add-medicine-invoice">
              <Button bgColor="#01a768" type="button">
                Add New Item
              </Button>
            </Modal.Open>
            <Modal.Window name="add-medicine-invoice">
              <AddMedicine />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open opens="add-group-invoice">
              <Button bgColor="#01a768" type="button">
                Add New Group
              </Button>
            </Modal.Open>
            <Modal.Window name="add-group-invoice">
              <AddGroup />
            </Modal.Window>
          </Modal>

          {medicinesList.length !== 0 && (
            <Modal>
              <Modal.Open opens="add-discount">
                <Button bgColor="#1d242e" type="button">
                  Add Discount
                </Button>
              </Modal.Open>
              <Modal.Window name="add-discount">
                <AddDiscount />
              </Modal.Window>
            </Modal>
          )}

          {medicinesList.length !== 0 && (
            <Modal>
              <Modal.Open opens="add-gst">
                <Button bgColor="#1d242e" type="button">
                  Add GST%
                </Button>
              </Modal.Open>
              <Modal.Window name="add-gst">
                <AddGst />
              </Modal.Window>
            </Modal>
          )}
        </div>

        <Button bgColor="#f0483e" type="button" onClick={handleRemoveClicked}>
          Remove Medicines
        </Button>
      </div>
      <Table column="2fr 0.8fr 1.2fr 1fr 0.8fr 0.8fr 0.8fr 1.4fr">
        <Table.Header>
          <div>Medicine</div>
          <div>Pack</div>
          <div>Batch No.</div>
          <div>Exp Dt.</div>
          <div>Price</div>
          <div>Qty</div>
          <div>GST%</div>
          <div>Amount</div>
        </Table.Header>
        <Table.Body
          data={medicinesList}
          render={(medicine) => (
            <InvoiceTableRow
              key={medicine._id}
              medicine={medicine}
              onQuantityChange={handleQuantityChange}
            />
          )}
        />
      </Table>
    </div>
  );
}

export default InvoiceTable;
