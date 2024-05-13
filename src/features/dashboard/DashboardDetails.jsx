import DetailBox from "./DetailBox";

function DashboardDetails() {
  return (
    <div className="grid grid-cols-2 w-[95%] gap-x-12 gap-y-10 mt-12">
      {/* Inventory */}
      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Inventory</DetailBox.Heading>
          <DetailBox.Action>Go to Inventory</DetailBox.Action>
        </DetailBox.Header>
        <DetailBox.Body>
          <DetailBox.DetailPart1>
            <p className="xl:text-xl 2xl:text-2xl font-bold">298</p>
            <p className="text-sm 2xl:text-base font-medium">
              Total no of Medicines
            </p>
          </DetailBox.DetailPart1>
          <DetailBox.DetailPart2>
            <p className="xl:text-xl 2xl:text-2xl font-bold">24</p>
            <p className="text-sm 2xl:text-base font-medium">Medicine Groups</p>
          </DetailBox.DetailPart2>
        </DetailBox.Body>
      </DetailBox>

      {/* Quick Report  */}
      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Quick Report</DetailBox.Heading>
          <DetailBox.Action>January</DetailBox.Action>
        </DetailBox.Header>
        <DetailBox.Body>
          <DetailBox.DetailPart1>
            <p className="xl:text-xl 2xl:text-2xl font-bold">70,856</p>
            <p className="text-sm 2xl:text-base font-medium">
              Qty of Medicines Sold
            </p>
          </DetailBox.DetailPart1>
          <DetailBox.DetailPart2>
            <p className="xl:text-xl 2xl:text-2xl font-bold">5,288</p>
            <p className="text-sm 2xl:text-base font-medium">
              Invoices Generated
            </p>
          </DetailBox.DetailPart2>
        </DetailBox.Body>
      </DetailBox>

      {/* Customers  */}
      <DetailBox>
        <DetailBox.Header>
          <DetailBox.Heading>Customers</DetailBox.Heading>
          <DetailBox.Action>Go to Customers Page</DetailBox.Action>
        </DetailBox.Header>

        <DetailBox.DetailPart1 position="center">
          <p className="xl:text-xl 2xl:text-2xl font-bold">845</p>
          <p className="text-sm 2xl:text-base font-medium">
            Total no of Customers
          </p>
        </DetailBox.DetailPart1>
      </DetailBox>
    </div>
  );
}

export default DashboardDetails;
