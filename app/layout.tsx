import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PageTransition from "@/components/page-transition"
import { Suspense } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Nuanu Guide",
  description: "Your guide to Nuanu Creative Village in Bali",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        {/* Bottom blur gradient */}
        <div className="blur-overlay" style={{bottom: 0, top: 'auto', height: '15vh', maskImage: 'linear-gradient(to top, black, transparent)', WebkitMaskImage: 'linear-gradient(to top, black, transparent)'}} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PageTransition>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            }>
            {children}
            </Suspense>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'