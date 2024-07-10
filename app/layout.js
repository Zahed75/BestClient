import { Inter, Dosis } from "next/font/google";
import "./globals.css";
import Welcome from "@/components/global/Welcome";
import TopLocationBar from "@/components/global/TobLocationBar";
import Search from "@/components/global/Search";
import NavigationBar from "@/components/global/NavigationBar";
import Footer from "@/components/global/Footer";
import LastFooter from "@/components/global/LastFooter";
import BottomNavigation from "@/components/global/BottomNavigation";
import { Providers } from "@/redux/providers";

const inter = Inter({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });

export const metadata = {
  title: "Best Electronic in Bangladesh",
  description: "Best Electronic is the best online shop in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Welcome />
          <TopLocationBar />
          <div className="border-b shadow-md"></div>
          <Search />
          <NavigationBar />
          {children}
          <BottomNavigation />
          <Footer />
          <LastFooter />
        </Providers>
      </body>
    </html>
  );
}
