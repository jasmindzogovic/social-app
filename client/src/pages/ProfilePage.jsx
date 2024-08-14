import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../services/users";

function ProfilePage() {
  const { userId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUser(userId),
    queryKey: ["user", userId],
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>There was an error fetching the user.</div>;

  return <div>{data.data.user.firstName}</div>;
}

export default ProfilePage;
