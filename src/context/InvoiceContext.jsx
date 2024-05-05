import { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

function InvoiceProvider({ children }) {
  const [groupId, setGroupId] = useState("");
  const [medId, setMedId] = useState("");
  const [isCustomerDeleteClicked, setIsCustomerDeleteClicked] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  const [discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(0);
  const [grossTotal, setGrossTotal] = useState([]);

  const [medicinesList, setMedicinesList] = useState([]);

  const [selectedMedicines, setSelectedMedicines] = useState([]);

  function toggleCustomerDelete() {
    setIsCustomerDeleteClicked((val) => !val);
  }

  return (
    <InvoiceContext.Provider
      value={{
        groupId,
        setGroupId,
        medId,
        setMedId,
        isCustomerDeleteClicked,
        toggleCustomerDelete,
        customerSearch,
        setCustomerSearch,
        discount,
        setDiscount,
        gst,
        setGst,
        grossTotal,
        setGrossTotal,
        medicinesList,
        setMedicinesList,
        selectedMedicines,
        setSelectedMedicines,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

function useInvoiceContext() {
  const context = useContext(InvoiceContext);

  if (context === undefined) {
    throw new Error("Invoice context was used outside the provider");
  }

  return context;
}

export { InvoiceProvider, useInvoiceContext };

export default InvoiceContext;
