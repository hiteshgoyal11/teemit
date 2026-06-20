import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script"; // 1. यहाँ Script इम्पोर्ट किया

export const metadata: Metadata = {
  title: "teemit | Build your dream team",
  description: "The premium matchmaking platform for builders.",
  // गूगल वेरिफिकेशन कोड यहाँ है (इसे मत हटाना)
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
        
        {/* 2. "Clean" Google Login के लिए यह स्क्रिप्ट यहाँ जोड़ी गई है */}
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}