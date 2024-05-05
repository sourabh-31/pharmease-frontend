import CrossIcon from "../data/assets/cross.svg";

function Box({ boxName, onClick, disabled }) {
  return (
    <div className="flex items-center gap-2  bg-[#a6dbcb] w-fit p-2 rounded-sm">
      <div className="text-sm">{boxName}</div>
      {!disabled && (
        <button onClick={onClick}>
          <img src={CrossIcon} alt="crossIcon" className="w-4" />
        </button>
      )}
    </div>
  );
}

export default Box;
