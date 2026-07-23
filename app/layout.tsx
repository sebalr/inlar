import type { Metadata } from "next";
import { Fraunces, Lato, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inlar.com.ar"), // TODO reemplazar por tu dominio final
  title: {
    default: "INLAR Estudio Jurídico | Abogadas en Argentina",
    template: "%s | INLAR",
  },
  description:
    "INLAR es un estudio jurídico moderno en Argentina. Asesoramiento legal claro y cercano en derecho civil, familia, laboral y contratos. Agendá tu consulta.",
  authors: [{ name: "INLAR Estudio Jurídico" }],
  openGraph: {
    title: "INLAR Estudio Jurídico | Abogadas en Argentina",
    description:
      "Estudio jurídico moderno en Argentina. Asesoramiento legal claro y cercano. Consultá online o agendá una reunión.",
    type: "website",
    locale: "es_AR",
    siteName: "INLAR Estudio Jurídico",
  },
  twitter: {
    card: "summary_large_image",
    title: "INLAR Estudio Jurídico",
    description: "Asesoramiento legal moderno y cercano en Argentina.",
  },
  themeColor: "#033059",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "INLAR Estudio Jurídico",
  description:
    "Estudio jurídico en Argentina especializado en derecho civil, familia, laboral, contratos, sucesiones y derecho del consumidor.",
  areaServed: { "@type": "Country", name: "Argentina" },
  url: "https://inlar.com.ar",
  telephone: "+54 9 11 0000-0000",
  email: "contacto@inlar.com.ar",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressLocality: "Buenos Aires",
  },
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${lato.variable} ${caveat.variable}`}>
      <body className="bg-inlar-cream font-sans text-inlar-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
