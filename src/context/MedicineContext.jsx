import { createContext, useContext, useState } from "react";

const MedicineContext = createContext();

function MedicineProvider({ children }) {
  const [isDeleteClicked, setDeleteClicked] = useState(false);
  const [groupDeleteClicked, setGroupDeleteClicked] = useState(false);
  const [groupName, setGroupName] = useState("Select Group");
  const [groupId, setGroupId] = useState("");

  const [medicineSearch, setMedicineSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [detailSearch, setDetailSearch] = useState("");
  const [expiredSearch, setExpiredSearch] = useState("");

  function toggleDelete() {
    setDeleteClicked((click) => !click);
  }

  function toggleGroupDelete() {
    setGroupDeleteClicked((click) => !click);
  }

  function handleGroupName(group) {
    setGroupName(group);
  }

  function handleGroupId(id) {
    setGroupId(id);
  }

  return (
    <MedicineContext.Provider
      value={{
        isDeleteClicked,
        toggleDelete,
        groupDeleteClicked,
        toggleGroupDelete,
        groupName,
        handleGroupName,
        groupId,
        handleGroupId,
        medicineSearch,
        setMedicineSearch,
        groupSearch,
        setGroupSearch,
        detailSearch,
        setDetailSearch,
        expiredSearch,
        setExpiredSearch,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

function useMedicineContext() {
  const context = useContext(MedicineContext);

  if (context === undefined) {
    throw new Error("Medicines context was used outside the provider");
  }

  return context;
}

export { MedicineProvider, useMedicineContext };

export default MedicineContext;
