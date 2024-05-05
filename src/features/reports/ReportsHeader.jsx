import Search from "../../ui/Search";

const months = [
  { id: 0, value: "january", option: "January" },
  { id: 1, value: "february", option: "February" },
  { id: 2, value: "march", option: "March" },
  { id: 3, value: "april", option: "April" },
  { id: 4, value: "may", option: "May" },
  { id: 5, value: "june", option: "June" },
  { id: 6, value: "july", option: "July" },
  { id: 7, value: "august", option: "August" },
  { id: 8, value: "september", option: "September" },
  { id: 9, value: "october", option: "October" },
  { id: 10, value: "november", option: "November" },
  { id: 11, value: "december", option: "December" },
];

function ReportsHeader() {
  return (
    <section className="mt-6 mb-10 flex items-center justify-between mr-5">
      <div className="flex flex-col gap-1 justify-center ">
        <label htmlFor="months" className="text-lg font-medium">
          Date Range
        </label>
        <select
          className="border-[1px] border-[#d1d5db] px-4 py-3 rounded-md w-[20rem]"
          id="months"
          style={{ cursor: "pointer" }}
        >
          <option value="">-- Select a Month --</option>
          {months.map((month) => (
            <option key={month.id} value={month.value}>
              {month.option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-lg font-medium">
          User Name
        </label>
        <div className="border-[1px] border-[#d1d5db] rounded-md">
          <Search placeholderText="Search by user name or number" width="22" />
        </div>
      </div>
    </section>
  );
}

export default ReportsHeader;
