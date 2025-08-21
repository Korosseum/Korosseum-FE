import { Card } from "./ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { getBgColor, getTimeAgo } from "@/lib/utils";

const sampleOpinions = [
  {
    id: "1",
    content: "짜장면",
    count: 100,
  },
  {
    id: "2",
    content: "짬뽕",
    count: 150,
  },
  {
    id: "3",
    content: "탕수육",
    count: 150,
  },
  {
    id: "4",
    content: "유산슬",
    count: 150,
  },
];

export default function Feed({ feed }: { feed: any }) {
  return (
    <Card
      key={feed.id}
      className="gap-1 font-openSans duration-100 bg-background border-none hover:bg-muted/20"
    >
      <div className="flex justify-between px-1.5 py-1">
        <div className="flex items-center gap-2">
          <Image
            src={feed.user.photo}
            alt="user photo"
            width={24}
            height={24}
            className="text-sm font-semibold rounded-full bg-accent w-6 h-6 flex items-center justify-center text-background"
          />

          <h2 className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
            {feed.user.nickname}
          </h2>
          <span className="text-2xs text-foreground/70">
            @Food · {getTimeAgo(feed.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex flex-col min-h-36 h-full ">
        <div className="flex h-80 w-full bg-muted/50 gap-2 rounded-xl border border-foreground/10 overflow-x-scroll">
          {feed.files &&
            feed.files.map((file: any) => {
              return (
                <Image
                  key={file.filename + file.id}
                  src={`http://localhost:4000/uploads/images/${file.filename}`}
                  alt={file.filename}
                  width={500}
                  height={500}
                  className="object-cover h-full w-auto rounded-xl"
                />
              );
            })}
        </div>
        <div className="text-xs p-2">{feed.content}</div>
      </div>
      <div className="flex flex-col justify-between px-3 ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-1/2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="flex overflow-hidden gap-1">
                {sampleOpinions.map((opinion, index) => (
                  <div
                    key={opinion.id}
                    className={`opacity-50 hover:opacity-100 ${getBgColor(
                      index
                    )} transition-opacity duration-150 w-6 h-6 rounded-full`}
                    // style={{
                    //   width: `${
                    //     (opinion.count / debateData["1"].totalCounts) *
                    //     100
                    //   }%`,
                    // }}
                  />
                ))}
              </div>
            </motion.div>
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
