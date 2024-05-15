import { useEffect } from "react";
import NotificationIcon from "../../data/main-nav-assets/bell.svg";
import CrossLogo from "../../data/main-nav-assets/cross.svg";
import NotMed from "../../data/main-nav-assets/notmed.svg";
import Megaphone from "../../data/main-nav-assets/megaphone.svg";
import styles from "../../styles/Notification.module.css";
import { useReportContext } from "../../context/ReportContext";

function Notification() {
  const { setIsNotificationVisible, notifications } = useReportContext();

  return (
    <section className="bg-[#0f212e] w-[24rem] rounded-md">
      <div className="flex justify-between py-3 px-4 bg-[#0f212e] rounded-t-md border-b border-[#213743]">
        <div className="text-white flex items-center gap-1">
          <img src={NotificationIcon} alt="bell" className="w-4" />
          <p>Notifications</p>
        </div>
        <button onClick={() => setIsNotificationVisible(false)}>
          <img src={CrossLogo} alt="cross" className="w-5" />
        </button>
      </div>

      <div
        className={`max-h-[22rem] overflow-y-auto shadow-2xl ${styles.notificationBody}`}
      >
        <div className="mt-4">
          {notifications?.map((notification, index) => (
            <div key={index} className={styles.notification}>
              <div className="bg-[#1a2c38] flex items-center justify-center">
                <img src={NotMed} alt="notmed" className="w-8" />
              </div>
              <div className="bg-[#213743] flex flex-col justify-center p-4">
                <p className="text-white font-medium">
                  {notification.type === "expiring"
                    ? "Medicine Expiring"
                    : "Medicine Shortage"}
                </p>
                <p className="text-slate-300 leading-5 text-sm">
                  {notification.type === "expiring"
                    ? notification.description
                    : `${notification.medicineName} is in shortage. Only ${notification.quantity} left.`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center py-8">
          <img src={Megaphone} alt="megaphone" className="w-16" />
          <p className="text-slate-300 text-center font-semibold">
            That&apos;s all of your notifications.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Notification;
