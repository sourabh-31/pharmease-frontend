import ResetPassword from "../features/forgot-password/ResetPassword";
import Navbar from "../features/landingPage/Navbar";

function ResetPasswordPage() {
  return (
    <div className="mx-20 my-6">
      <Navbar />
      <ResetPassword />
    </div>
  );
}

export default ResetPasswordPage;
