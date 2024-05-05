function CustomerRow({ label, children, error = "" }) {
  return (
    <div className="grid grid-cols-3 gap-8 items-center">
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <div className="text-[#b91c1c]">{error}</div>}
    </div>
  );
}

export default CustomerRow;
