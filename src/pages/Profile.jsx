import UserInfo from "../features/profile/UserInfo";
import Heading from "../ui/Heading";
import SubHeading from "../ui/SubHeading";

function Profile() {
  return (
    <section className="px-12 mt-6">
      <div>
        <Heading>Profile Settings</Heading>
        <SubHeading>Get detailed view of your profile</SubHeading>
      </div>
      <UserInfo />
    </section>
  );
}

export default Profile;
