import Image from "next/image";

export default function ImageList({ files }: { files: any[] }) {
  const isSingle = files.length === 1;
  const frameSize = isSingle ? "h-auto" : "h-80";
  const imageSize = isSingle ? "w-full h-auto" : "w-auto h-full";
  return (
    <div
      // 이미지가 하나일 때 가운데 정렬
      className={`flex h-80 w-full  gap-2 py-2 overflow-x-scroll ${frameSize}`}
    >
      {files &&
        files.map((file: any) => {
          const isSingle = files.length === 1;
          return (
            <Image
              key={file.id}
              src={file.url}
              alt={file.originalName}
              width={500}
              height={500}
              className={`object-cover rounded-xl ${imageSize}`}
            />
          );
        })}
    </div>
  );
}
