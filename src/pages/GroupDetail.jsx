import { useLocation, useSearchParams } from "react-router-dom";
import GroupDetailHeader from "../features/inventory/GroupDetailHeader";
import SubHeading from "../ui/SubHeading";
import GroupDetailTable from "../features/inventory/GroupDetailTable";
import { useGetGroup } from "../features/inventory/useGroupAction";

function GroupDetail() {
  const location = useLocation();
  const routeArr = location.pathname.split("/");
  const groupName = routeArr.pop();

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("id");

  const { isLoading, error, group } = useGetGroup(groupId);
  const { description } = group;

  return (
    <section>
      <div className="w-[40rem] break-words">
        {description ? (
          <div className="mt-1">
            <SubHeading>{description}</SubHeading>
          </div>
        ) : (
          <SubHeading>
            Detailed view of {decodeURIComponent(groupName)}
          </SubHeading>
        )}
      </div>

      <GroupDetailHeader />
      <GroupDetailTable groupId={groupId} isLoading={isLoading} error={error} />
    </section>
  );
}

export default GroupDetail;
