import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-between min-h-screen h-full px-8 md:px-24 lg:px-48 background">
      <Header />
      {children}
      <Footer />
    </div>
  )
}