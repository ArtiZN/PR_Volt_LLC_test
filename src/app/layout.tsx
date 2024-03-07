import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StoreProvider } from "../store/StoreProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Test for PR Volt LLC",
  description: "Lorem Ipsum",
  openGraph: {
    type: "website",
    url: "https://main.d1valzx01w9oxz.amplifyapp.com/",
    title: "Test task",
    description: "TODO list as a part of test task",
    siteName: "Minimalistic ToDo List",
    images: [{
      url: "https://i.imgur.com/SBTcAgl.png",
    }],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>):JSX.Element {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  )
}
