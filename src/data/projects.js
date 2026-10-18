import recivo from '../assets/images/optimized/recivo.webp'
import avendro from '../assets/images/optimized/avendro.webp'
import epuno from '../assets/images/optimized/epuno.webp'
import incognito from '../assets/images/optimized/incognito.webp'
import smsGateway from '../assets/images/optimized/sms-gateway.webp'
import pos from '../assets/images/optimized/pos.webp'
import satoru from '../assets/images/optimized/satoru.webp'
import sentinels from '../assets/images/optimized/sentinels.webp'
import tabang from '../assets/images/optimized/tabang.webp'
import imsStart from '../assets/images/optimized/ims-start.webp'
import imsDashboard from '../assets/images/optimized/ims-dashboard.webp'
import imsInventory from '../assets/images/optimized/ims-inventory.webp'
import imsReports from '../assets/images/optimized/ims-reports.webp'

/**
 * All projects. Titles, descriptions, tags and links are carried over from the previous site.
 * imageKind: 'screenshot' fills the frame (imageFit: 'contain' shows a wide screenshot whole); 'logo' is centred on a neutral tile; null shows a text-only tile.
 * link: null means there is no public link to show.
 * services: which core services (see services.js) the project demonstrates, derived from its tags.
 * caseStudy: optional. A project with one gets its own page at /work/<slug> (see ProjectDetailPage). Every line in it
 * must come from what the screenshots show; no clients, results, figures or technology are claimed.
 */
export const PROJECTS = [
  {
    slug: 'inventory-management-system',
    title: 'Inventory Management System',
    summary: 'Stock levels, stock value and Excel reports in one place.',
    description:
      'An inventory management system that keeps item records, stock levels and stock value in one place, highlights items that are running low or out of stock, and exports reports to Excel.',
    tags: ['Inventory management', 'Stock tracking', 'Reporting'],
    image: imsInventory,
    imageKind: 'screenshot',
    imageFit: 'contain',
    imageAlt:
      'Inventory list showing each item’s name, SKU, quantity, stock status, price, total value and last update, with search, stock filters and export',
    link: null,
    linkLabel: 'No public link',
    featured: false,
    services: ['inventory', 'software', 'web'],
    caseStudy: {
      metaTitle: 'Inventory management system: case study — Elpisoft',
      metaDescription:
        'An inventory management system built by Elpisoft: item records, low-stock views, stock valuation and Excel reports. See the screens and what it can do.',
      intro:
        'An inventory management system we built to keep item records, stock levels and stock value in one place, with clear views of what is running low and reports that export to Excel.',
      problem:
        'When stock is tracked in spreadsheets or on paper, it is hard to see what is on hand, what is running low and what it is all worth, and preparing reports for audits or reordering takes time.',
      built:
        'This system puts the answers on screen: every item with its SKU, quantity, price and stock value, a dashboard that summarises stock health, and reports that can be downloaded as an Excel file.',
      // Only features visible in the screenshots. The dashboard's two chart panels are empty in the current capture,
      // so charts are not claimed; add them here once a capture shows them working.
      capabilityGroups: [
        {
          title: 'Getting started',
          items: ['A start screen where a business enters its name to begin'],
        },
        {
          title: 'Dashboard overview',
          items: [
            'Total items and total units in stock',
            'Count of low-stock items (fewer than 5 units)',
            'Total inventory value at current unit prices',
            'Shortcuts to add an item and export to Excel',
          ],
        },
        {
          title: 'Item records',
          items: [
            'Name, SKU, quantity, unit price and total value for every item',
            'Last-updated time on each record',
            'Add, edit and delete actions',
          ],
        },
        {
          title: 'Finding stock',
          items: [
            'Search by item name or SKU',
            'Filters for all, low-stock, out-of-stock and in-stock items, with a count',
            'Sortable columns',
          ],
        },
        {
          title: 'Stock health',
          items: [
            'A status badge on every item',
            'Healthy stock and attention items counted separately',
            'Zero-stock and low-stock items called out',
          ],
        },
        {
          title: 'Reports and export',
          items: [
            'Total stock valuation and the number of registered SKUs',
            'The five highest-value items in stock',
            'Excel (.xlsx) report download',
          ],
        },
      ],
      value: [
        'See what you have, and what it is worth, at a glance.',
        'Spot low and out-of-stock items before they become a problem.',
        'Hand over Excel reports for audits, accounting and reordering.',
      ],
      industrySlugs: ['retail'],
      // The portfolio card and the case-study hero use `image` above. Replace these files (and these entries) when the
      // screenshots are recaptured; see docs/inventory-case-study.md.
      gallery: [
        {
          src: imsInventory,
          width: 1600,
          height: 857,
          alt: 'Inventory list showing each item’s name, SKU, quantity, stock status, price, total value and last update, with search, stock filters and export',
          caption: 'Inventory: search, filter and sort every item, with its stock status and value.',
        },
        {
          src: imsStart,
          width: 1600,
          height: 853,
          alt: 'Start screen with the headline “Inventory management for your business” and a business name field',
          caption: 'Start screen: a business enters its name to begin.',
        },
        {
          src: imsDashboard,
          width: 1600,
          height: 856,
          alt: 'Inventory dashboard with total items, low-stock count and total inventory value, plus stock distribution and top stock level panels',
          caption: 'Dashboard: total items, low-stock count and total inventory value.',
        },
        {
          src: imsReports,
          width: 1600,
          height: 855,
          alt: 'Stock valuation report with total valuation, registered SKUs, healthy and attention counts and the five highest-value items, with an Excel download button',
          caption: 'Reports: stock valuation, item counts and an Excel download.',
        },
      ],
    },
  },
  {
    slug: 'recivo',
    title: 'Recivo',
    summary: 'Receipt generation for online sellers and business owners.',
    description:
      'A receipt generation platform designed for online sellers and business owners. Create, manage and share professional receipts in seconds, without manual paperwork.',
    tags: ['Receipt generation', 'E-commerce tool', 'Business automation'],
    image: recivo,
    imageKind: 'screenshot',
    imageAlt: 'Recivo receipt generator showing business details, items and a payment summary',
    link: 'https://recivo.elpisoft.com/',
    linkLabel: 'Visit site',
    featured: true,
    services: ['web', 'automation'],
  },
  {
    slug: 'avendro',
    title: 'Avendro',
    summary: 'A lending management system for lending institutions.',
    description:
      'A lending management system designed to streamline loan operations and financial management for lending institutions.',
    tags: ['Lending management', 'Loan operations', 'Financial systems'],
    image: avendro,
    imageKind: 'screenshot',
    imageAlt: 'Avendro marketplace home page connecting borrowers with lenders',
    link: 'https://avendrobcd.onrender.com/',
    linkLabel: 'Visit site',
    featured: true,
    services: ['software', 'web'],
  },
  {
    slug: 'epuno',
    title: 'ePuno',
    summary: 'A personal budget tracker for financial empowerment.',
    description:
      'More than a personal budget tracker: ePuno is the first entry in a conceptual, collaborative directory of open-source financial empowerment tools.',
    tags: ['FinTech', 'Budget tracking', 'Financial empowerment'],
    image: epuno,
    imageKind: 'screenshot',
    imageAlt: 'ePuno dashboard showing overall balance, monthly balance, income and expenses',
    link: 'https://epuno.elpisoft.com/',
    linkLabel: 'Visit site',
    featured: true,
    services: ['web'],
  },
  {
    slug: 'incognito',
    title: 'Incognito',
    summary: 'Anonymous messages through private, shareable links.',
    description:
      'A web application for sending and receiving anonymous messages through unique, shareable links. Designed for constructive feedback, honest suggestions and safe civic participation.',
    tags: ['Anonymous messaging', 'Feedback platform', 'Civic engagement'],
    image: incognito,
    imageKind: 'screenshot',
    imageAlt: 'Incognito home page with the headline "Receive anonymous messages safely"',
    link: 'https://incognito.elpisoft.com/',
    linkLabel: 'Visit site',
    featured: true,
    services: ['web'],
  },
  {
    slug: 'sms-gateway',
    title: 'SMS Gateway',
    summary: 'An Android app that turns a phone into an SMS gateway.',
    description:
      'An Android app (.APK) that turns a smartphone into an automated SMS gateway, using existing SIM promos and cellular allowances for cost-effective business messaging.',
    tags: ['Mobile application', 'SMS automation', 'Business communication'],
    image: smsGateway,
    imageKind: 'screenshot',
    imageAlt: 'SMS Gateway conversation and message-claim screens',
    link: null,
    linkLabel: 'Android app (.APK)',
    featured: false,
    services: ['mobile', 'automation'],
  },
  {
    slug: 'satoru',
    title: 'Satoru',
    summary: 'Summaries and key information from uploaded documents.',
    description:
      'A web application that summarises and extracts key information from uploaded documents, giving users quick, distilled insights.',
    tags: ['Document intelligence', 'Smart summarisation', 'Knowledge management'],
    image: satoru,
    imageKind: 'logo',
    imageAlt: 'Satoru logo',
    link: 'https://satoru-chi.vercel.app/',
    linkLabel: 'Visit site',
    featured: false,
    services: ['web', 'automation', 'ai'],
  },
  {
    slug: 'point-of-sale',
    title: 'Point of Sale System',
    summary: 'Inventory, sales and customer management for retail.',
    description:
      'A point of sale system for retail businesses, with inventory management, sales tracking and customer management.',
    tags: ['Retail POS', 'Inventory management', 'Sales tracking'],
    image: pos,
    imageKind: 'screenshot',
    imageAlt: 'Point of sale storefront interface',
    link: null,
    linkLabel: 'No public link',
    featured: false,
    services: ['software', 'web', 'inventory'],
  },
  {
    slug: 'sentinels',
    title: 'Sentinels',
    summary: 'A multiplayer mobile game for cybersecurity education.',
    description:
      'A mobile game with multiplayer play, leaderboards and in-app purchases, focused on cybersecurity education.',
    tags: ['Cybersecurity education', 'Gamified learning', 'Mobile game'],
    image: sentinels,
    imageKind: 'logo',
    imageAlt: 'Sentinels logo',
    link: 'https://drive.google.com/file/d/1dB0u3wjIOWzKIGJtJPzDSgzceLOgFC2-/view',
    linkLabel: 'Download (Google Drive)',
    featured: false,
    services: ['mobile'],
  },
  {
    slug: 'student-management',
    title: 'Student Management System',
    summary: 'A dashboard for educational institutions.',
    description:
      'A dashboard for educational institutions with data visualisation, analytics and reporting tools for student management.',
    tags: ['Academic analytics', 'Institutional dashboard', 'Student management'],
    image: null,
    imageKind: null,
    imageAlt: '',
    link: 'https://sentinelsadmin.onrender.com/',
    linkLabel: 'Visit site',
    featured: false,
    services: ['software', 'web'],
  },
  {
    slug: 'tabang-negros',
    title: 'Tabang Negros',
    summary: 'Real-time emergency help requests for Negros Island.',
    description:
      'A real-time emergency help request system for Negros Island, Philippines. This full-stack web application lets people send emergency requests with their exact location to responders.',
    tags: ['Emergency response', 'Real-time dispatch', 'Public safety'],
    image: tabang,
    imageKind: 'logo',
    imageAlt: 'Tabang Negros logo over a satellite view of Negros Island',
    link: 'https://tabangnegros-installation.vercel.app/',
    linkLabel: 'Visit site',
    featured: false,
    services: ['web', 'software'],
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)
export const CASE_STUDIES = PROJECTS.filter((p) => p.caseStudy)
export const projectPath = (project) => `/work/${project.slug}`
export const projectsForService = (serviceId) => PROJECTS.filter((p) => p.services.includes(serviceId))
