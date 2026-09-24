import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import SmoothScrollProvider from "@/components/animations/SmoothScroll";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LSD Property Dealer and Developer",
  description: "Your Land. Your Legacy. Premium property dealer and developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${heading.variable} font-sans antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider>
              <SmoothScrollProvider>
                {children}
                <WhatsAppFloat />
              </SmoothScrollProvider>
            </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
