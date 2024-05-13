import { useForm } from "react-hook-form";
import styles from "../../styles/AddCustomerForm.module.css";
import InvoiceRow from "../../ui/InvoiceRow";
import Search from "../../ui/Search";
import InvoiceTable from "./InvoiceTable";
import { useInvoiceContext } from "../../context/InvoiceContext";
import Button from "../../ui/Button";
import { useCreateCustomer, useCustomers } from "../customer/useCustomerAction";
import { useCreateInvoice } from "./useInvoiceAction";
import { useEffect, useState } from "react";
import { generateBillingNumber } from "../../utils/generateBillNo";
import { useSubtractMedicine } from "../inventory/useMedicineAction";
import toast from "react-hot-toast";

function AddCustomerForm() {
  const {
    discount,
    grossTotal,
    setMedicinesList,
    setSelectedMedicines,
    setGroupId,
    setMedId,
    selectedMedicines,
    medicinesList,
  } = useInvoiceContext();

  const grossAmt = grossTotal.reduce(
    (accumulator, currentMedicine) => accumulator + currentMedicine.total,
    0
  );

  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { errors } = formState;

  const { createCustomer } = useCreateCustomer();
  const { isCreating, createInvoice } = useCreateInvoice();
  const { subtractMedicine } = useSubtractMedicine();
  const { customers } = useCustomers();

  const [billNo, setBillNo] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const billNumber = generateBillingNumber();
    setBillNo(billNumber);
  }, []);

  function onSubmit(data) {
    if (grossTotal.length !== 0) {
      // Check if any medicine in grossTotal has quantity 0
      const medicinesWithZeroQuantity = grossTotal.filter(
        (med) => med.quantity === 0
      );

      if (medicinesWithZeroQuantity.length > 0) {
        // If there are medicines with quantity 0, show an error toast
        const zeroQuantityMedicineNames = medicinesWithZeroQuantity.map(
          (med) => med.medicineName
        );
        toast.error(
          `Please remove the following medicines from the list: ${zeroQuantityMedicineNames.join(
            ", "
          )}`
        );
        return; // Stop further execution
      }

      // Check if any medicine quantity is insufficient
      const insufficientMedicines = grossTotal.filter((med) => {
        const medFromList = medicinesList.find(
          (listMed) => listMed._id === med._id
        );
        const listMedQuantity = medFromList ? medFromList.quantity : 0;
        return listMedQuantity < med.quantity;
      });

      if (insufficientMedicines.length > 0) {
        // If there are insufficient medicines, show an error toast
        const insufficientMedicineNames = insufficientMedicines.map(
          (med) => med.medicineName
        );
        toast.error(
          `Insufficient quantity for the following medicines: ${insufficientMedicineNames.join(
            ", "
          )}`
        );
        return; // Stop further execution
      }

      const existingCustomer = customers.find(
        (customer) =>
          customer.name.toLowerCase() === data.name.toLowerCase() &&
          customer.mobileNumber === data.mobileNumber
      );

      if (!existingCustomer) {
        createCustomer(data, {
          onSuccess: () => {
            reset();
          },
        });
      }

      subtractMedicine(selectedMedicines);

      const netAmt = discount ? (grossAmt - discount).toFixed(2) : grossAmt;

      const newInvoice = {
        billNo,
        ...data,
        discount,
        totalBill: netAmt,
        medicineInfo: grossTotal,
      };

      createInvoice(newInvoice, {
        onSuccess: () => {
          reset();
          setMedicinesList([]);
          setSelectedMedicines([]);
          setGroupId("");
          setMedId("");
          const billNumber = generateBillingNumber();
          setBillNo(billNumber);
        },
      });
    }
  }

  function onError(errors) {
    // console.error(errors);
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCustomers(
      customers.filter((customer) =>
        customer.name.toLowerCase().includes(query)
      )
    );
    setShowSuggestions(query.length > 0);
  };

  const handleCustomerSelect = (customer) => {
    setValue("name", customer.name);
    setValue("mobileNumber", customer.mobileNumber);
    setValue("address", customer.address);
    setValue("sex", customer.sex);
    setFilteredCustomers([]);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="mt-6 mr-8">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Customer&apos;s Information</p>
            <div className="border-[1px] border-[#d1d5db]  rounded-md relative">
              <Search
                placeholderText="Search customer..."
                width="20"
                value={searchQuery}
                onChange={handleSearch}
              />
              {showSuggestions && filteredCustomers.length > 0 && (
                <div className="bg-white border border-gray-300 rounded-b-md absolute left-0 right-0 shadow-md max-h-[14rem] overflow-auto">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer._id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      {customer.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-20 mt-6">
            <div className="grid gap-4">
              <InvoiceRow label="Name" error={errors?.name?.message}>
                <input
                  type="text"
                  id="name"
                  className={styles.input}
                  {...register("name", {
                    required: "This Field is required",
                  })}
                />
              </InvoiceRow>

              <InvoiceRow
                label="Mobile Number"
                error={errors?.mobileNumber?.message}
              >
                <input
                  type="text"
                  id="mobileNumber"
                  className={styles.input}
                  {...register("mobileNumber", {
                    required: "This Field is required",
                    validate: {
                      isNumber: (value) =>
                        !isNaN(parseFloat(value)) ||
                        "Please enter a valid number",
                      isTenDigits: (value) =>
                        /^\d{10}$/.test(value) ||
                        "Mobile number must be 10 digits",
                    },
                  })}
                />
              </InvoiceRow>

              <InvoiceRow label="Address" error={errors?.address?.message}>
                <input
                  type="text"
                  id="address"
                  className={styles.input}
                  {...register("address", {
                    required: "This Field is required",
                  })}
                />
              </InvoiceRow>

              <InvoiceRow label="Sex" error={errors?.sex?.message}>
                <select
                  id="sex"
                  className={styles.input}
                  {...register("sex", {
                    required: "This Field is required",
                  })}
                >
                  <option value="">Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </InvoiceRow>
            </div>

            <div className="grid gap-4">
              <InvoiceRow
                label="Doctor Name"
                error={errors?.doctorName?.message}
              >
                <input
                  type="text"
                  id="doctorName"
                  className={styles.input}
                  {...register("doctorName", {
                    required: "This Field is required",
                  })}
                />
              </InvoiceRow>

              <InvoiceRow
                label="Address"
                error={errors?.doctorAddress?.message}
              >
                <input
                  type="text"
                  id="doctorAddress"
                  className={styles.input}
                  {...register("doctorAddress", {
                    required: "This Field is required",
                  })}
                />
              </InvoiceRow>

              <InvoiceRow label="Date" error={errors?.paidAt?.message}>
                <input
                  type="date"
                  id="paidAt"
                  className={styles.input}
                  {...register("paidAt", {
                    required: "This Field is required",
                  })}
                />
              </InvoiceRow>

              <InvoiceRow
                label="Mode of Payment"
                error={errors?.modeOfPayment?.message}
              >
                <select
                  id="modeOfPayment"
                  className={styles.input}
                  {...register("modeOfPayment", {
                    required: "This Field is required",
                  })}
                >
                  <option value="">Select an option</option>
                  <option value="cash">Cash</option>
                  <option value="online">Online</option>
                </select>
              </InvoiceRow>
            </div>
          </div>
          <div className="mt-12">
            <InvoiceTable />
          </div>
        </section>

        <section className="mt-6">
          <div className="flex justify-between items-center mr-10">
            <p className=" font-semibold" style={{ wordSpacing: "0.1rem" }}>
              BILLING NO - <span className="tracking-[0.05rem]">{billNo}</span>
            </p>
            <div className="flex items-center gap-6">
              <p className="flex items-center gap-2">
                <span>Gross Amt:</span>
                <span className="bg-[#01a768] text-white py-1 px-3 rounded-md">
                  Rs. {grossAmt.toFixed(2)}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>Discount:</span>
                <span className="bg-[#f0483e] text-white py-1 px-3 rounded-md">
                  Rs. {discount}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span>Net Amt:</span>
                <span className="bg-[#01a768] text-white py-1 px-3 rounded-md">
                  Rs. {(grossAmt - discount).toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-center justify-end mr-10 mt-12 mb-10">
            <Button
              bgColor="#e5f2ef"
              textColor="#000"
              disabled={isCreating}
              type="submit"
            >
              Save
            </Button>
            <Button
              bgColor="#e5f2ef"
              textColor="#000"
              disabled={isCreating}
              type="button"
            >
              Save & Print
            </Button>
            <Button
              bgColor="#e5f2ef"
              textColor="#000"
              disabled={isCreating}
              type="button"
            >
              Print
            </Button>
          </div>
        </section>
      </form>
    </>
  );
}

export default AddCustomerForm;
