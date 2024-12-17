import PostsList from "@/app/components/PostsList";
import AddPost from "@/app/components/AddPost";

export default function PostsPage() {
  return (
    <div>
      <h1>Simple CRUD with Next.js</h1>
      <AddPost />
      <PostsList />
    </div>
  );
}
