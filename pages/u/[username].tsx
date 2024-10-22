import PostCard from "@/components/PostCard";
import { Post } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { Comment } from "@/types";
import { FaCommentAlt } from "react-icons/fa";
import Link from "next/link";
import dayjs from "dayjs";

const UserPage = () => {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  const router = useRouter();

  const username = router.query.username;

  const { data, error } = useSWR<any>(
    username ? `/users/${username}` : null,
    fetcher
  );

  console.log(data);
  if (!data) return null;
  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/* User Posts & Comments */}
      <div className="w-full md:mr-3 md:w-8/12 ">
        {data.userData.map((data: any) => {
          if (data.type === "Post") {
            const post: Post = data;
            return <PostCard key={post.identifier} post={post} />;
          } else {
            const comment: Comment = data;
            return (
              <div
                key={comment.identifier}
                className="flex my-4 bg-white rounded"
              >
                <div className="flex-shrink-0 w-10 py-10 text-center border-r rounded-l">
                  <FaCommentAlt className="text-gray-500 mx-auto" />
                </div>
                <div className="w-full p-2">
                  <p className="mb-2 text-xs text-gray-500">
                    <Link href={`${comment.username}`} legacyBehavior>
                      <a className="cursor-pointer hover:underline">
                        {comment.username}
                      </a>
                    </Link>
                    <span>commented on</span>
                    <Link href={`${comment.post?.url}`} legacyBehavior>
                      <a className="cursor-pointer hover:underline">
                        {comment.post?.title}
                      </a>
                    </Link>
                    <span>*</span>
                    <Link href={`${comment.post?.subName}`} legacyBehavior>
                      <a className="text-black cursor-pointer hover:underline">
                        {comment.post?.subName}
                      </a>
                    </Link>
                  </p>
                  <hr />
                  <p className="p-1"> {comment.body}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      {/* User Information */}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="flex items-center p-3 bg-gray-400 rounded-t">
          <Image
            src="https://www.gravatar.com/avatar/0000?d=mp&f=y"
            alt="user profile"
            className="border border-white rounded-full"
            width={40}
            height={40}
          />
          <p className="pl-2 text-md">{data.user.username}</p>
        </div>
        <div className="bg-white p-2 pb-3 rounded-b">
          <p className="">
            Signed up on {dayjs(data.user.createdAt).format("YYYY.MM.DD")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
