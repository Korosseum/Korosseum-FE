"use client";
import ImageList from "@/components/ImageList";
import apiCall from "@/lib/apiCall";
import { getTimeAgo } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Carrot, ChevronRight, Send } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const getPostById = async (post_id: string | number) => {
  const response = await apiCall.get(`/post/${post_id}`);
  console.log("response", response);
  return response.data;
};

export default function PostById() {
  const { post_id } = useParams<{ post_id: string }>();

  const queryClient = useQueryClient();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", post_id],
    queryFn: () => getPostById(post_id),
    enabled: !!post_id,

    initialData: () => {
      const feeds = queryClient.getQueryData<any[]>(["feeds"]);
      console.log("feeds", feeds);

      if (feeds) {
        const currentFeed = feeds.find((feed: any) => feed.id == post_id);

        console.log("currentFeed", currentFeed);
        if (currentFeed) {
          return currentFeed;
        }
      }
      return {};
    },
  });

  if (isLoading || !post.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* 포스트 정보 */}
      <div className="p-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div>
              <Image
                className="size-8  rounded-full"
                src={post.user.photo}
                alt="post"
                width={100}
                height={100}
              />
            </div>
            <p className="font-bold">{post?.user?.nickname}</p>

            <button
              className="py-1 px-2 text-2xs text-background rounded-md bg-foreground
            font-bold"
            >
              Follow
            </button>
          </div>
          <div className="flex items-center"></div>
        </div>

        <div className="pt-2">
          <h2 className="text-md">{post.content}</h2>
        </div>
      </div>
      {/* 이미지 리스트 */}
      <ImageList files={post.files} />

      {/* 의견 선택 */}
      <button className="px-2 py-2.5 flex w-full items-center gap-2 bg-gray-100 group">
        <div className="flex flex-row-reverse [&>*]:rounded-full [&>*]:size-3 [&>*]:transition-colors [&>*]:duration-200">
          <div className="bg-purple-300 group-hover:bg-purple-400" />
          <div className="bg-yellow-300 group-hover:bg-yellow-400 -mr-1" />
          <div className="bg-green-300 group-hover:bg-green-400 -mr-1" />
          <div className="bg-blue-300 group-hover:bg-blue-400 -mr-1" />
          <div className="bg-red-300 group-hover:bg-red-400 -mr-1" />
        </div>
        <span className="text-base tracking-tighter font-semibold flex items-center gap-1 ">
          의견 선택
          <ChevronRight className="opacity-50" strokeWidth={3} size={12} />
        </span>
      </button>
      <div className="w-full h-24 flex border-b-2 pb-2">
        <textarea
          className="flex-auto px-2 h-full resize-none focus:outline-none"
          placeholder="댓글을 입력하세요."
        />
        <button className="w-10 opacity-60 hover:opacity-100 transition-opacity duration-100">
          <Send />
        </button>
      </div>
    </div>
  );
}
