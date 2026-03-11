"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gql } from "graphql-tag";
import { useMutation } from "@apollo/client/react";
import Image from "next/image";

const ADD_BLOG = gql`
 mutation addblog($title:String! , $content:String!,$excerp:String!,$author:String!,$category:String!,$image:String!){
  addblog(title: $title, content: $content,category: $category,excerp: $excerp,image: $image,author:$author){
    title,
    content,
    category,
    image
  }
}
`;

const NewPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerp, setExcerp] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState("");
  const [readTime, setReadTime] = useState("5 min read");

  const [addblog, { loading }] = useMutation(ADD_BLOG);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerp || !author || !image) {
      alert("Please fill all required fields (title, excerpt, content, author, image).");
      return;
    }

    try {
    const response =   await addblog({
        variables: {
          title,
          content,
          excerp,
          category,
          image,
          author,
        },
      });
      console.log(response);
      
      // router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to publish post. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">New Post</h1>
            <p className="text-sm text-gray-500">Create a new blog post</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            ×
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title for your post"
              className="w-full text-black border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt *</label>
            <textarea
              value={excerp}
              onChange={(e) => setExcerp(e.target.value)}
              placeholder="Write a brief summary that will appear in previews"
              className="w-full text-black border border-gray-200 rounded-md px-4 py-3 h-24 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              className="w-full text-black border border-gray-200 rounded-md px-4 py-3 h-64 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full text-black border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Technology</option>
                <option>Design</option>
                <option>Lifestyle</option>
                <option>Food</option>
                <option>Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL *</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full text-black border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
              <input
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full text-black border border-gray-200 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Image preview */}
          {image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Image preview</p>
              <div className="w-48 h-32 rounded-md overflow-hidden border border-gray-200">
                {/* Next/Image requires allowed domains; fallback to img tag if needed */}
                <Image src={image} alt="preview" width={192} height={128} className="object-cover w-full h-full" />
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-600 transition-colors"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewPostPage;
