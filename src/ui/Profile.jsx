import ProfileDefault from "../data/assets/pharmacy-profile.png";
import Border from "./Border";

function Profile() {
  return (
    <>
      <div className="flex items-center gap-4 ml-10 py-6">
        <img src={ProfileDefault} alt="profile" className="w-12" />
        <div>
          <p className="text-white text-xl font-medium">Sourabh Haldar</p>
          <p className="text-[#fbd404] font-light">Super Admin</p>
        </div>
      </div>
      <Border />
    </>
  );
}

export default Profile;
