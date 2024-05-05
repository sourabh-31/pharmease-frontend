import { Outlet } from "react-router-dom";

import styles from "../styles/AppLayout.module.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <Header />
      <Sidebar />
      <main className="bg-[#f9fafb]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
