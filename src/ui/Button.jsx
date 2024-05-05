function Button({
  children,
  img,
  imgWidth = "",
  bgColor = "#fff",
  textColor = "#fff",
  onClick,
  border = false,
  type = "",
  disabled = "",
}) {
  const imageStyles = {
    width: imgWidth,
  };

  const StyledButton = {
    backgroundColor: bgColor,
    color: textColor,
    borderRadius: "0.375rem",
    border: border ? "1px solid #6b7280" : "none",
  };

  return (
    <button
      className="flex items-center gap-2 py-3 px-5"
      style={StyledButton}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {img && <img src={img} alt="icon" style={imageStyles} />}

      {children}
    </button>
  );
}

export default Button;
