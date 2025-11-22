import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { ReduxProvider } from "./Redux/Provider";
import ClientLayout from "./clientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mamarhat",
  description: "mamarhat e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ReduxProvider>
            
            <ClientLayout>{children}</ClientLayout>
          </ReduxProvider>
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
