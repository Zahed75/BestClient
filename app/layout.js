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


// og:image should 1200 x 630
// 
// 

export const metadata = {
  title: {
    default: "Best Electronic in Bangladesh",
    template: "%s - Best Electronic in Bangladesh",
  },
  description:
    "Best Electronics is your one-stop shop to get all kinds of electronic and electrical products in Bangladesh.",
  openGraph: {
    title: "Best Electronics in Bangladesh",
    description:
      "Best Electronics is your one-stop shop to get all kinds of electronic and electrical products in Bangladesh.",
    type: "website",
    locale: "en_BD",
    url: `${process.env.SITE_URL}`,
    metadataBase: `${process.env.SITE_URL}`,
    siteName: "Best Electronic",
  },
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
