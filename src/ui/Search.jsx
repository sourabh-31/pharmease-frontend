import SearchIcon from "../data/assets/search.svg";

function Search({ placeholderText, width, bgColor, value, onChange }) {
  return (
    <div className="relative">
      <input
        className="p-[0.65rem] pl-4 rounded-md outline-none placeholder:text-[0.95rem] "
        style={{ width: `${width}vw`, backgroundColor: bgColor }}
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
      />
      <img
        src={SearchIcon}
        alt="search"
        className="w-4 absolute top-[0.85rem] right-3"
      />
    </div>
  );
}

export default Search;
