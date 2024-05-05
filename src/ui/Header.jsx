import DateTime from "./DateTime";
import Logout from "./Logout";
import Search from "./Search";

function Header() {
  return (
    <header className="border-b-[1px] border-[#e3e4e6] h-[4.6rem] flex items-center justify-between">
      <div className="ml-10">
        <Search
          placeholderText="Search for anything here..."
          width="30"
          bgColor="#e3ebf3"
        />
      </div>
      <div className="flex items-center gap-16 mr-16">
        <DateTime />
        <Logout />
      </div>
    </header>
  );
}

export default Header;
