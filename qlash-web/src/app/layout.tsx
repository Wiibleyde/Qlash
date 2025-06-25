import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Qlash",
  description: "Quiz web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
