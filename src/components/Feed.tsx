import { Card } from "./ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { getBgColor, getTimeAgo } from "@/lib/utils";
import { Heart, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import ImageList from "./ImageList";
import useAuth from "@/hooks/useAuth";

export default function Feed({ feed }: { feed: any }) {
  const { user } = useAuth();

  console.log("user", user);
  return (
    <Card
      key={feed.id}
      className="gap-1 font-openSans duration-100 bg-background border-none hover:bg-muted/20"
    >
      <div className="flex justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <Image
            src={feed.user.photo}
            alt={feed.user.nickname + " photo"}
            width={30}
            height={30}
            className="text-sm font-semibold rounded-full bg-accent w-7 h-7 flex items-center justify-center text-background"
          />

          <div className="flex flex-col gap-0">
            <span className="flex items-center gap-1 text-foreground/70">
              <h2 className="text-sm font-semibold">{feed.user.nickname}</h2>
              <p className="text-2xs ">· {getTimeAgo(feed.createdAt)}</p>
            </span>
            <span className="text-2xs text-foreground/70">#{feed.topic}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col min-h-36 h-full ">
        <ImageList files={feed.files} />
        <p className="p-2">{feed.content}</p>
      </div>
      <div className="flex flex-col justify-between px-3 ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <div className="flex gap-1 items-center">
              <button className="p-1 rounded-md">
                <Heart />
              </button>
              <Link href={`/post/${feed.id}`} className="p-1 rounded-md">
                <MessageCircleIcon />
              </Link>
            </div>
          </div>
          <div className="flex justify-end my-2">
            <button className="text-sm py-1 bg-primary text-white font-bold rounded-md px-3">
              Join
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
