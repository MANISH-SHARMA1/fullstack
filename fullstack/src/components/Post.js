import React from "react";

function Post({ post }) {
  return (
    <div className="mx-12 md:mx-48 lg:mx-80 mb-12 border-solid border-2 border-lime-500 bg-neutral-50 text-xl">
      <div className="flex my-3">
        <div className="avatar">
          <img
            src={post.avatar}
            alt="avatar"
            className="mx-4 w-12 h-12 rounded-full"
          />
        </div>
        <div className="self-center font-bold">{post.username}</div>
      </div>
      <img src={post.image} alt="Post" className="w-full" />
      <div className="mx-4 my-3">
        <p>
          <span className="font-bold ">{post.username}</span>
          <span className="ml-2 text-lg">{post.caption}</span>
        </p>
      </div>
    </div>
  );
}

export default Post;
