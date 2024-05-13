import Signup from "../features/authentication/Signup";
import Navbar from "../features/landingPage/Navbar";

function Register() {
  return (
    <div className="mx-20 my-6">
      <Navbar />
      <Signup />
    </div>
  );
}

export default Register;
