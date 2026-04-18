import { getPaginatedUsers } from "../actions/getPaginatedUsers";
import UsersView from "./users-view";

type Props = {
  search: string;
  pageParam: number;
  userId: string;
};

const UsersWrapper = async ({ userId, search, pageParam }: Props) => {
  const { data, page, totalPages } = await getPaginatedUsers(
    pageParam,
    10,
    search,
  );

  return (
    <UsersView
      data={data}
      totalPages={totalPages}
      pageParam={pageParam}
      userId={userId}
    />
  );
};
export default UsersWrapper;
