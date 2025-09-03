import { Bell, Home, PlusCircle, Search, User } from "lucide-react";
import Link from "next/link";

const Footer = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <>
      <Link href="/" className="w-full h-full flex justify-center items-center">
        <Home />
      </Link>

      <Link href="/" className="w-full h-full flex justify-center items-center">
        <Search />
      </Link>
      <button
        onClick={onClickHandler}
        className="w-full h-full flex justify-center items-center"
      >
        <div className="bg-muted rounded-xl p-2">
          <PlusCircle />
        </div>
      </button>
      <Link href="/" className="w-full h-full flex justify-center items-center">
        <Bell />
      </Link>
      <Link href="/" className="w-full h-full flex justify-center items-center">
        <User />
      </Link>
    </>
  );
};

export default Footer;
