import { useId, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'
import Button from './Button'
import { BRAND } from '../../config/brand'
import { DUR } from '../../lib/motion'
import { trackEvent } from '../../lib/analytics'

const FIELD =
  'mt-2 block w-full rounded-control border border-slate/70 bg-white px-3.5 py-3 text-base text-navy placeholder:text-slate/70 focus:border-horizon'

/**
 * Project enquiry form. Posts the same fields to the same Formspree endpoint as the previous site:
 * name, email, subject, message, plus the `_gotcha` honeypot.
 */
export default function ContactForm() {
  const uid = useId()
  const reduce = useReducedMotion()
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    const form = e.currentTarget
    try {
      const response = await fetch(BRAND.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        form.reset()
        setStatus('success')
        trackEvent('contact_form_submit')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const id = (name) => `${uid}-${name}`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={status === 'submitting'}>
      {/* M11: status is always in the DOM so screen readers announce changes. */}
      <div role="status" aria-live="polite">
        <AnimatePresence>
          {(status === 'success' || status === 'error') && (
            <Motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: DUR.fast }}
              className={`flex items-start gap-3 rounded-control border border-mist border-l-4 bg-white p-4 text-navy ${
                status === 'success' ? 'border-l-amber' : 'border-l-coral'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
              ) : (
                <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
              )}
              {status === 'success'
                ? 'Thank you. Your message is on its way, and we will reply as soon as we can.'
                : `Something went wrong sending your message. Please try again, or email ${BRAND.contact.email}.`}
            </Motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="text-sm font-semibold">Your name</label>
          <input id={id('name')} name="name" type="text" required autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label htmlFor={id('email')} className="text-sm font-semibold">Your email</label>
          <input id={id('email')} name="email" type="email" required autoComplete="email" className={FIELD} />
        </div>
      </div>
      <div>
        <label htmlFor={id('subject')} className="text-sm font-semibold">Subject</label>
        <input id={id('subject')} name="subject" type="text" required className={FIELD} />
      </div>
      <div>
        <label htmlFor={id('message')} className="text-sm font-semibold">What are you looking to build?</label>
        <textarea id={id('message')} name="message" rows={6} required className={`${FIELD} resize-y`} />
      </div>

      {/* Honeypot */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <p className="text-sm text-slate">
        By sending this form, you agree that {BRAND.name} will use your details to reply to you. See our{' '}
        <Link to="/privacy-policy" className="font-semibold text-horizon underline underline-offset-4">Privacy Policy</Link>.
      </p>

      <Button type="submit" variant="primary" disabled={status === 'submitting'} className="w-full sm:w-auto disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Send message'}
        {status !== 'submitting' && <Send size={16} aria-hidden="true" />}
      </Button>
    </form>
  )
}
