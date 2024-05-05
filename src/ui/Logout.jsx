import LogoutIcon from "../data/assets/logout.svg";
import Button from "./Button";

function Logout() {
  return (
    <>
      <Button img={LogoutIcon} imgWidth="1rem" textColor="#000" border={true}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
