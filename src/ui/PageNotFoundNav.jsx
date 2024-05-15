import CloseBtn from "../data/siginin-assets/close.svg";
import Logo from "../data/landing-assets/logo.svg";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PageNotFoundNav.module.css";

function PageNotFoundNav() {
  const navigate = useNavigate();

  function handleCloseClick() {
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between">
      <button onClick={handleCloseClick}>
        <img src={Logo} alt="logo" className="w-[10rem]" />
      </button>

      <button onClick={handleCloseClick} className={styles.closeBtn}>
        <img src={CloseBtn} alt="close" />
      </button>
    </header>
  );
}

export default PageNotFoundNav;
