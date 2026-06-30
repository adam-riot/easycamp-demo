import { list, put } from '@vercel/blob';

// Default content — returned when nothing has been saved yet, and used as the
// schema the admin panel edits. Keep in sync with DEFAULT_CONTENT in index.html.
export const DEFAULT_CONTENT = {
  seo: {
    title: 'EasyCamp Rental — Sewa Gear Camping & Outdoor Event di Dengkil, Selangor',
    description: 'Sewa gear camping berkualiti, pakej outdoor event & servis cuci khemah di Dengkil, Selangor. Self pick-up atau delivery. Booking mudah via WhatsApp.',
    keywords: 'sewa khemah, sewa camping, camping gear rental dengkil, outdoor event rental selangor, sewa khemah dengkil, tent cleaning service, naturehike village 6'
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
    text: '🎉 PROMO: Pakej Naturehike Village 6 dari RM180 (2D1N). WhatsApp kami untuk tempah!'
  },
  header: {
    bgImage: 'imej/header.jpg',
    tagline: 'Your trusted camping gear & outdoor event partner.',
    sub: 'Self pick-up di Dengkil atau delivery ke lokasi anda. Booking mudah, gear bersih & siap pakai.',
    badges: ['Clean', 'Reliable', 'Ready to Use'],
    btnPrimary: 'Book Now',
    btnSecondary: 'Browse Gear'
  },
  services: [
    { image: '', title: 'Camping Gear Rental', desc: 'Sewa gear camping berkualiti untuk adventure anda yang seterusnya.', ctaLabel: 'View Catalog', ctaAction: '#produk' },
    { image: '', title: 'Outdoor Event Rental', desc: 'Peralatan untuk event semua saiz — gathering, birthday, team building.', ctaLabel: 'See More', ctaAction: '#pakej' },
    { image: '', title: 'Tent Cleaning Service', desc: 'Servis cuci profesional supaya gear anda sentiasa segar & bersih.', ctaLabel: 'Learn More', ctaAction: 'wa' }
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
    { icon: '🔍', title: 'Choose Your Gear', text: 'Browse koleksi kami & pilih item yang anda perlukan.' },
    { icon: '💬', title: 'Make a Booking', text: 'Hubungi kami via WhatsApp untuk confirm tempahan.' },
    { icon: '📦', title: 'Pick Up or Delivery', text: 'Self pick-up di Dengkil atau kami hantar ke anda.' },
    { icon: '⛺', title: 'Enjoy Your Adventure', text: 'Camp dengan yakin guna gear bersih & berkualiti.' }
  ],
  products: [
    { name: 'Payung Camp Cottage L', spec: 'Khemah Cottage', price: '120', photo: 'imej/cottage-l.png', badge: 'New' },
    { name: 'Family Tent', spec: '5-6 Pax', price: '70', photo: '', badge: 'Best Seller' },
    { name: 'Tarp & Shelter', spec: 'Pelbagai Saiz', price: '30', photo: '', badge: '' },
    { name: 'Camping Chair', spec: 'High Back', price: '10', photo: '', badge: '' },
    { name: 'Camping Table', spec: 'Roll Table', price: '20', photo: '', badge: '' },
    { name: 'Sleeping Bag', spec: '3 Season', price: '15', photo: '', badge: '' },
    { name: 'Cooler Box', spec: '25L', price: '20', photo: '', badge: '' },
    { name: 'Cooking Set', spec: 'Lengkap', price: '15', photo: '', badge: '' }
  ],
  featuredPackage: {
    enabled: true,
    tag: '⭐ Pakej Popular',
    eyebrow: 'Sewa Khemah Camping',
    title1: 'Naturehike',
    title2: 'Village 6',
    photo: 'imej/village6.png',
    items: [
      'Naturehike Village 6', 'Kermit Chairs x2', 'Egg Roll Table 120cm', 'Opolar Fold Fan',
      'Retro Lanterns x2', 'Premium Stove', 'Storage Box', 'Mobi Garden Air Mattress'
    ],
    tiers: [
      { dur: '2D1N', amt: 'RM180' },
      { dur: '3D2N', amt: 'RM280' }
    ]
  },
  packages: [
    { name: 'Basic', desc: 'Essentials untuk trip solo/couple', price: 'Dari RM 120', photo: '' },
    { name: 'Family', desc: 'Comfort untuk seluruh keluarga', price: 'Dari RM 200', photo: '' },
    { name: 'Group', desc: 'Perfect untuk gathering & group besar', price: 'Dari RM 350', photo: '' },
    { name: 'Event', desc: 'Kami setup, anda enjoy', price: 'Custom Quote', photo: '' }
  ],
  testimonials: [
    { text: 'Gear semua bersih, delivery on time. Sangat puas hati!', who: 'Hafizah, Shah Alam' },
    { text: 'Pakej picnic cantik gila, memang berbaloi!', who: 'Azrul, Subang' },
    { text: 'Dah 3 kali sewa, memang tak kecewa. Seller responsive!', who: 'Suriani, KL' }
  ],
  gallery: [
    { photo: 'imej/village6.png' }, { photo: '' }, { photo: 'imej/cottage-l.png' },
    { photo: '' }, { photo: '' }, { photo: '' }
  ],
  footer: {
    tagline: 'Your trusted camping gear rental & outdoor event partner di Dengkil, Selangor.',
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
