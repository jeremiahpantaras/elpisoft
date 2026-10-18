/**
 * Industries Elpisoft builds for.
 *
 * evidence: true  -> Elpisoft has built related products (listed in `projectSlugs`; these are Elpisoft's own
 *                    products and projects, never presented as client work).
 * evidence: false -> a capability the owner has confirmed, shown without any related-work or experience claims.
 *
 * serviceIds refer to SERVICES ids in services.js; projectSlugs refer to PROJECTS slugs in projects.js.
 */
export const INDUSTRIES = [
  {
    slug: 'finance',
    name: 'Finance and lending',
    evidence: true,
    menuExamples: ['Lending systems', 'Budgeting tools'],
    challenges: [
      'Loan records kept in spreadsheets',
      'Slow, manual approval and follow-up',
      'Little visibility of balances and repayments',
    ],
    solutions: ['Lending and loan management systems', 'Budgeting and personal finance tools', 'Financial dashboards'],
    serviceIds: ['software', 'web', 'automation'],
    projectSlugs: ['avendro', 'epuno'],
  },
  {
    slug: 'retail',
    name: 'Retail and e-commerce',
    evidence: true,
    menuExamples: ['Point of sale', 'Receipts for online sellers'],
    challenges: [
      'Manual receipts and paperwork',
      'Keeping track of stock and sales',
      'Keeping customers informed',
    ],
    solutions: ['Point of sale and inventory', 'Receipt and invoice generation', 'Tools for online sellers', 'SMS notifications'],
    serviceIds: ['web', 'software', 'inventory', 'automation', 'mobile'],
    projectSlugs: ['recivo', 'point-of-sale', 'inventory-management-system', 'sms-gateway'],
  },
  {
    slug: 'education',
    name: 'Education',
    evidence: true,
    menuExamples: ['Student management', 'Gamified learning'],
    challenges: [
      'Student records spread across files',
      'Reporting for administrators',
      'Keeping learners engaged',
    ],
    solutions: ['Student management and analytics dashboards', 'Gamified learning apps'],
    serviceIds: ['software', 'web', 'mobile'],
    projectSlugs: ['student-management', 'sentinels'],
  },
  {
    slug: 'public-sector',
    name: 'Public safety and communities',
    evidence: true,
    menuExamples: ['Emergency requests', 'Civic feedback'],
    challenges: [
      'Slow emergency requests',
      'Sharing an exact location quickly',
      'Safe channels for honest feedback',
    ],
    solutions: ['Emergency request and dispatch systems', 'Anonymous feedback and civic participation platforms'],
    serviceIds: ['web', 'software', 'mobile'],
    projectSlugs: ['tabang-negros', 'incognito'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    evidence: false,
    menuExamples: ['Appointments', 'Patient records'],
    challenges: [
      'Scheduling appointments by phone and paper',
      'Patient records in several places',
      'Missed appointments and reminders',
    ],
    solutions: ['Clinic appointment and queue systems', 'Patient record systems', 'SMS reminders', 'Staff dashboards'],
    note: 'Health information is personal data, so we design with privacy in mind from the start.',
    serviceIds: ['software', 'web', 'mobile', 'automation'],
    projectSlugs: [],
  },
  {
    slug: 'logistics',
    name: 'Logistics and delivery',
    evidence: false,
    menuExamples: ['Dispatch and tracking', 'Rider apps'],
    challenges: [
      'Dispatching jobs by phone and chat',
      'No clear view of delivery status',
      'Paperwork at every handover',
    ],
    solutions: ['Dispatch and job tracking', 'Driver and rider apps', 'Delivery status notifications', 'Operations dashboards', 'Warehouse and branch stock tracking'],
    serviceIds: ['software', 'inventory', 'mobile', 'automation'],
    projectSlugs: [],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality and tourism',
    evidence: false,
    menuExamples: ['Reservations', 'Guest messaging'],
    challenges: [
      'Bookings arriving through several channels',
      'Keeping guests informed',
      'Manual day-to-day operations',
    ],
    solutions: ['Reservation and booking systems', 'Guest messaging', 'Operations dashboards'],
    serviceIds: ['web', 'software', 'automation'],
    projectSlugs: [],
  },
  {
    slug: 'real-estate',
    name: 'Real estate',
    evidence: false,
    menuExamples: ['Listing portals', 'Lead management'],
    challenges: [
      'Listings and enquiries in different places',
      'Follow-ups that slip through',
      'Tracking rent and tenants by hand',
    ],
    solutions: ['Property listing portals', 'Enquiry and lead management', 'Rent and tenant tracking'],
    serviceIds: ['web', 'software', 'automation'],
    projectSlugs: [],
  },
]

/** The verified project shown in the Industry menu (an Elpisoft-built product, presented as "Our work"). */
export const FEATURED_INDUSTRY_PROJECT = 'tabang-negros'

export const industryPath = (industry) => `/industries#${industry.slug}`

export const industriesForService = (serviceId) => INDUSTRIES.filter((industry) => industry.serviceIds.includes(serviceId))
