import { useAuthState } from "@/context/auth";
import { Post } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import useSWR from "swr";
import { Comment } from "@/types";

const PostPage = () => {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null,
    fetcher
  );
  const { data: comments, mutate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null,
    fetcher
  );
  const { authenticated, user } = useAuthState();
  const [newComment, setNewComment] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === "") return;

    try {
      await axios.post(`/posts/${post?.identifier}/${post?.slug}/comment`, {
        body: newComment,
      });

      mutate();
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      <div className="w-full md:mr-3 md:w-8/12">
        <div className="bg-white rounded">
          {post && (
            <>
              <div className="flex">
                <div className="py-2 pr-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-400">
                      Posted by
                      <Link href={`/u/${post.username}`} legacyBehavior>
                        <a>/u/{post.username}</a>
                      </Link>
                      <Link href={post.url} legacyBehavior>
                        <a className="mx-1 hover:underline">
                          {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                        </a>
                      </Link>
                    </p>
                  </div>
                  <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                  <p className="my-3 text-sm">{post.body}</p>
                  <div className="flex">
                    <button className="flex">
                      <FaCommentAlt className="h-full mr-1" />
                      <span className="font-bold">
                        {post.commentCount} Comments
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Post Comments */}
              <div className=" pr-6 mb-4">
                {authenticated ? (
                  <div>
                    <p className="mb-1 text-xs">
                      Leave a comment as
                      <Link href={`/u/${user?.username}`} legacyBehavior>
                        <a className="ml-2 font-semibold text-blue-500">
                          {user?.username}
                        </a>
                      </Link>
                    </p>
                    <form onSubmit={handleSubmit}>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={newComment.trim() === ""}
                          className="px-3 py-1 text-white bg-gray-400 rounded"
                        >
                          Comment
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-2 py-4 border border-gray-200 rounded">
                    <p className="font-semibold text-gray-400">
                      Sign in to leave a comment.
                    </p>
                    <div className="">
                      <Link href={"/login"} legacyBehavior>
                        <a className="px-3 py-1 text-white bg-gray-400 rounded">
                          Login
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              {/* Comments Render*/}
              {comments?.map((comment) => (
                <div className="flex" key={comment.identifier}>
                  <div className="py-2 pr-2">
                    <p className="mb-1 text-xs leading-none">
                      <Link href={`/u/${comment.username}`} legacyBehavior>
                        <a className="mr-1 font-bold hover:underline">
                          {comment.username}
                        </a>
                      </Link>
                      <span className="text-gray-600">{`${
                        comment.voteScore
                      } posts ${dayjs(comment.createdAt).format(
                        "YYYY-MM-DD HH:mm"
                      )}`}</span>
                    </p>
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
