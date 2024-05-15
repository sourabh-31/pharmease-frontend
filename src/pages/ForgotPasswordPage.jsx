import ForgotPassword from "../features/forgot-password/ForgotPassword";
import Navbar from "../features/landingPage/Navbar";

function ForgotPasswordPage() {
  return (
    <div className="mx-20 my-6">
      <Navbar />
      <ForgotPassword />
    </div>
  );
}

export default ForgotPasswordPage;
