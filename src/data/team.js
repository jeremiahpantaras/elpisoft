import jeremiah from '../assets/images/optimized/jeremiah.webp'
import wenard from '../assets/images/optimized/wenard.webp'
import john from '../assets/images/optimized/john.webp'
import edsel from '../assets/images/optimized/edsel.webp'

/**
 * The team, in display order. `image: null` shows a neutral initials tile (see TeamPortrait on the About page) until an
 * approved portrait is supplied: put the square headshot in src/assets/images/teamProfile/, optimise it to
 * src/assets/images/optimized/<id>.webp, import it here and set `image`. Never use a photo of anyone else.
 * `portfolio: null` shows no link; add one only when the member has a real page to link to.
 */
export const TEAM = [
  {
    id: 'jeremiah',
    initials: 'JP',
    name: 'Jeremiah Pantaras',
    role: 'Founder and CEO',
    details: ['AI engineer', 'Senior software engineer'],
    image: jeremiah,
    portfolio: 'https://jeremiah.elpisoft.com/',
  },
  {
    id: 'wenard',
    initials: 'WRB',
    name: 'Wenard Roy Barrera',
    role: 'Co-founder',
    details: ['UI/UX designer', 'Front-end and full-stack web developer', 'Mobile developer'],
    image: wenard,
    portfolio: 'https://kr1stik.elpisoft.com/',
  },
  {
    id: 'john-michael',
    initials: 'JMP',
    name: 'John Michael Pantaras',
    role: 'Co-founder',
    details: ['Strategist and advisor', 'Strategic planning', 'Long-term goals and company vision'],
    image: john,
    portfolio: null,
  },
  {
    id: 'edsel',
    initials: 'EJR',
    name: 'Edsel John Robles',
    role: 'Hardware–software integration technologist',
    details: ['Embedded systems', 'IoT development', 'Automation'],
    image: edsel,
    portfolio: null,
  },
]
