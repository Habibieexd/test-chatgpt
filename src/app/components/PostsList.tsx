"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Tipe data untuk setiap post
interface Post {
  id: number;
  title: string;
  content: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get("/api/posts");
  return data;
};

export default function PostsList() {
  // Menggunakan tipe data Post[] (array of Post)
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
