import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Lato → `font-body`: texto largo / párrafos.
const lato = localFont({
	src: [
		{ path: '../src/assets/fonts/Lato-Thin.ttf', weight: '100', style: 'normal' },
		{ path: '../src/assets/fonts/Lato-ThinItalic.ttf', weight: '100', style: 'italic' },

		{ path: '../src/assets/fonts/Lato-Light.ttf', weight: '300', style: 'normal' },
		{ path: '../src/assets/fonts/Lato-LightItalic.ttf', weight: '300', style: 'italic' },

		{ path: '../src/assets/fonts/Lato-Regular.ttf', weight: '400', style: 'normal' },
		{ path: '../src/assets/fonts/Lato-Italic.ttf', weight: '400', style: 'italic' },

		{ path: '../src/assets/fonts/Lato-Bold.ttf', weight: '700', style: 'normal' },
		{ path: '../src/assets/fonts/Lato-BoldItalic.ttf', weight: '700', style: 'italic' },

		{ path: '../src/assets/fonts/Lato-Black.ttf', weight: '900', style: 'normal' },
		{ path: '../src/assets/fonts/Lato-BlackItalic.ttf', weight: '900', style: 'italic' },
	],
	variable: '--font-lato',
	display: 'swap',
});

// SweetSans Pro → `font-secondary`: textos cortos secundarios (volantas, etiquetas, badges).
const sweetSans = localFont({
	src: [
		{ path: '../src/assets/fonts/SweetSansPro-Hairline.ttf', weight: '100', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-HairlineItalic.ttf', weight: '100', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-ExThin.ttf', weight: '200', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-ExThinItalic.ttf', weight: '200', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-ExLight.ttf', weight: '300', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-ExLightItalic.ttf', weight: '300', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-Light.ttf', weight: '400', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-LightItalic.ttf', weight: '400', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-Regular.ttf', weight: '500', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-Italic.ttf', weight: '500', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-Medium.ttf', weight: '600', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-MediumItalic.ttf', weight: '600', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-Bold.ttf', weight: '700', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-BoldItalic.ttf', weight: '700', style: 'italic' },

		{ path: '../src/assets/fonts/SweetSansPro-Heavy.ttf', weight: '900', style: 'normal' },
		{ path: '../src/assets/fonts/SweetSansPro-HeavyItalic.ttf', weight: '900', style: 'italic' },
	],
	variable: '--font-sweetsans',
	display: 'swap',
});

// Trust → `font-title`: títulos.
const trust = localFont({
	src: [
		{ path: '../src/assets/fonts/Trust3A-XLight-BF66173762c3d91.otf', weight: '100', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-XLightItalic-BF66173763007cc.otf', weight: '100', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-Light-BF6617376155e13.otf', weight: '300', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-LightItalic-BF6617376122f67.otf', weight: '300', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-Regular-BF6617376121de4.otf', weight: '400', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-RegularItalic-BF66173760ed161.otf', weight: '400', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-Medium-BF661737610cb45.otf', weight: '500', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-MediumItalic-BF66173760cfaec.otf', weight: '500', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-Bold-BF6617376110036.otf', weight: '700', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-BoldItalic-BF661737613ed26.otf', weight: '700', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-XBold-BF661737624bb9a.otf', weight: '800', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-XBoldItalic-BF6617376284df9.otf', weight: '800', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-Black-BF66173760cb98c.otf', weight: '900', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-BlackItalic-BF661737610f22d.otf', weight: '900', style: 'italic' },

		{ path: '../src/assets/fonts/Trust3A-XBlack-BF6617376295803.otf', weight: '950', style: 'normal' },
		{ path: '../src/assets/fonts/Trust3A-XBlackItalic-BF66173762448b1.otf', weight: '950', style: 'italic' },
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
