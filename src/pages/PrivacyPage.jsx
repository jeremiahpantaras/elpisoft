import { ArrowUpRight } from 'lucide-react'
import PageIntro from '../components/ui/PageIntro'
import Section from '../components/ui/Section'
import { BRAND } from '../config/brand'

const linkCls = 'font-semibold text-horizon underline underline-offset-4'
const { dpoName, dpoRole, lastUpdated } = BRAND.privacy

/**
 * Privacy policy under the Philippine Data Privacy Act of 2012 (RA 10173), its IRR and NPC guidance.
 * Body items are a paragraph (string), `{ list: [...] }` or JSX. It must only describe what the site actually does:
 * no cookies or browser storage, Formspree for the contact form, Vercel hosting and cookieless analytics, Google
 * Calendar/Meet for booking. Update BRAND.privacy.lastUpdated when the text changes.
 */
const SECTIONS = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    body: [
      `${BRAND.name} is a software studio based in ${BRAND.contact.addressLine1}, ${BRAND.contact.addressLine2}. For website enquiries and our own business records, ${BRAND.name} is the personal information controller.`,
      'When we build or maintain systems that hold our clients’ data, we act as a personal information processor for that client (see “Client projects”).',
    ],
  },
  {
    id: 'information-we-collect',
    heading: 'Information we collect',
    body: [
      {
        list: [
          'Contact form: your name, email address, subject and message. The form is delivered to us by Formspree.',
          'Email, phone, WhatsApp, Telegram and Viber: whatever you send us, including your name, phone number or handle.',
          'Booking a call: the name, email address and any answers you give on the Google Calendar booking page, the time you choose, and the Google Meet call itself. We do not record calls unless everyone agrees first.',
          'Website analytics: the page visited, referrer, country, device and browser type, collected in aggregate by Vercel Web Analytics. It does not use cookies.',
          'Clients: contact and billing details of client representatives, and project information you give us.',
        ],
      },
      'We do not ask for sensitive personal information (such as health information, government ID numbers or financial account details) through this website. Please do not send it unless we have agreed a secure way to do so.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: 'How we use it',
    body: [
      {
        list: [
          'To reply to enquiries and schedule calls.',
          'To prepare proposals, and to deliver, support and invoice projects.',
          'To keep business and tax records.',
          'To understand how the website is used and to improve it.',
          'To protect the website from spam and abuse.',
        ],
      },
      'We do not sell or rent personal information, and we do not use it for automated decision-making or profiling.',
    ],
  },
  {
    id: 'legal-basis',
    heading: 'Our legal basis',
    body: [
      'Under Section 12 of the Data Privacy Act, we process personal information on these grounds:',
      {
        list: [
          'Consent: when you contact us or book a call.',
          'Contract: steps before and during a project.',
          'Legal obligation: for example, tax and accounting records.',
          'Legitimate interests: keeping the website secure and understanding its use through aggregated analytics, where these do not override your fundamental rights and freedoms.',
        ],
      },
    ],
  },
  {
    id: 'sharing',
    heading: 'Who we share it with',
    body: [
      'We use service providers that process information for us:',
      {
        list: [
          'Formspree: delivers contact form messages.',
          'Google: Gmail, Calendar and Meet, for email and booked calls.',
          'Vercel: hosts the website and provides cookieless analytics.',
          'WhatsApp (Meta), Telegram and Viber: only if you choose to contact us through them.',
        ],
      },
      'We share only what each provider needs, and they handle it under their own privacy terms and security measures. We may also disclose information to government authorities when the law requires it.',
    ],
  },
  {
    id: 'international-transfers',
    heading: 'International transfers',
    body: [
      'Some of these providers store or process information outside the Philippines. We remain responsible for personal information we transfer, and we use providers that apply appropriate safeguards.',
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    body: [
      {
        list: [
          'Enquiries that do not lead to a project (form messages, emails, chats and booking details): up to 2 years, then deleted or anonymised.',
          'Client and project records: for the length of the engagement, then for as long as the law requires, for example Philippine tax rules on books of accounts and supporting records, which are generally 10 years.',
          'Analytics: aggregated by Vercel and kept under Vercel’s terms.',
        ],
      },
    ],
  },
  {
    id: 'security',
    heading: 'How we protect it',
    body: [
      'We use organisational, physical and technical measures appropriate to the risk: access limited to the people who need it, encrypted connections (HTTPS) on this website, account security on the services we use, and care when handling client data. No method is perfectly secure, but we work to protect your information and review our measures.',
    ],
  },
  {
    id: 'breaches',
    heading: 'Personal data breaches',
    body: [
      'If a personal data breach is likely to put you at real risk of serious harm, we will notify the National Privacy Commission and the affected individuals within 72 hours of becoming aware of it, as NPC rules require.',
    ],
  },
  {
    id: 'client-projects',
    heading: 'Client projects',
    body: [
      'When clients give us access to personal data in their systems, we process it only on their documented instructions and for the agreed work. We keep it confidential and secure, and return or delete it when the work ends, as set out in the project agreement.',
      'Clients remain the controllers of that data, so if your information is held in a client’s system, please contact that client first.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: [
      'As a data subject, you have the right:',
      {
        list: [
          'To be informed about how your personal information is processed.',
          'To access the personal information we hold about you.',
          'To object to processing, including withdrawing consent.',
          'To erasure or blocking, when your information is incomplete, outdated, false, unlawfully obtained or no longer needed.',
          'To rectification of errors in your personal information.',
          'To data portability, where it applies.',
          'To damages, if you are harmed by inaccurate, incomplete, outdated, false or unlawfully obtained information, or by its unauthorised use.',
          'To file a complaint with the National Privacy Commission.',
        ],
      },
      'These rights are subject to the limits set by law.',
    ],
  },
  {
    id: 'children',
    heading: 'Children',
    body: [
      'This website and our services are for businesses and adults. We do not knowingly collect personal information from children under 18. If you believe a child has sent us information, contact us and we will delete it.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies and similar technologies',
    body: [
      'This website does not use cookies or store information in your browser for tracking or advertising, and our analytics is cookieless. Links to other websites, such as Google Calendar or chat apps, are governed by those sites’ own policies and cookies.',
    ],
  },
  {
    id: 'contact-dpo',
    heading: 'Contact our Data Protection Officer',
    body: [
      <>
        Data Protection Officer: {dpoName}, {dpoRole}, {BRAND.name}.
      </>,
      <>
        Email: <a href={`mailto:${BRAND.contact.email}`} className={`${linkCls} break-all`}>{BRAND.contact.email}</a>
        <br />
        Phone: <a href={`tel:${BRAND.contact.phoneRaw}`} className={linkCls}>{BRAND.contact.phone}</a>
        <br />
        Address: {BRAND.contact.addressLine1}, {BRAND.contact.addressLine2}
      </>,
      'Send us your request or question and we will aim to respond within 15 working days.',
    ],
  },
  {
    id: 'complaints',
    heading: 'Complaints to the National Privacy Commission',
    body: [
      <>
        If you are not satisfied with our response, you may file a complaint with the National Privacy Commission at{' '}
        <a href="https://privacy.gov.ph/" target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-1`}>
          privacy.gov.ph
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </>,
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      `We will post updates on this page and change the “Last updated” date. Last updated: ${lastUpdated}.`,
    ],
  },
]

const renderBody = (item, i) => {
  if (typeof item === 'string') return <p key={i} className="mt-3 text-slate">{item}</p>
  if (item.list) {
    return (
      <ul key={i} className="mt-3 list-disc space-y-2 pl-5 text-slate">
        {item.list.map((entry) => <li key={entry}>{entry}</li>)}
      </ul>
    )
  }
  return <p key={i} className="mt-3 text-slate">{item}</p>
}

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy" crumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]}>
        <p>
          This Privacy Policy explains how {BRAND.name} collects, uses, shares and protects personal information, in line
          with the Data Privacy Act of 2012 (Republic Act No. 10173), its Implementing Rules and Regulations, and
          issuances of the National Privacy Commission.
        </p>
        <p className="type-caption mt-4 text-slate">Last updated: {lastUpdated}</p>
      </PageIntro>

      <Section surface="white">
        <div className="max-w-[68ch]">
          <nav aria-label="On this page">
            <p className="type-label text-slate">On this page</p>
            <ol className="mt-3 columns-1 gap-8 md:columns-2">
              {SECTIONS.map((section, i) => (
                <li key={section.id} className="break-inside-avoid py-1">
                  <a href={`#${section.id}`} className={linkCls}>{i + 1}. {section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-10">
            {SECTIONS.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
                <h2 id={`${section.id}-heading`} className="type-h3">{i + 1}. {section.heading}</h2>
                {section.body.map(renderBody)}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
