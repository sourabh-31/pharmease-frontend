import { createContext, useContext, useState } from "react";

const ReportContext = createContext();

function ReportProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [query, setQuery] = useState("");
  const [deleteClicked, setDeleteClicked] = useState(false);

  const [isStatVisible, setIsStatVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  return (
    <ReportContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        query,
        setQuery,
        deleteClicked,
        setDeleteClicked,
        isStatVisible,
        setIsStatVisible,
        isNotificationVisible,
        setIsNotificationVisible,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

function useReportContext() {
  const context = useContext(ReportContext);

  if (context === undefined) {
    throw new Error("Report context was used outside the provider");
  }

  return context;
}

export { ReportProvider, useReportContext };

export default ReportContext;
