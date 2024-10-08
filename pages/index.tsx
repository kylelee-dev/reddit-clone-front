import { useAuthState } from "@/context/auth";
import { Sub } from "@/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
export default function Home() {
  const { authenticated } = useAuthState();

  const fetcher = async (url: string) => {
    return await axios.get(url).then((res) => res.data);
  };
  const address = "http://localhost:4000/api/subs/sub/topSubs";
  const { data: topSubs } = useSWR<Sub[]>(address, fetcher);
  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/* Post List */}
      <div className="w-full md:mr-3 md:w-8/12"></div>
      {/* Sidebar */}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="bg-white border rounded">
          <div className="p-4 border-b">
            <p className="text-lg font-semibold text-center">Top Communities</p>
          </div>
          {/* Community List*/}
          <div>
            {topSubs?.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center px-4 py-2 text-xs border-b"
              >
                <Link href={`/r/${sub.name}`} legacyBehavior>
                  <a>
                    <Image
                      src={sub.imageUrl}
                      className="rounded-full cursor-pointer"
                      alt="Sub"
                      width={24}
                      height={24}
                    />
                  </a>
                </Link>
                <Link href={`/r/${sub.name}`} legacyBehavior>
                  <a className="ml-2 font-bold hover:cursor-pointer">
                    /r/{sub.name}
                  </a>
                </Link>
                <p className="ml-auto font-medium">{sub.postCount}</p>
              </div>
            ))}
          </div>
          {authenticated && (
            <div className="w-full py-6 text-center">
              <Link href="/subs/create" legacyBehavior>
                <a className="w-full p-2 text-center text-white bg-gray-400 rounded">
                  Create Community
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
