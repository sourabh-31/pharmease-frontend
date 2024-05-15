import { useNavigate } from "react-router-dom";
import styles from "../../styles/HeroSection.module.css";

function HeroSection() {
  const navigate = useNavigate();

  function handleGetStartedClick() {
    navigate("/register");
  }

  return (
    <section className={styles.heroSection}>
      <div className="absolute top-[30%] left-[15%]">
        <p className="bg-[#0fe3af] w-fit font-medium tracking-[0.4rem] px-2 py-1">
          WELCOME TO PHARMEASE
        </p>
        <div className="text-5xl font-bold tracking-[0.15rem] mt-6">
          <p>PharmEase -</p>
          <p className="mt-1">Simplifying Pharmacy</p>
          <p className="mt-1">Management</p>
        </div>
        <p className="w-[35rem] font-medium mt-4">
          PharmEase is your all-in-one solution for efficient pharmacy
          management. Streamline your operations, enhance customer service, and
          boost productivity with our comprehensive software.
        </p>
        <button
          className="bg-[#01a768] text-white py-4 px-8 font-medium mt-10"
          onClick={handleGetStartedClick}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
