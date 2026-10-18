import Button from './Button'
import GoogleMeetIcon from './GoogleMeetIcon'
import { BRAND } from '../../config/brand'
import { trackEvent } from '../../lib/analytics'

/**
 * "Book a call" CTA, with the Google Meet icon beside the label. Opens the Google Calendar booking page (Google Meet) in a new tab when BRAND.booking.url is
 * configured; until then it links to the call options on the Contact page, never to an empty link.
 * `location` identifies the placement in analytics (header, hero, mobile-menu, closing, ...).
 */
export default function BookCallButton({ location, variant = 'primary', className = '', children = 'Book a call', ...rest }) {
  const { url, fallbackPath } = BRAND.booking
  const onClick = () => trackEvent('book_call_click', { location, configured: Boolean(url) })
  const label = (
    <>
      {/* White badge keeps the Google Meet colours faithful on any button colour. */}
      <span aria-hidden="true" className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-black/10">
        <GoogleMeetIcon className="h-[1.05rem] w-auto" />
      </span>
      {children}
    </>
  )

  if (url) {
    return (
      <Button href={url} external variant={variant} className={className} onClick={onClick} {...rest}>
        {label}
        <span className="sr-only"> (opens the Google Calendar booking page in a new tab)</span>
      </Button>
    )
  }
  return (
    <Button to={fallbackPath} variant={variant} className={className} onClick={onClick} {...rest}>
      {label}
    </Button>
  )
}
