import { useParams } from "react-router-dom";

import FormPost from "./FormPost";
import PostList from "./PostList";

function PostWidget({ image }) {
  const { userId } = useParams();

  return (
    <>
      <FormPost image={image} />
      <PostList userId={userId} />
    </>
  );
}

export default PostWidget;
