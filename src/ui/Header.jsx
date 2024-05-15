import DateTime from "./DateTime";
import Logout from "./Logout";
import NotificationIcon from "../data/main-nav-assets/notification.svg";
import { useReportContext } from "../context/ReportContext";
import {
  useExpiringMedicines,
  useShortageMedicines,
} from "../features/inventory/useMedicineAction";
import { useEffect } from "react";

function Header() {
  const { setIsNotificationVisible, notifications, setNotifications } =
    useReportContext();

  const { shortage } = useShortageMedicines();
  const { expiring } = useExpiringMedicines();

  useEffect(() => {
    const allNotifications = [
      ...shortage,
      ...expiring.map((med) => ({
        medicineName: med.medicineName,
        description: `${med.medicineName} is going to expire on ${med.expireDate}`,
        type: "expiring",
      })),
    ];
    setNotifications(allNotifications);
  }, [shortage, expiring, setNotifications]);

  const numNotifications = notifications?.length;

  function handleNotificationVisible() {
    setIsNotificationVisible((visible) => !visible);
  }

  return (
    <header className="border-b-[1px] border-[#e3e4e6] h-[4.6rem] flex items-center justify-between">
      <div className="relative ml-11">
        <button onClick={handleNotificationVisible}>
          <img src={NotificationIcon} alt="ntfctnIcon" />
          {numNotifications > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-[0.7rem] h-[0.7rem] flex items-center justify-center text-xs"></div>
          )}
        </button>
      </div>
      <div className="flex items-center gap-16 mr-16">
        <DateTime />
        <Logout />
      </div>
    </header>
  );
}

export default Header;
