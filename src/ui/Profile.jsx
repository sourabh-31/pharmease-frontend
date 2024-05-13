import ProfileDefault from "../data/assets/pharmacy-profile.png";
import { useUser } from "../features/authentication/useAuth";
import Border from "./Border";

function Profile() {
  const { user } = useUser();

  const { ownerFirstName, ownerLastName, email } = user.user;

  return (
    <>
      <div className="flex items-center gap-4 ml-10 py-6">
        <img src={ProfileDefault} alt="profile" className="w-12" />
        <div>
          <p className="text-white text-xl font-medium">
            {ownerFirstName} {ownerLastName}
          </p>
          <p className="text-[#fbd404] font-light">{email}</p>
        </div>
      </div>
      <Border />
    </>
  );
}

export default Profile;
