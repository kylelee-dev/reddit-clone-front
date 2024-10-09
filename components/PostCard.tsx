import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import dayjs from "dayjs";
import { FaCommentAlt } from "react-icons/fa";
import { useAuthState } from "@/context/auth";
import { useRouter } from "next/router";
import axios from "axios";

interface PostCardProps {
  post: Post;
  subMutate: () => void;
}
const PostCard = ({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  subMutate
}: PostCardProps) => {
  const router = useRouter();
  const { authenticated } = useAuthState();
  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    if (value === userVote) value = 0;

    try {
      await axios.post("/votes", { identifier, slug, value });
      subMutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex mb-4 bg-white rounded" id={identifier}>
      {/* Upvote & Downvote */}
      <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
        {/* Upvote */}
        <div
          className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(1)}
        >
          <FaArrowUpLong className={userVote === 1 ? "text-red-500" : ""} />
        </div>
        <p className="text-sm font-bold">{voteScore}</p>
        {/* Down */}
        <div
          className="flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
          onClick={() => vote(-1)}
        >
          <FaArrowDownLong className={userVote === -1 ? "text-blue-500" : ""} />
        </div>
      </div>
      {/* Post Data */}
      <div className="w-full p-2">
        <div className="flex items-center">
          {/* {!isInSubPage && (
            <>
              <Link href={`/r/${subName}`} legacyBehavior>
                <a>
                  <Image
                    src={sub!.imageUrl}
                    alt="sub"
                    className="rounded-full cursor-pointer"
                    width={12}
                    height={12}
                  />
                </a>
              </Link>
              <Link href={`/r/${subName}`} legacyBehavior>
                <a className="ml-2 text-sm font-bold cursor-pointer hover:underline">
                  /r/{subName}
                </a>
              </Link>
              <span className="mx-1 text-sm text-gray-400">*</span>
            </>
          )} */}
        </div>
        <p className="text-sm text-gray-400">
          Posted by
          <Link href={`/r/${username}`} legacyBehavior>
            <a className="mx-1 hover:underline">/u/{username}</a>
          </Link>
          <Link href={url} legacyBehavior>
            <a className="mx-1 hover:underline">
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
            </a>
          </Link>
        </p>
        <Link href={url} legacyBehavior>
          <a className="my-1 text-lg font-medium"> {title}</a>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}
        <div className="flex">
          <Link href={url} legacyBehavior>
            <a>
              <div className="flex justify-center items-center space-x-1">
                <FaCommentAlt />
                <span>{commentCount}</span>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
