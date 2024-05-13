import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../data/landing-assets/logo.svg";
import styles from "../../styles/Navbar.module.css";
import CloseBtn from "../../data/siginin-assets/close.svg";

function Navbar() {
  const navigate = useNavigate();

  const location = useLocation();

  function handleSignInClicked() {
    navigate("/login");
  }

  function handleCloseClick() {
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between">
      <img src={Logo} alt="logo" className="w-[10rem]" />
      {location.pathname === "/" ? (
        <>
          <nav>
            <ul className="flex items-center gap-12 font-medium text-lg">
              <li>
                <button>Home</button>
              </li>
              <li>
                <button>Features</button>
              </li>
              <li>
                <button>Pricing</button>
              </li>
              <li>
                <button>Contact Us</button>
              </li>
            </ul>
          </nav>
          <button
            className="bg-[#01a768] text-white py-3 px-8 font-medium"
            onClick={handleSignInClicked}
          >
            Sign In
          </button>
        </>
      ) : (
        <button onClick={handleCloseClick} className={styles.closeBtn}>
          <img src={CloseBtn} alt="close" />
        </button>
      )}
    </header>
  );
}

export default Navbar;
