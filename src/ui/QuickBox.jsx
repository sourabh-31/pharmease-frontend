import { createContext, useContext } from "react";

import ArrowLogo from "../data/assets/arrow.svg";

const QuickBoxContext = createContext();

function QuickBox({ children, color, bgColor, width }) {
  return (
    <QuickBoxContext.Provider
      value={{
        bgColor,
      }}
    >
      <div
        style={{ border: `3px solid ${color}`, width: `${width}vw` }}
        className="2xl:w-[22vw] h-[13rem] flex flex-col items-center relative rounded-lg bg-white"
      >
        {children}
      </div>
    </QuickBoxContext.Provider>
  );
}

function Icon({ children }) {
  return <div className="mt-6">{children}</div>;
}

function Value({ children }) {
  return <div className="text-xl font-bold mt-4">{children}</div>;
}

function Detail({ children }) {
  return <div className="font-medium mt-2">{children}</div>;
}

function Action({ children }) {
  const { bgColor } = useContext(QuickBoxContext);

  return (
    <button
      className="flex items-center gap-4 w-full justify-center p-2 mt-6 absolute bottom-0 rounded-b-md"
      style={{ backgroundColor: `${bgColor}` }}
    >
      <span className="text-sm">{children}</span>
      <img src={ArrowLogo} alt="arrow" />
    </button>
  );
}

QuickBox.Icon = Icon;
QuickBox.Value = Value;
QuickBox.Detail = Detail;
QuickBox.Action = Action;

export default QuickBox;
