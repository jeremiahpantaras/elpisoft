/**
 * Core services and supporting capabilities.
 * `id` links services to projects (see projects.js). `slug` is the detail-page path under /services.
 * `intro` and the meta fields are written only from facts already on the site, or confirmed by the owner
 * (AI solutions): no outcomes, clients or figures.
 */
export const SERVICES = [
  {
    id: 'software',
    family: 'software-web',
    slug: 'custom-software',
    title: 'Custom software',
    h1: 'Custom software development',
    metaTitle: 'Custom software development — Elpisoft',
    metaDescription:
      'Internal systems, dashboards and platforms built around how your team works, from discovery and planning to launch and ongoing support.',
    summary:
      'Systems built around how your team actually works: internal tools, dashboards and platforms designed to last for years, not weeks.',
    intro:
      'Off-the-shelf tools rarely fit the way a team actually works. We design and build software around your process, so it is useful, dependable and ready to grow. We start by understanding the problem, agree a focused plan, and keep you involved as we build.',
    deliverables: ['Internal systems', 'Dashboards and reporting', 'Platforms and integrations'],
  },
  {
    id: 'web',
    family: 'software-web',
    slug: 'web-applications',
    title: 'Web applications',
    h1: 'Web application development',
    metaTitle: 'Web application development — Elpisoft',
    metaDescription:
      'Responsive, accessible web applications and portals that are straightforward to use and to maintain, with examples of web products Elpisoft has built.',
    summary:
      'Responsive, accessible web applications that are straightforward to use, and straightforward for your team to maintain.',
    intro:
      'A web application should be easy for people to use and easy for your team to look after. We build responsive, accessible applications, from portals and dashboards to public-facing products, and we stay on to support them after launch.',
    deliverables: ['Web apps and portals', 'Marketing and product sites', 'Admin consoles'],
  },
  {
    id: 'inventory',
    family: 'software-web',
    slug: 'inventory-management-systems',
    title: 'Inventory management systems',
    h1: 'Inventory management system development',
    metaTitle: 'Inventory management system development — Elpisoft',
    metaDescription:
      'Custom inventory management systems that keep stock levels, stock value and reports in one place, built around your items, branches and way of working.',
    summary:
      'Know what you have, what is running low and what it is worth, with an inventory system built around your items and your way of working.',
    intro:
      'Spreadsheets and paper stock cards make it hard to know what is on hand, what is running low and what your stock is worth. We build inventory management systems around how your business works, from item records, stock levels and reports to multiple branches, staff accounts, barcode scanning and a connection to your sales.',
    deliverables: ['Stock tracking', 'Reports and Excel export', 'Branches, barcodes and POS links'],
    // Optional page sections (see ServiceDetailPage). "Core features" are those shown in our own inventory system;
    // the second group is what we can add when a business needs it, and is never presented as part of that system.
    challenges: [
      'Stock counts kept in spreadsheets or on paper',
      'Running out of items without warning',
      'No clear view of what the stock is worth',
      'Slow reporting for audits and reordering',
    ],
    offerGroups: [
      {
        title: 'Core features',
        note: 'As in the inventory system we built',
        items: [
          'Item records with SKU, quantity, price and stock value',
          'Search, filters, and low-stock and out-of-stock views',
          'A dashboard and stock valuation reports',
          'Excel (.xlsx) report export',
        ],
      },
      {
        title: 'Built to your needs',
        note: 'Added when your business needs them',
        items: [
          'Multiple branches or warehouses',
          'Staff accounts and roles',
          'Barcode and QR scanning',
          'A connection to your point of sale or sales records',
        ],
      },
    ],
    caseStudySlug: 'inventory-management-system',
  },
  {
    id: 'mobile',
    family: 'mobile',
    slug: 'mobile-apps',
    title: 'Mobile apps',
    h1: 'Mobile app development',
    metaTitle: 'Mobile app development — Elpisoft',
    metaDescription:
      'Native and cross-platform apps for iOS and Android, built for the people who use them every day, including an Android SMS gateway and a mobile game.',
    summary: 'Native and cross-platform apps for iOS and Android, built for the people who will use them every day.',
    intro:
      'Mobile apps are used in short, frequent moments, so they have to be clear and dependable. We build native and cross-platform apps for iOS and Android, and we can create companion apps that work alongside the systems you already have.',
    deliverables: ['Android and iOS apps', 'Cross-platform builds', 'Companion apps for existing systems'],
  },
  {
    id: 'automation',
    family: 'automation-ai',
    slug: 'business-automation',
    title: 'Business automation',
    h1: 'Business automation',
    metaTitle: 'Business automation services — Elpisoft',
    metaDescription:
      'Workflow automation and systems integration that take repetitive manual work off your team, with examples from Elpisoft’s own projects.',
    summary:
      'Connect the systems you already have and take repetitive manual work off your team, so they can focus on the work that needs people.',
    intro:
      'Much of the work in a business is repetition: copying data between systems, producing documents, sending messages. We connect the tools you already use and automate those steps, so your team can spend its time on the work that needs people.',
    deliverables: ['Workflow automation', 'Systems integration', 'Document and data processing'],
  },
  {
    id: 'ai',
    family: 'automation-ai',
    slug: 'ai-solutions',
    title: 'AI solutions',
    isNew: true,
    h1: 'AI solutions',
    metaTitle: 'AI integration and AI-powered features — Elpisoft',
    metaDescription:
      'Practical AI where it helps: AI-powered features such as document summarisation built into your product, and AI services connected to the systems you already use.',
    summary:
      'Practical AI where it helps: features such as document summarisation built into your product, and AI services connected to the systems you already use.',
    intro:
      'AI is useful when it saves people time on real work. We build AI-powered features into products, such as summarising and extracting key information from documents, connect AI services to your existing systems, and help you decide where AI is worth using and where it is not.',
    deliverables: ['AI-powered features', 'AI integration', 'AI consulting'],
  },
]

/** Design and care: shown on /services (with these ids as #anchors), not as separate pages. */
export const SUPPORTING_CAPABILITIES = [
  {
    id: 'design',
    family: 'design-care',
    title: 'UI/UX and product design',
    description: 'Clear, user-centred interfaces for web and mobile, designed with the people who will use them.',
  },
  {
    id: 'cloud',
    family: 'design-care',
    title: 'Cloud and DevOps',
    description: 'Infrastructure setup, deployment pipelines and dependable hosting for what we build.',
  },
  {
    id: 'support',
    family: 'design-care',
    title: 'Maintenance and support',
    description: 'Updates, monitoring and improvements after launch, so your software keeps working for you.',
  },
]

/** Service families: the grouping used by the Services menu and the Services page. */
export const SERVICE_FAMILIES = [
  { id: 'software-web', name: 'Software and web', purpose: 'Systems and applications built around how your business works.' },
  { id: 'mobile', name: 'Mobile', purpose: 'Apps for the people who use them every day.' },
  { id: 'automation-ai', name: 'Automation and AI', purpose: 'Less repetitive work, and practical AI where it helps.' },
  { id: 'design-care', name: 'Design and care', purpose: 'Design, hosting and support that keep a product useful after launch.' },
]

export const servicesInFamily = (familyId) => SERVICES.filter((service) => service.family === familyId)
export const capabilitiesInFamily = (familyId) => SUPPORTING_CAPABILITIES.filter((c) => c.family === familyId)

/** Items for the home-page service marquee: only real offerings, derived from the data above. */
export const MARQUEE_ITEMS = [
  ...SERVICES.map((service) => service.title),
  'Systems integration',
  'Dashboards and reporting',
  'Internal systems',
  ...SUPPORTING_CAPABILITIES.map((c) => c.title),
]

export const servicePath = (service) => `/services/${service.slug}`

/** Lowercases the first letter of a title for use mid-sentence, leaving acronyms such as "AI solutions" intact. */
export const lowerFirst = (text) => (/^[A-Z]{2}/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1))
