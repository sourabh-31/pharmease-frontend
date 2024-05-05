function InvoiceRow({ label, children, error }) {
  return (
    <div>
      <div className="grid grid-cols-2 items-center">
        {label && <label htmlFor={children.props.id}>{label}</label>}
        {children}
      </div>
      {error && (
        <div className="flex justify-end mt-1 text-[#b91c1c]">{error}</div>
      )}
    </div>
  );
}

export default InvoiceRow;
