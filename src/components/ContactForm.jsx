// export default function ContactForm() {
//   return <div>ContactForm</div>;
// }

'use client';

import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { verifyCaptcha } from '@/util/verifyCaptcha';
import { useMediaQuery } from '@/util/useMediaQuery';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  const recaptchaRef = useRef();
  const [isVerified, setIsVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const isDesktop = useMediaQuery('md');

  const sendEmail = async (captchaToken) => {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
        captchaToken,
      }),
    });
    const data = await res.json();
    if (!res.ok || data.error) {
      throw new Error(data?.error?.message || 'Falha ao enviar mensagem.');
    }
  };

  async function handleCaptchaSubmission(token) {
    setSubmitError('');
    setIsSending(true);
    try {
      await verifyCaptcha(token);
      setIsVerified(true);
      await sendEmail(token);
      setShowCaptcha(false);
      alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
    } catch (err) {
      setIsVerified(false);
      recaptchaRef.current?.reset();
      setSubmitError(
        'Não foi possível enviar a mensagem. Tente novamente em instantes.'
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className='w-full font-chakra'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowCaptcha(true);
        }}
      >
        <div className='flex flex-col w-full md:pb-1 pb-2'>
          <label className='lowercase text-sm pb-0' htmlFor='from_name'>
            nome
          </label>
          <input
            className='rounded-sm p-1 md:p-2 flex w-full text-neutral-200 bg-neutral-800 outline-none'
            type='text'
            name='from_name'
            id='from_name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className='flex flex-col pb-1'>
          <label className='lowercase text-sm' htmlFor='reply_to'>
            e-mail
          </label>
          <input
            type='email'
            name='reply_to'
            id='reply_to'
            className='rounded-sm p-1 md:p-2 flex bg-neutral-800 text-neutral-200 outline-none'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='flex flex-col pb-1'>
          <label className='lowercase text-sm' htmlFor='subject'>
            Assunto
          </label>
          <input
            type='text'
            name='subject'
            id='subject'
            className='rounded-sm p-1 md:p-2 flex bg-neutral-800 text-neutral-200 outline-none'
            required
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          />
        </div>
        <div className='flex flex-col pb-1'>
          <label className='lowercase text-sm' htmlFor='message'>
            Mensagem
          </label>
          <textarea
            className='rounded-sm p-1 md:p-2  bg-neutral-800 text-neutral-200 outline-none'
            rows={isDesktop ? 10 : 6}
            name='message'
            id='message'
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>

        {!showCaptcha ? (
          <button className='w-full lowercase bg-neutral-600 rounded-md py-2 text-gray-100 mt-2 hover:bg-neutral-500 hover:scale-[1.01] ease-in-out duration-300 text-sm'>
            Enviar
          </button>
        ) : (
          <div className='flex flex-col w-full gap-2 text-sm'>
            <div className='flex w-full gap-4 justify-between items-center'>
              <div>
                {isSending
                  ? 'Enviando mensagem...'
                  : 'Complete o CAPTCHA para enviar:'}
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
              />
            </div>
            {submitError && (
              <div className='text-red-400'>{submitError}</div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
