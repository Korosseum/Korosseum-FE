import { Navigation } from "@/components/Navigation";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
