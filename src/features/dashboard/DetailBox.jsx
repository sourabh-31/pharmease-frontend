import ArrowLogo from "../../data/assets/arrow.svg";

function DetailBox({ children }) {
  return (
    <div className="rounded-lg border-[1px] border-[#1d242e] bg-white">
      {children}
    </div>
  );
}

function Header({ children }) {
  return (
    <div className="flex items-center justify-between border-b-[1px] border-[#d1d5db]  py-2 px-6">
      {children}
    </div>
  );
}

function Heading({ children }) {
  return <p className="text-lg 2xl:text-xl font-bold">{children}</p>;
}

function Action({ children, onClick }) {
  return (
    <button className="flex items-center gap-2" onClick={onClick}>
      <span className="text-xs xl:text-sm">{children}</span>
      <img src={ArrowLogo} alt="arrow" />
    </button>
  );
}

function Body({ children }) {
  return (
    <div className="flex items-center justify-between p-8">{children}</div>
  );
}

function DetailPart1({ children, position }) {
  if (position === "center")
    return <div className="flex flex-col items-center py-8">{children}</div>;

  return <div className="flex flex-col items-center">{children}</div>;
}

function DetailPart2({ children }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

DetailBox.Header = Header;
DetailBox.Heading = Heading;
DetailBox.Action = Action;
DetailBox.Body = Body;
DetailBox.DetailPart1 = DetailPart1;
DetailBox.DetailPart2 = DetailPart2;

export default DetailBox;
