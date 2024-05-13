import { NavLink, useLocation } from "react-router-dom";

import DashboardIcon from "../data/main-nav-assets/dashboard.svg";
import InventoryIcon from "../data/main-nav-assets/inventory.svg";
import ReportsIcon from "../data/main-nav-assets/reports.svg";
import InvoiceIcon from "../data/main-nav-assets/invoice.svg";
import StaffIcon from "../data/main-nav-assets/staff.svg";
import CustomerIcon from "../data/main-nav-assets/customer.svg";
import NotificationIcon from "../data/main-nav-assets/notification.svg";
import HelpIcon from "../data/main-nav-assets/help.svg";
import SettingsIcon from "../data/main-nav-assets/settings.svg";
import UpArrowIcon from "../data/main-nav-assets/up-arrow.svg";
import DownArrowIcon from "../data/assets/down-arrow.svg";

import styles from "../styles/MainNav.module.css";
import Border from "./Border";

function MainNav() {
  const location = useLocation();
  const pathName = location.pathname.startsWith("/inventory");

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/dashboard" className={styles.navLink}>
            <img src={DashboardIcon} alt="dbIcon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={styles.navLink}>
            <div className="flex items-center gap-4">
              <img src={InventoryIcon} alt="invtyIcon" />
              <span>Inventory</span>
            </div>
            <img
              src={pathName ? UpArrowIcon : DownArrowIcon}
              alt="upArrow"
              className="absolute right-8 scale-75"
            />
          </NavLink>
        </li>

        {pathName && (
          <div className="bg-[#1d242e]">
            <li>
              <NavLink
                to="/inventory/medicines"
                className={`${styles.navLink} ${styles.subNavLink}`}
              >
                <span>List of Medicines</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inventory/groups"
                className={`${styles.navLink} ${styles.subNavLink}`}
              >
                <span>Medicine Groups</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/inventory/expired"
                className={`${styles.navLink} ${styles.subNavLink}`}
              >
                <span>Expired Medicines</span>
              </NavLink>
            </li>
          </div>
        )}
        <li>
          <NavLink to="/reports" className={styles.navLink}>
            <img src={ReportsIcon} alt="rptsIcon" />
            <span>Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoice" className={styles.navLink}>
            <img src={InvoiceIcon} alt="ivcIcon" />
            <span>Invoice</span>
          </NavLink>
        </li>
        <Border />
        <li>
          <NavLink to="/manage-customer" className={styles.navLink}>
            <img src={CustomerIcon} alt="stffIcon" />
            <span>Customer Management</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications" className={styles.navLink}>
            <img src={NotificationIcon} alt="ntfctnIcon" />
            <span>Notifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className={styles.navLink}>
            <img src={HelpIcon} alt="hlpIcon" />
            <span>Help</span>
          </NavLink>
        </li>
        <Border />
        <li>
          <NavLink to="/profile" className={styles.navLink}>
            <img src={SettingsIcon} alt="dbIcon" />
            <span>Profile Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
