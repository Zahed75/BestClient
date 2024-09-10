import { Inter, Dosis } from "next/font/google";
import "./globals.css";
import Welcome from "@/components/global/Welcome";
import TopLocationBar from "@/components/global/TobLocationBar";
import Search from "@/components/global/Search";
import NavigationBar from "@/components/global/NavigationBar";
import Footer from "@/components/global/Footer";
import Footer_2 from "@/components/global/Footer_2";
import LastFooter from "@/components/global/LastFooter";
import LastFooter_2 from "@/components/global/LastFooter_1";
import BottomNavigation from "@/components/global/BottomNavigation";
import { Providers } from "@/redux/providers";
import PageTransition from "@/components/global/PageTransition";

const inter = Inter({ subsets: ["latin"] });
const dosis = Dosis({ subsets: ["latin"] });


// og:image should 1200 x 630
// 
// 

export const metadata = {
  title: {
    default: "Best Electronics in Bangladesh",
    template: "%s - Best Electronics in Bangladesh",
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
    siteName: "Best Electronics",
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
          <PageTransition>{children}</PageTransition>
          <BottomNavigation />
          <Footer_2 />
          <LastFooter_2 />
        </Providers>
      </body>
    </html>
  );
}
