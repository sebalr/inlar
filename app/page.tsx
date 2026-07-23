'use client';

import { useState, type FormEvent } from 'react';
import {
	Scale,
	Users,
	Briefcase,
	FileText,
	Home as HomeIcon,
	ShieldCheck,
	Mail,
	Phone,
	MapPin,
	ArrowRight,
	MessageCircle,
	CalendarClock,
	Menu,
	X,
	Globe,
	Share2,
} from 'lucide-react';
import { z } from 'zod';

// ============================================================
// CONFIGURACIÓN — reemplazá estos valores
// ============================================================
const INLAR = {
	whatsapp: '5491100000000', // E.164 sin +
	whatsappMsg: 'Hola INLAR, me gustaría hacer una consulta.',
	calendlyUrl: 'https://calendly.com/tu-usuario/consulta-inlar',
	email: 'contacto@inlar.com.ar',
	telefono: '+54 9 11 0000-0000',
	direccion: 'Buenos Aires, Argentina',
	instagram: 'https://instagram.com/inlar.estudio',
	linkedin: 'https://linkedin.com/company/inlar',
	blogUrl: '/blog',
};

const HERO_IMG = 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1400&q=80';
const NOSOTRAS_IMG = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80';

// ============================================================

export default function Page() {
	return (
		<div className="min-h-screen bg-inlar-cream text-inlar-ink">
			<Nav />
			<main>
				<Hero />
				<Nosotras />
				<Areas />
				<Agenda />
				<Contacto />
			</main>
			<Footer />
			<WhatsAppFab />
		</div>
	);
}

function Nav() {
	const [open, setOpen] = useState(false);
	const links = [
		{ href: '#nosotras', label: 'Nosotras' },
		{ href: '#areas', label: 'Áreas' },
		{ href: '#agenda', label: 'Agendá' },
		{ href: '#contacto', label: 'Contacto' },
	];
	return (
		<header className="sticky top-0 z-40 border-b border-inlar-cream-2/60 bg-inlar-cream/85 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
				<a
					href="#top"
					className="flex items-baseline gap-2">
					<span className="font-serif text-2xl font-semibold tracking-tight text-inlar-primary">INLAR</span>
					<span className="hidden text-xs uppercase tracking-[0.2em] text-inlar-copper sm:inline">Estudio Jurídico</span>
				</a>
				<nav
					className="hidden items-center gap-8 md:flex"
					aria-label="Principal">
					{links.map(l => (
						<a
							key={l.href}
							href={l.href}
							className="text-sm font-medium text-inlar-ink/80 transition-colors hover:text-inlar-primary">
							{l.label}
						</a>
					))}
					<a
						href={INLAR.blogUrl}
						className="text-sm font-medium text-inlar-ink/80 transition-colors hover:text-inlar-primary">
						Blog
					</a>
					<a
						href="#agenda"
						className="inline-flex items-center gap-2 rounded-full bg-inlar-primary px-5 py-2.5 text-sm font-semibold text-inlar-cream transition-all hover:bg-inlar-accent hover:shadow-lg hover:shadow-inlar-primary/20">
						Agendar consulta <ArrowRight className="h-4 w-4" />
					</a>
				</nav>
				<button
					onClick={() => setOpen(v => !v)}
					className="rounded-md p-2 text-inlar-primary md:hidden"
					aria-label="Abrir menú"
					aria-expanded={open}>
					{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>
			{open && (
				<nav
					className="border-t border-inlar-cream-2/60 bg-inlar-cream px-4 py-4 md:hidden"
					aria-label="Móvil">
					<ul className="flex flex-col gap-1">
						{links.map(l => (
							<li key={l.href}>
								<a
									href={l.href}
									onClick={() => setOpen(false)}
									className="block rounded-md px-3 py-2 text-sm font-medium text-inlar-ink/80 hover:bg-inlar-cream-2/60 hover:text-inlar-primary">
									{l.label}
								</a>
							</li>
						))}
						<li>
							<a
								href={INLAR.blogUrl}
								className="block rounded-md px-3 py-2 text-sm font-medium text-inlar-ink/80 hover:bg-inlar-cream-2/60">
								Blog
							</a>
						</li>
						<li>
							<a
								href="#agenda"
								onClick={() => setOpen(false)}
								className="mt-2 block rounded-full bg-inlar-primary px-4 py-2.5 text-center text-sm font-semibold text-inlar-cream">
								Agendar consulta
							</a>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);
}

function Hero() {
	return (
		<section
			id="top"
			className="relative overflow-hidden">
			<div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:pt-20 lg:pb-28 lg:pt-24">
				<div>
					<p className="font-script text-2xl text-inlar-copper">Estudio jurídico</p>
					<h1 className="mt-2 font-serif text-5xl leading-[1.05] tracking-tight text-inlar-primary sm:text-6xl lg:text-7xl">
						Derecho con
						<br />
						<span className="italic text-inlar-accent">mirada fresca</span>
						<br />y compromiso.
					</h1>
					<p className="mt-6 max-w-xl text-lg leading-relaxed text-inlar-ink/75">
						Somos INLAR, un estudio joven que combina rigor técnico con trato cercano. Te acompañamos con claridad en cada paso de tu
						proceso legal, en Argentina y online.
					</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<a
							href="#agenda"
							className="inline-flex items-center gap-2 rounded-full bg-inlar-primary px-6 py-3 text-sm font-semibold text-inlar-cream transition-all hover:bg-inlar-accent hover:shadow-xl hover:shadow-inlar-primary/25">
							<CalendarClock className="h-4 w-4" /> Agendar consulta
						</a>
						<a
							href="#contacto"
							className="inline-flex items-center gap-2 rounded-full border border-inlar-primary/25 bg-transparent px-6 py-3 text-sm font-semibold text-inlar-primary transition-colors hover:bg-inlar-primary hover:text-inlar-cream">
							Contactanos
						</a>
					</div>
					<dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-inlar-cream-2 pt-6">
						<div>
							<dt className="text-xs uppercase tracking-wider text-inlar-copper">Áreas</dt>
							<dd className="mt-1 font-serif text-2xl text-inlar-primary">6+</dd>
						</div>
						<div>
							<dt className="text-xs uppercase tracking-wider text-inlar-copper">Consulta</dt>
							<dd className="mt-1 font-serif text-2xl text-inlar-primary">Online</dd>
						</div>
						<div>
							<dt className="text-xs uppercase tracking-wider text-inlar-copper">Respuesta</dt>
							<dd className="mt-1 font-serif text-2xl text-inlar-primary">24h</dd>
						</div>
					</dl>
				</div>
				<div className="relative">
					<div className="absolute -inset-4 -z-10 rounded-[2rem] bg-inlar-sand-2/50 blur-2xl" />
					<div className="relative overflow-hidden rounded-[1.5rem] border border-inlar-cream-2 shadow-2xl shadow-inlar-primary/10">
						<img
							src={HERO_IMG}
							alt="Escritorio de abogadas con documentos y balanza de la justicia"
							width={800}
							height={900}
							className="h-[420px] w-full object-cover sm:h-[520px]"
						/>
					</div>
					<div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-inlar-cream-2 bg-inlar-cream p-4 shadow-xl sm:block">
						<p className="font-script text-lg text-inlar-copper">Cercanas</p>
						<p className="font-serif text-lg text-inlar-primary">Serias. Modernas.</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function Nosotras() {
	return (
		<section
			id="nosotras"
			aria-labelledby="nosotras-h"
			className="bg-inlar-cream-2/40 py-20 lg:py-28">
			<div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-2 md:items-center">
				<div className="relative order-2 md:order-1">
					<div className="overflow-hidden rounded-[1.5rem] border border-inlar-cream-2 shadow-xl">
						<img
							src={NOSOTRAS_IMG}
							alt="Retrato de las abogadas fundadoras de INLAR"
							width={900}
							height={1000}
							loading="lazy"
							className="h-[420px] w-full object-cover sm:h-[520px]"
						/>
					</div>
					<div className="absolute -right-4 -top-4 rounded-full bg-inlar-primary px-4 py-2 font-script text-lg text-inlar-cream shadow-lg">
						Recién graduadas
					</div>
				</div>
				<div className="order-1 md:order-2">
					<p className="font-script text-xl text-inlar-copper">Sobre nosotras</p>
					<h2
						id="nosotras-h"
						className="mt-1 font-serif text-4xl leading-tight text-inlar-primary sm:text-5xl">
						Dos abogadas, una forma nueva de <em className="text-inlar-accent">ejercer</em>.
					</h2>
					<p className="mt-6 text-lg leading-relaxed text-inlar-ink/80">
						Fundamos INLAR con la convicción de que el derecho puede ser accesible, humano y preciso. Nos formamos en la universidad con las
						últimas herramientas del mundo jurídico y las combinamos con una comunicación clara, sin jerga innecesaria.
					</p>
					<ul className="mt-8 space-y-4">
						{[
							{ t: 'Trato cercano', d: 'Te escuchamos primero. Después, actuamos.' },
							{ t: 'Rigor técnico', d: 'Estudio caso por caso, con estrategia y respaldo normativo.' },
							{ t: 'Comunicación clara', d: 'Sin letra chica: entendés siempre qué está pasando.' },
						].map(f => (
							<li
								key={f.t}
								className="flex gap-4">
								<ShieldCheck className="mt-1 h-5 w-5 flex-none text-inlar-accent" />
								<div>
									<p className="font-semibold text-inlar-primary">{f.t}</p>
									<p className="text-sm text-inlar-ink/70">{f.d}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

const AREAS = [
	{ icon: Users, title: 'Familia', desc: 'Divorcios, alimentos, tenencia y régimen comunicacional.' },
	{ icon: Scale, title: 'Civil', desc: 'Daños y perjuicios, responsabilidad civil, reclamos.' },
	{ icon: Briefcase, title: 'Laboral', desc: 'Despidos, indemnizaciones y asesoramiento a trabajadores.' },
	{ icon: FileText, title: 'Contratos', desc: 'Redacción, revisión y negociación de contratos.' },
	{ icon: HomeIcon, title: 'Sucesiones', desc: 'Trámites sucesorios, herencias y planificación.' },
	{ icon: ShieldCheck, title: 'Consumidor', desc: 'Reclamos por servicios y productos defectuosos.' },
];

function Areas() {
	return (
		<section
			id="areas"
			aria-labelledby="areas-h"
			className="py-20 lg:py-28">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="max-w-2xl">
					<p className="font-script text-xl text-inlar-copper">Áreas de práctica</p>
					<h2
						id="areas-h"
						className="mt-1 font-serif text-4xl leading-tight text-inlar-primary sm:text-5xl">
						En qué te podemos <em className="text-inlar-accent">acompañar</em>.
					</h2>
					<p className="mt-4 text-lg text-inlar-ink/75">
						Cubrimos las áreas más frecuentes del derecho para personas y familias. Si tu situación no aparece acá, escribinos igual: te
						orientamos.
					</p>
				</div>
				<ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{AREAS.map(({ icon: Icon, title, desc }) => (
						<li
							key={title}
							className="group relative overflow-hidden rounded-2xl border border-inlar-cream-2 bg-white p-6 transition-all hover:-translate-y-1 hover:border-inlar-accent/40 hover:shadow-xl hover:shadow-inlar-primary/10">
							<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-inlar-cream-2/60 text-inlar-primary transition-colors group-hover:bg-inlar-primary group-hover:text-inlar-cream">
								<Icon className="h-6 w-6" />
							</div>
							<h3 className="font-serif text-xl text-inlar-primary">{title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-inlar-ink/70">{desc}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

function Agenda() {
	return (
		<section
			id="agenda"
			aria-labelledby="agenda-h"
			className="bg-inlar-deep py-20 text-inlar-cream lg:py-28">
			<div className="mx-auto max-w-6xl px-4 sm:px-6">
				<div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
					<div>
						<p className="font-script text-xl text-inlar-sand">Agendá tu consulta</p>
						<h2
							id="agenda-h"
							className="mt-1 font-serif text-4xl leading-tight sm:text-5xl">
							Reservá un horario que te <em className="text-inlar-sand">quede cómodo</em>.
						</h2>
						<p className="mt-4 text-lg text-inlar-cream/70">
							Coordinamos una primera reunión de 30 minutos, presencial u online, para escuchar tu caso y proponerte un camino.
						</p>
						<ul className="mt-8 space-y-3 text-sm text-inlar-cream/80">
							<li className="flex items-start gap-3">
								<span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-inlar-sand" />
								Primera consulta sin cargo
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-inlar-sand" />
								Reunión por Google Meet o presencial
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-inlar-sand" />
								Respuesta dentro de las 24 horas
							</li>
						</ul>
					</div>
					<div className="overflow-hidden rounded-2xl border border-inlar-cream/10 bg-inlar-cream shadow-2xl">
						<iframe
							title="Agendar consulta con INLAR"
							src={INLAR.calendlyUrl}
							className="h-[640px] w-full"
							loading="lazy"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

const contactSchema = z.object({
	nombre: z.string().trim().min(2, 'Ingresá tu nombre').max(100),
	email: z.string().trim().email('Email inválido').max(255),
	telefono: z.string().trim().max(30).optional().or(z.literal('')),
	mensaje: z.string().trim().min(10, 'Contanos un poco más (mín. 10 caracteres)').max(1500),
});

function Contacto() {
	const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
	const [errors, setErrors] = useState<Record<string, string>>({});

	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setErrors({});
		const fd = new FormData(e.currentTarget);
		const raw = Object.fromEntries(fd.entries());
		const parsed = contactSchema.safeParse(raw);
		if (!parsed.success) {
			const es: Record<string, string> = {};
			for (const issue of parsed.error.issues) es[issue.path[0] as string] = issue.message;
			setErrors(es);
			return;
		}
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(parsed.data),
			});
			if (!res.ok) throw new Error('fail');
			setStatus('ok');
			(e.target as HTMLFormElement).reset();
		} catch {
			setStatus('err');
		}
	}

	return (
		<section
			id="contacto"
			aria-labelledby="contacto-h"
			className="py-20 lg:py-28">
			<div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
				<div>
					<p className="font-script text-xl text-inlar-copper">Contacto</p>
					<h2
						id="contacto-h"
						className="mt-1 font-serif text-4xl leading-tight text-inlar-primary sm:text-5xl">
						Hablemos.
					</h2>
					<p className="mt-4 text-lg text-inlar-ink/75">Escribinos y te respondemos dentro de las próximas 24 horas hábiles.</p>
					<ul className="mt-8 space-y-4 text-sm">
						<li className="flex items-center gap-3">
							<Mail className="h-4 w-4 text-inlar-accent" />
							<a
								href={`mailto:${INLAR.email}`}
								className="text-inlar-ink hover:text-inlar-primary">
								{INLAR.email}
							</a>
						</li>
						<li className="flex items-center gap-3">
							<Phone className="h-4 w-4 text-inlar-accent" />
							<a
								href={`tel:${INLAR.telefono.replace(/\s/g, '')}`}
								className="text-inlar-ink hover:text-inlar-primary">
								{INLAR.telefono}
							</a>
						</li>
						<li className="flex items-center gap-3">
							<MapPin className="h-4 w-4 text-inlar-accent" />
							<span className="text-inlar-ink">{INLAR.direccion}</span>
						</li>
					</ul>
					<a
						href={`https://wa.me/${INLAR.whatsapp}?text=${encodeURIComponent(INLAR.whatsappMsg)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-8 inline-flex items-center gap-2 rounded-full border border-inlar-primary/25 px-5 py-2.5 text-sm font-semibold text-inlar-primary hover:bg-inlar-primary hover:text-inlar-cream">
						<MessageCircle className="h-4 w-4" /> Escribinos por WhatsApp
					</a>
				</div>
				<form
					onSubmit={onSubmit}
					className="rounded-2xl border border-inlar-cream-2 bg-white p-6 shadow-xl shadow-inlar-primary/5 sm:p-8"
					noValidate>
					<div className="grid gap-5 sm:grid-cols-2">
						<Field
							label="Nombre"
							name="nombre"
							error={errors.nombre}
							required
						/>
						<Field
							label="Email"
							name="email"
							type="email"
							error={errors.email}
							required
						/>
					</div>
					<div className="mt-5">
						<Field
							label="Teléfono (opcional)"
							name="telefono"
							error={errors.telefono}
						/>
					</div>
					<div className="mt-5">
						<label
							className="block text-sm font-medium text-inlar-primary"
							htmlFor="mensaje">
							Mensaje
						</label>
						<textarea
							id="mensaje"
							name="mensaje"
							rows={5}
							className="mt-1.5 w-full rounded-lg border border-inlar-cream-2 bg-white px-3.5 py-2.5 text-sm text-inlar-ink outline-none transition-colors focus:border-inlar-accent focus:ring-2 focus:ring-inlar-accent/20"
							placeholder="Contanos brevemente tu consulta"
						/>
						{errors.mensaje && <p className="mt-1 text-xs text-red-600">{errors.mensaje}</p>}
					</div>
					<button
						type="submit"
						disabled={status === 'sending'}
						className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-inlar-primary px-6 py-3 text-sm font-semibold text-inlar-cream transition-all hover:bg-inlar-accent hover:shadow-lg hover:shadow-inlar-primary/25 disabled:opacity-60 sm:w-auto">
						Enviar consulta <ArrowRight className="h-4 w-4" />
					</button>
					{status === 'ok' && (
						<p className="mt-3 text-sm text-inlar-primary">¡Gracias! Recibimos tu mensaje y te vamos a responder pronto.</p>
					)}
					{status === 'err' && <p className="mt-3 text-sm text-red-600">Ocurrió un error. Probá de nuevo o escribinos por WhatsApp.</p>}
					<p className="mt-4 text-xs text-inlar-ink/50">
						Al enviar aceptás nuestro tratamiento de datos personales conforme a la Ley 25.326.
					</p>
				</form>
			</div>
		</section>
	);
}

function Field({
	label,
	name,
	type = 'text',
	error,
	required,
}: {
	label: string;
	name: string;
	type?: string;
	error?: string;
	required?: boolean;
}) {
	return (
		<div>
			<label
				className="block text-sm font-medium text-inlar-primary"
				htmlFor={name}>
				{label}
				{required && <span className="ml-0.5 text-inlar-accent">*</span>}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				className="mt-1.5 w-full rounded-lg border border-inlar-cream-2 bg-white px-3.5 py-2.5 text-sm text-inlar-ink outline-none transition-colors focus:border-inlar-accent focus:ring-2 focus:ring-inlar-accent/20"
			/>
			{error && <p className="mt-1 text-xs text-red-600">{error}</p>}
		</div>
	);
}

function Footer() {
	return (
		<footer className="border-t border-inlar-cream-2 bg-inlar-deep text-inlar-cream/80">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
				<div>
					<p className="font-serif text-3xl text-inlar-cream">INLAR</p>
					<p className="mt-1 text-xs uppercase tracking-[0.25em] text-inlar-sand">Estudio Jurídico</p>
					<p className="mt-4 max-w-sm text-sm leading-relaxed text-inlar-cream/60">
						Derecho moderno, cercano y con criterio. Buenos Aires, Argentina.
					</p>
				</div>
				<div>
					<p className="text-xs uppercase tracking-widest text-inlar-sand">Sitio</p>
					<ul className="mt-4 space-y-2 text-sm">
						<li>
							<a
								href="#nosotras"
								className="hover:text-inlar-cream">
								Nosotras
							</a>
						</li>
						<li>
							<a
								href="#areas"
								className="hover:text-inlar-cream">
								Áreas
							</a>
						</li>
						<li>
							<a
								href="#agenda"
								className="hover:text-inlar-cream">
								Agendá
							</a>
						</li>
						<li>
							<a
								href="#contacto"
								className="hover:text-inlar-cream">
								Contacto
							</a>
						</li>
						<li>
							<a
								href={INLAR.blogUrl}
								className="hover:text-inlar-cream">
								Blog ↗
							</a>
						</li>
					</ul>
				</div>
				<div>
					<p className="text-xs uppercase tracking-widest text-inlar-sand">Contacto</p>
					<ul className="mt-4 space-y-2 text-sm">
						<li>
							<a
								href={`mailto:${INLAR.email}`}
								className="hover:text-inlar-cream">
								{INLAR.email}
							</a>
						</li>
						<li>{INLAR.telefono}</li>
						<li>{INLAR.direccion}</li>
					</ul>
					<div className="mt-5 flex gap-3">
						<a
							href={INLAR.instagram}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram"
							className="rounded-full border border-inlar-cream/20 p-2 hover:border-inlar-cream hover:text-inlar-cream">
							<Globe className="h-4 w-4" />
						</a>
						<a
							href={INLAR.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
							className="rounded-full border border-inlar-cream/20 p-2 hover:border-inlar-cream hover:text-inlar-cream">
							<Share2 className="h-4 w-4" />
						</a>
					</div>
				</div>
			</div>
			<div className="border-t border-inlar-cream/10">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-inlar-cream/50 sm:flex-row sm:px-6">
					<p>© {new Date().getFullYear()} INLAR Estudio Jurídico. Todos los derechos reservados.</p>
					<p>Buenos Aires · Argentina</p>
				</div>
			</div>
		</footer>
	);
}

function WhatsAppFab() {
	return (
		<a
			href={`https://wa.me/${INLAR.whatsapp}?text=${encodeURIComponent(INLAR.whatsappMsg)}`}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chatear por WhatsApp"
			className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-110">
			<MessageCircle className="h-7 w-7" />
			<span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
		</a>
	);
}
