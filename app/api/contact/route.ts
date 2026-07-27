import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
	nombre: z.string().trim().min(2).max(100),
	email: z.string().trim().email().max(255),
	telefono: z.string().trim().max(30).optional().or(z.literal('')),
	mensaje: z.string().trim().min(10).max(1500),
});

export async function POST(req: Request) {
	const body = await req.json().catch(() => null);
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
	}

	try {
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
