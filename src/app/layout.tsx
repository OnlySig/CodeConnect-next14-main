import type { Metadata } from "next";
import './globals.css'
import { Prompt } from 'next/font/google'
import Aside from "@/components/Aside";

const prompt = Prompt({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
