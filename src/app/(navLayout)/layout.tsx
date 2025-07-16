import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="max-w-5xl mx-auto">{children}</div>
      <Footer />
    </>
  );
}
