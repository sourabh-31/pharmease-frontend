import LogoutIcon from "../data/assets/logout.svg";
import { useLogoutUser } from "../features/authentication/useAuth";
import Button from "./Button";

function Logout() {
  const { isLoading, logout } = useLogoutUser();

  function handleLogoutClicked() {
    logout();
  }

  return (
    <>
      <Button
        img={LogoutIcon}
        imgWidth="1rem"
        textColor="#000"
        border={true}
        onClick={handleLogoutClicked}
        disabled={isLoading}
      >
        Logout
      </Button>
    </>
  );
}

export default Logout;
