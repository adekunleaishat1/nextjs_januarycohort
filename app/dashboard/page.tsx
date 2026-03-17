"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client/react";

const ALLBLOG = gql`
query getblog{
  allblog {
    id,
    title,
    content,
    author,
    image,
    category
  }
}
`
const DELETEBLOG = gql `
mutation deleteblog($id:ID!){
  deleteblog(id:$id){
    title,
    content,
    image,
    
  }
}
`

// Dummy blog data
const blogs = [
  {
    id: "1",
    title: "Getting Started with Modern Web Develop...",
    author: "Sarah Johnson",
    category: "Technology",
    date: "Feb 1, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "The Art of Minimalist Design",
    author: "Michael Chen",
    category: "Design",
    date: "Jan 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "Finding Inspiration in Nature",
    author: "Emma Williams",
    category: "Lifestyle",
    date: "Jan 25, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    title: "Delicious Recipes for Every Season",
    author: "Julia Roberts",
    category: "Food",
    date: "Jan 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    title: "Travel Adventures Around the World",
    author: "Alex Turner",
    category: "Travel",
    date: "Jan 18, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&h=100&fit=crop",
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Technology: "bg-blue-100 text-blue-600",
    Design: "bg-purple-100 text-purple-600",
    Lifestyle: "bg-green-100 text-green-600",
    Food: "bg-orange-100 text-orange-600",
    Travel: "bg-cyan-100 text-cyan-600",
  };
  return colors[category] || "bg-gray-100 text-gray-600";
};

const Dashboard = () => {
   const [deleteblog, {loading:deleteloading }] = useMutation(DELETEBLOG);
  const {data, loading, error} = useQuery(ALLBLOG)
  console.log(data?.allblog);
  
  const [searchQuery, setSearchQuery] = useState("");
  const userName = "aishat adekunle"; // This would come from auth context

  const filteredBlogs = data?.allblog && data?.allblog.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const Deleteblog = async(id:string) =>{
    console.log(id);
   const response = await deleteblog({variables:{id}})
   console.log(response);
   
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
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
            <h1 className="font-semibold text-gray-900">Blog Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your content</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Badge */}
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm text-gray-700">{userName}</span>
          </div>

          {/* Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">Home</span>
          </Link>

          {/* New Post Button */}
          <Link
            href="/dashboard/new"
            className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-sm font-medium">New Post</span>
          </Link>

          {/* Logout Button */}
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Posts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Total Posts</span>
              <svg
                className="w-5 h-5 text-purple-600"
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
            <p className="text-3xl font-bold text-gray-900">6</p>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Categories</span>
              <div className="w-5 h-5 bg-purple-500 rounded"></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">6</p>
          </div>

          {/* Authors */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Authors</span>
              <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">6</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="relative">
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts by title, category, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="col-span-4">
              <span className="text-sm font-semibold text-gray-900">Title</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-900">Author</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-900">Category</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-semibold text-gray-900">Date</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-semibold text-gray-900">Read Time</span>
            </div>
            <div className="col-span-1">
              <span className="text-sm font-semibold text-gray-900">Actions</span>
            </div>
          </div>

          {/* Table Body */}
          {loading ? "LOADING..." : filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors"
            >
              {/* Title with Image */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-900 truncate">{blog.title}</span>
              </div>

              {/* Author */}
              <div className="col-span-2">
                <span className="text-sm text-gray-600">{blog.author}</span>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                    blog.category
                  )}`}
                >
                  {blog.category}
                </span>
              </div>

              {/* Date */}
              <div className="col-span-2">
                <span className="text-sm text-gray-500">{blog.date}</span>
              </div>

              {/* Read Time */}
              <div className="col-span-1">
                <span className="text-sm text-gray-500">{blog.readTime}</span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button onClick={()=>Deleteblog(blog.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                 {deleteloading ? "Loading..."  :
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                   
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg> }
                </button>
              </div>
            </div>
          ))}

          {loading? "Loading..." : filteredBlogs.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
