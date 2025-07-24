import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Navigation />
      <div className="max-w-5xl mx-auto min-h-full w-full">{children}</div>
      <div className="justify-self-end">
        <Footer />
      </div>
    </div>
  );
}
