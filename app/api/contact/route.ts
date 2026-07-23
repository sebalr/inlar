import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  telefono: z.string().trim().max(30).optional().or(z.literal("")),
  mensaje: z.string().trim().min(10).max(1500),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  // TODO: enviar email real. Ejemplo con Resend:
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY!);
  // await resend.emails.send({
  //   from: "INLAR <web@inlar.com.ar>",
  //   to: "contacto@inlar.com.ar",
  //   replyTo: parsed.data.email,
  //   subject: `Nueva consulta de ${parsed.data.nombre}`,
  //   text: `${parsed.data.mensaje}\n\nTel: ${parsed.data.telefono ?? "-"}\nEmail: ${parsed.data.email}`,
  // });

  console.log("[INLAR contacto]", parsed.data);
  return NextResponse.json({ ok: true });
}
