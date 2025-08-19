"use client";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import NewPost from "@/components/post/NewPost";
import { useState } from "react";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <div className="grid h-screen grid-rows-[50px_minmax(auto,1fr)_60px]">
      <header className="border-b bg-white">
        <Navigation />
      </header>
      <div className="max-w-5xl mx-auto w-full">{children}</div>
      <footer
        onClick={onClickHandler}
        className="border-t bg-muted/50 flex overflow-hidden rounded-t-lg h-full justify-between pb-[10px]"
      >
        <Footer />
      </footer>
      <NewPost isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
