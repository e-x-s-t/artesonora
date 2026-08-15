import EmailTemplate from '../../../components/EmailTemplate';
import { Resend } from 'resend';
import { verifyCaptcha } from '@/util/verifyCaptcha';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const request = await req.json();
    const { name, email, subject, message, captchaToken } = request;

    try {
      await verifyCaptcha(captchaToken);
    } catch (captchaError) {
      return Response.json(
        { error: { message: 'Falha na verificação do CAPTCHA.' } },
        { status: 403 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `${name} <artesonora@uint.studio>`,
      //   TODO: change to the correct email(s)
      to: ['vitorbutkus@gmail.com'],
      reply_to: `${name} <${email}>`,
      subject: subject,
      react: EmailTemplate({ name, email, subject, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
