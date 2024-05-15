import dayjs from "dayjs";
import { useReportContext } from "../../context/ReportContext";
import Search from "../../ui/Search";
import { useInvoices } from "../invoice/useInvoiceAction";

const months = [
  { id: 0, value: "January", option: "January" },
  { id: 1, value: "February", option: "February" },
  { id: 2, value: "March", option: "March" },
  { id: 3, value: "April", option: "April" },
  { id: 4, value: "May", option: "May" },
  { id: 5, value: "June", option: "June" },
  { id: 6, value: "July", option: "July" },
  { id: 7, value: "August", option: "August" },
  { id: 8, value: "September", option: "September" },
  { id: 9, value: "October", option: "October" },
  { id: 10, value: "November", option: "November" },
  { id: 11, value: "December", option: "December" },
];

function ReportsHeader() {
  const { setSelectedMonth, setSelectedYear, query, setQuery } =
    useReportContext();

  const { invoices } = useInvoices();

  const invoicesYear = invoices.map((invoice) => dayjs(invoice.paidAt).year());

  const uniqueYears = [...new Set(invoicesYear)];
  uniqueYears.sort((a, b) => a - b);

  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
  }

  function handleYearChange(e) {
    setSelectedYear(e.target.value);
  }

  return (
    <section className="mt-6 mb-10 flex items-center justify-between mr-5">
      <div className="flex flex-col gap-1 justify-center ">
        <label htmlFor="months" className="text-lg font-medium">
          Month Range
        </label>
        <select
          className="border-[1px] border-[#d1d5db] px-4 py-3 rounded-md w-[20rem]"
          id="months"
          style={{ cursor: "pointer" }}
          onChange={handleMonthChange}
        >
          <option value="">All Month</option>
          {months.map((month) => (
            <option key={month.id} value={month.value}>
              {month.option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1 justify-center ">
        <label htmlFor="months" className="text-lg font-medium">
          Year Range
        </label>
        <select
          className="border-[1px] border-[#d1d5db] px-4 py-3 rounded-md w-[20rem]"
          id="years"
          style={{ cursor: "pointer" }}
          onChange={handleYearChange}
        >
          <option value="">All Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-lg font-medium">
          User Name
        </label>
        <div className="border-[1px] border-[#d1d5db] rounded-md">
          <Search
            placeholderText="Search by user name or number"
            width="22"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default ReportsHeader;
