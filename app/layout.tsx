import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Lato → `font-body`: texto largo / párrafos. Solo se usan normal (400) y semibold (600 → cae en 700).
const lato = localFont({
	src: [
		{ path: '../src/assets/fonts/Lato-Regular.ttf', weight: '400', style: 'normal' },
		{ path: '../src/assets/fonts/Lato-Bold.ttf', weight: '700', style: 'normal' },
	],
	variable: '--font-lato',
	display: 'swap',
});

// SweetSans Pro → `font-secondary`: textos cortos secundarios (volantas, etiquetas, badges). Solo se usa normal (400).
const sweetSans = localFont({
	src: [{ path: '../src/assets/fonts/SweetSansPro-Light.ttf', weight: '400', style: 'normal' }],
	variable: '--font-sweetsans',
	display: 'swap',
});

// Trust → `font-title`: títulos. Solo se usan normal (400, + itálica) y semibold (600 → cae en 700).
const trust = localFont({
	src: [
		{ path: '../src/assets/fonts/Trust3A-Regular-BF6617376121de4.otf', weight: '400', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-RegularItalic-BF66173760ed161.otf', weight: '400', style: 'italic' },
		{ path: '../src/assets/fonts/Trust3A-Bold-BF6617376110036.otf', weight: '700', style: 'normal' },
	],
	variable: '--font-trust',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://inlar.com.ar'), // TODO reemplazar por tu dominio final
	title: {
		default: 'INLAR Estudio Jurídico | Abogadas en Argentina',
		template: '%s | INLAR',
	},
	description:
		'INLAR es un estudio jurídico moderno en Argentina. Asesoramiento legal claro y cercano en derecho civil, familia, y penal. Agendá tu consulta.',
	authors: [{ name: 'INLAR Estudio Jurídico' }],
	openGraph: {
		title: 'INLAR Estudio Jurídico | Abogadas en Argentina',
		description: 'Estudio jurídico moderno en Argentina. Asesoramiento legal claro y cercano. Consultá online o agendá una reunión.',
		type: 'website',
		locale: 'es_AR',
		siteName: 'INLAR Estudio Jurídico',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'INLAR Estudio Jurídico',
		description: 'Asesoramiento legal moderno y cercano en Argentina.',
	},
	themeColor: '#033059',
};

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'LegalService',
	name: 'INLAR Estudio Jurídico',
	description:
		'Estudio jurídico en Argentina especializado en derecho civil, familia, laboral, contratos, sucesiones y derecho del consumidor.',
	areaServed: { '@type': 'Country', name: 'Argentina' },
	url: 'https://inlar.com.ar',
	telephone: '+54 9 11 0000-0000',
	email: 'contacto@inlar.com.ar',
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'AR',
		addressLocality: 'Buenos Aires',
	},
	priceRange: '$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="es-AR"
			className={`${lato.variable} ${sweetSans.variable} ${trust.variable}`}>
			<body className="bg-inlar-cream font-body text-inlar-ink antialiased">
				{children}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</body>
		</html>
	);
}
