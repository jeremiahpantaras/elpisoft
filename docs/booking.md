# Book a call (Google Meet)

The **Book a call** buttons (header, hero, menus, mobile menu, closing section, industry sections) open a
**Google Calendar appointment-schedule booking page** in a new tab. Google handles availability, the booking
form, the calendar event and the Google Meet link. The website only links to that page: there is no Google
sign-in, API, backend or third-party script, and no credentials are stored.

**Current status:** configured. `BOOKING_URL_FALLBACK` in `src/config/brand.js` holds the public link to the
"Discovery call with Elpisoft" schedule (30 minutes, `elpisoftph@gmail.com`). The `VITE_BOOKING_URL` variable, if
set, overrides it without a code change.

## Configuration key

| | |
|---|---|
| **Key** | `VITE_BOOKING_URL` |
| **Value** | the public `https://` booking-page link copied from Google Calendar |
| **Where** | Vercel -> Project -> Settings -> Environment Variables (Production), or `.env.local` for local builds (see `.env.example`). Alternatively set `BOOKING_URL_FALLBACK` in `src/config/brand.js`. |
| **When it applies** | at **build** time: after changing it, redeploy (Vercel) or rebuild |
| **If empty or invalid** | every button links to **/contact#call** (the Contact page's call options) instead. Only `https://` URLs are accepted, so a typo, an `http://` link or a `javascript:` value is ignored. |

While no URL is configured, the hero note reads "Tell us about your project and we will arrange a call."
Once configured it reads "Free 30-minute discovery call on Google Meet." (from `BRAND.booking` in
`src/config/brand.js`: `durationMinutes`, `provider`).

## One-time setup in Google Calendar (about 15 minutes)

Use the Elpisoft Google account (`elpisoftph@gmail.com`). Appointment schedules can only be created in Google
Calendar on a computer, not in the mobile app.

1. Open <https://calendar.google.com> and sign in.
2. **Time zone:** Settings (gear) -> General -> Time zone -> **(GMT+08:00) Manila**.
3. Click **Create -> Appointment schedule**.
4. **Title:** "Discovery call with Elpisoft".
5. **Duration:** 30 minutes (the proposed default; change it if you prefer, then update `durationMinutes` in
   `src/config/brand.js` so the site's wording matches).
6. **General availability:** choose your weekly hours. Suggestion: Monday to Friday, including afternoons
   (13:00 to 17:00 Philippine time is 09:00 to 13:00 in the UAE) so visitors in the UAE can book.
7. **Scheduling window:** how far ahead people can book (for example 1 to 30 days) and the **minimum notice**
   (the default is 4 hours; 24 hours is a sensible proposal).
8. **Booked appointment settings:** a **buffer** between calls (proposal: 15 minutes) and a maximum number of
   bookings per day (proposal: 4). Leave "Check calendars for availability" on.
9. Click **Next**.
10. **Booking page:** add your name/photo (use the Elpisoft symbol logo), and in **Location** choose
    **Google Meet video conference** so every booking gets a Meet link.
11. **Description:** for example "A free 30-minute call to understand what you want to build and suggest honest
    next steps."
12. **Booking form:** first name, last name and email are always asked. Add optional questions such as
    "Company" and "What would you like to build?" where the form allows it.
13. **Confirmations and reminders:** set up the confirmation email and any reminders the account allows.
14. Click **Save**.
15. Under **Booking pages** in the left sidebar, hover the schedule and click **Copy link**.
16. Put that link in `VITE_BOOKING_URL` (see above) and redeploy.
17. **Test it:** open the website, click **Book a call**, book a slot with a different email address, and confirm
    that (a) the event appears on the Elpisoft calendar with a Google Meet link, and (b) the booker receives
    confirmation details. Cancel the test booking afterwards.

## What a free Google account includes

From Google's help pages (links below): a free personal account can create **one** booking page, with Google
Meet, buffer time, a maximum per day, minimum notice and custom booking-form items. **Automatic email
reminders, email verification (to block spam bookings), multiple booking pages, checking several calendars
for availability and paid bookings need an eligible Google Workspace or Google One subscription.** Check the
"Compare premium features" page for the current plan list.

Upgrading later (for example to Google Workspace with `hello@elpisoft.com`) only means creating the schedule in
the new account and replacing the `VITE_BOOKING_URL` value. No code changes.

## Things to verify during setup (not confirmed from Google's documentation)
- Whether the free tier sends the booker a confirmation email that includes the Meet link.
- How the booker's time zone is shown on the booking page (it should default to their own).

## Analytics
Each click sends a `book_call_click` event (`location`: header, hero, menu-services, menu-industry, mobile-menu,
closing, industry-<slug>; `configured`: true/false) to Vercel Web Analytics. Custom events need a Vercel Pro or
Enterprise plan; on other plans the calls are ignored.

## Google documentation
- Appointment schedules: <https://support.google.com/calendar/answer/10729749>
- Booking pages: <https://support.google.com/calendar/answer/11608416>
- Share an appointment schedule: <https://support.google.com/calendar/answer/10733297>
- Compare premium features: <https://support.google.com/calendar/answer/16287038>
- Google Meet in Calendar: <https://support.google.com/calendar/answer/9896550>
