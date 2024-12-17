"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  // Mutation untuk menambahkan post
  const addPostMutation = useMutation({
    mutationFn: async (newPost: { title: string; content: string }) =>
      axios.post("/api/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // Refresh data setelah sukses
      setTitle(""); // Reset input
      setContent("");
    },
    onError: (error) => {
      console.error("Error adding post:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPostMutation.mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} suppressContentEditableWarning>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" disabled={addPostMutation.isPending}>
        {addPostMutation.isPending ? "Adding..." : "Add Post"}
      </button>
    </form>
  );
}
