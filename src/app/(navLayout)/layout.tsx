"use client";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import NewPost from "@/components/post/NewPost";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 옵션: 포커스 시 자동 refetch 비활성화 등 전역 설정 가능
            // refetchOnWindowFocus: false,
          },
        },
      })
  );

  const onClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen grid grid-rows-[auto_1fr_auto]">
        <header className="border-b bg-white">
          <Navigation />
        </header>
        <main className="overflow-y-auto">
          <div className="max-w-5xl mx-auto w-full">{children}</div>
        </main>
        <footer className="border-t bg-muted/50 flex overflow-hidden rounded-t-lg justify-between pb-[10px] h-16">
          <Footer onClickHandler={onClickHandler} />
        </footer>
        <NewPost isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
