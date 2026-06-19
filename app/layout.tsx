import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "teemit | Build your dream team",
  description: "The premium matchmaking platform for builders.",
  // गूगल वेरिफिकेशन कोड यहाँ जोड़ दिया गया है
  verification: {
    google: "d3Tiz9pK1A7n0F3udZ4u6G5pip", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black antialiased">
        {children}
      </body>
    </html>
  );
}