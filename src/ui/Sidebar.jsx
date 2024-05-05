import styles from "../styles/Sidebar.module.css";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Profile from "./Profile";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <Profile />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
