import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sans = Space_Grotesk({ variable: "--font-sans", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], variable: "--font-mono", subsets: ["latin"] });
export const metadata: Metadata = { title: "Tip / Jar — local ledger", description: "Record demo tips without payments.", metadataBase: new URL("https://donation-tip-jar.bookchaowalit.com") };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>
  {/* THESIS: A no-payment tip demo should make the act of recording feel tangible without impersonating checkout. OWN-WORLD: violet register body, receipt white, citrus yellow controls, and mono transaction labels in a neighborhood cash counter grammar. STORY: choose a denomination, leave a note, and print a browser-only receipt. FIRST VIEWPORT: the running ledger total sits beside the record register; PRINT LOCAL RECEIPT is the primary action. FORM: cash register ledger / candidate 4 / seed f39e3727. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
  <Analytics /><SpeedInsights />{children}
</body></html>; }
