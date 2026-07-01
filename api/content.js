import { list, put } from '@vercel/blob';

// Default content — returned when nothing has been saved yet, and used as the
// schema the admin panel edits. Keep in sync with DEFAULT_CONTENT in index.html.
export const DEFAULT_CONTENT = {
  seo: {
    title: 'EasyCamp Rental — Camping Gear & Outdoor Event Rental in Dengkil, Selangor',
    description: 'Quality camping gear rental, outdoor event packages & tent cleaning service in Dengkil, Selangor. Self pick-up or delivery. Easy booking via WhatsApp.',
    keywords: 'camping gear rental, tent rental, camping gear rental dengkil, outdoor event rental selangor, tent rental dengkil, tent cleaning service, naturehike village 6'
  },
  brand: {
    name: 'EasyCamp',
    logo: 'imej/logo.png',
    whatsapp: '60182922958',
    phoneDisplay: '018-292 2958',
    instagram: 'https://instagram.com/easycamp.co',
    instagramHandle: '@easycamp.co',
    facebook: '#',
    tiktok: '#'
  },
  promo: {
    enabled: true,
    text: '🎉 PROMO: Naturehike Village 6 Package from RM180 (2D1N). WhatsApp us to book!'
  },
  header: {
    bgImage: 'imej/header.jpg',
    tagline: 'Camp Easier, Rent Better.',
    sub: 'Self pick-up in Dengkil or delivery to your location. Easy booking, clean & ready-to-use gear.',
    badges: ['Clean', 'Affordable', 'Complete'],
    btnPrimary: 'Book Now',
    btnSecondary: 'Browse Gear'
  },
  services: [
    { image: 'imej/svc-camping.jpg', title: 'Camping Gear Rental', desc: 'Rent quality camping equipment for your next adventure.', ctaLabel: 'View Packages', ctaAction: '#pakej' },
    { image: 'imej/svc-event.jpg', title: 'Outdoor Event Rental', desc: 'Equipment rental for events of all sizes. We’ve got you covered.', ctaLabel: 'See More', ctaAction: '#events' },
    { image: 'imej/svc-cleaning.jpg', title: 'Tent Cleaning Service', desc: 'Professional cleaning to keep your gear fresh, clean and ready.', ctaLabel: 'Learn More', ctaAction: 'wa' }
  ],
  whyChoose: [
    { icon: '✨', text: 'Clean & Well-Maintained' },
    { icon: '🏷️', text: 'Affordable Prices' },
    { icon: '🙌', text: 'Beginner Friendly' },
    { icon: '💬', text: 'Easy Booking via WhatsApp' },
    { icon: '📍', text: 'Self Pick-up in Dengkil' },
    { icon: '🚚', text: 'Delivery Available' }
  ],
  howItWorks: [
    { icon: '🔍', title: 'Choose Your Gear', text: 'Browse our collection and select the items you need.' },
    { icon: '💬', title: 'Make a Booking', text: 'Contact us via WhatsApp to confirm your reservation.' },
    { icon: '📦', title: 'Pick Up or Delivery', text: 'Self pick-up in Dengkil or we deliver to you.' },
    { icon: '⛺', title: 'Enjoy Your Adventure', text: 'Camp with confidence using clean, quality gear.' }
  ],
  packages: [
    { image: 'imej/pkg-ango-air.jpg', name: 'Naturehike Ango Air' },
    { image: 'imej/pkg-ansaan-pro.jpg', name: 'Vidalido An Saan Pro (Khakis)' },
    { image: 'imej/pkg-village13.jpg', name: 'Naturehike Village 13' },
    { image: 'imej/pkg-poonsaan-m-khaki.jpg', name: 'Vidalido Poon Saan M (Khakis)' },
    { image: 'imej/pkg-poonsaan-l-khaki.jpg', name: 'Vidalido Poon Saan L (Khakis)' },
    { image: 'imej/pkg-poonsaan-l-black.jpg', name: 'Vidalido Poon Saan L (Black)' },
    { image: 'imej/pkg-poonsaan-m-black.jpg', name: 'Vidalido Poon Saan M (Black)' }
  ],
  events: [],
  testimonials: [
    { text: 'Everything was clean and delivery was on time. Really satisfied!', who: 'Hafizah, Shah Alam' },
    { text: 'The picnic package looked amazing — totally worth it!', who: 'Azrul, Subang' },
    { text: 'Rented 3 times already, never disappointed. Super responsive seller!', who: 'Suriani, KL' }
  ],
  footer: {
    tagline: 'Your trusted camping gear rental & outdoor event partner in Dengkil, Selangor.',
    pickup: 'Dengkil, Selangor',
    hours: '10am – 8pm (Daily)'
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: 'content.json', limit: 1 });
      if (blobs.length) {
        const r = await fetch(blobs[0].url, { cache: 'no-store' });
        const data = await r.json();
        res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=60');
        return res.status(200).json(data);
      }
    } catch (e) {
      // fall through to default
    }
    res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=60');
    return res.status(200).json(DEFAULT_CONTENT);
  }

  if (req.method === 'POST') {
    const pw = req.headers['x-admin-password'];
    if (!process.env.ADMIN_PASSWORD || pw !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Kata laluan salah.' });
    }
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ error: 'Data tidak sah.' });
      }
      await put('content.json', JSON.stringify(body, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
