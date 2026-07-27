import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
	nombre: z.string().trim().min(2).max(100),
	email: z.string().trim().email().max(255),
	telefono: z.string().trim().max(30).optional().or(z.literal('')),
	mensaje: z.string().trim().min(10).max(1500),
	recaptchaToken: z.string().trim().min(1),
});

const RECAPTCHA_ACTION = 'contact_form';
const RECAPTCHA_MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5');

async function verifyRecaptcha(token: string) {
	const secret = process.env.RECAPTCHA_SECRET_KEY;

	if (!secret) {
		throw new Error('Missing RECAPTCHA_SECRET_KEY.');
	}

	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			secret,
			response: token,
		}),
	});

	if (!response.ok) {
		throw new Error('Failed to verify reCAPTCHA.');
	}

	return (await response.json()) as {
		success: boolean;
		score?: number;
		action?: string;
		challenge_ts?: string;
		hostname?: string;
		'error-codes'?: string[];
	};
}

export async function POST(req: Request) {
	const body = await req.json().catch(() => null);
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
	}

	try {
		const recaptcha = await verifyRecaptcha(parsed.data.recaptchaToken);

		if (!recaptcha.success || recaptcha.action !== RECAPTCHA_ACTION || (recaptcha.score ?? 0) < RECAPTCHA_MIN_SCORE) {
			console.warn('reCAPTCHA rejected contact form submission:', {
				action: recaptcha.action,
				score: recaptcha.score,
				errorCodes: recaptcha['error-codes'],
			});

			return NextResponse.json({ ok: false, error: 'reCAPTCHA validation failed.' }, { status: 403 });
		}

		const response = await fetch('https://api.brevo.com/v3/smtp/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': process.env.BREVO_API_KEY!,
			},
			body: JSON.stringify({
				sender: {
					name: 'INLAR',
					email: process.env.CONTACT_FORM_SENDER!,
				},
				to: [
					{
						email: process.env.CONTACT_FORM_RECIPIENT!,
					},
				],
				replyTo: {
					name: parsed.data.nombre,
					email: parsed.data.email,
				},
				subject: `Nueva consulta de ${parsed.data.nombre}`,
				textContent: `
Nombre: ${parsed.data.nombre}
Email: ${parsed.data.email}
Teléfono: ${parsed.data.telefono || '-'}

Mensaje:

${parsed.data.mensaje}
        `.trim(),
			}),
		});

		if (!response.ok) {
			const error = await response.text();
			console.error('Brevo error:', response.status, error);

			return NextResponse.json({ ok: false, error: 'Failed to send email.' }, { status: 500 });
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error('Contact form error:', error);

		return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
	}
}
