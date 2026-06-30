import { list, put } from '@vercel/blob';

// Default content — returned when nothing has been saved yet, and used as the
// schema the admin panel edits. Keep in sync with DEFAULT_CONTENT in index.html.
export const DEFAULT_CONTENT = {
  seo: {
    title: 'EasyCamp Rental — Sewa Gear Camping & Picnic Berkualiti di Klang Valley',
    description: 'Sewa gear camping & picnic berkualiti untuk trip, picnic, dan event anda di Klang Valley. Pickup atau delivery available. WhatsApp untuk tempah.',
    keywords: 'sewa khemah, sewa camping, sewa gear camping, camping rental klang valley, sewa khemah selangor, naturehike village 6, sewa picnic set'
  },
  brand: {
    name: 'EASY CAMP',
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
  hero: {
    badge: 'Camping & Picnic Gear Rental',
    title1: 'Campers',
    title2: 'At Your',
    title3: 'Service.',
    lead: 'Sewa gear camping & picnic berkualiti untuk trip, picnic, dan event anda. Pickup atau delivery available.'
  },
  stats: [
    { num: '8000', suffix: '+', label: '⛺ Campers' },
    { num: '170', suffix: '+', label: '🏕️ Produk' },
    { num: '1', suffix: ' Jam', label: '⚡ Respons' },
    { num: '', suffix: '✓', label: 'Gear Bersih' }
  ],
  products: [
    { name: 'Payung Camp Cottage L', spec: 'Khemah Cottage', price: '120', photo: 'imej/cottage-l.png', badge: 'New' },
    { name: 'Family Tent', spec: '5-6 Pax', price: '70', gradient: 'p1', badge: 'Best Seller' },
    { name: 'Tarp & Shelter', spec: 'Pelbagai Saiz', price: '30', gradient: 'p2', badge: '' },
    { name: 'Camping Chair', spec: 'High Back', price: '10', gradient: 'p3', badge: '' },
    { name: 'Camping Table', spec: 'Roll Table', price: '20', gradient: 'p4', badge: '' },
    { name: 'Sleeping Bag', spec: '3 Season', price: '15', gradient: 'p5', badge: '' },
    { name: 'Cooler Box', spec: '25L', price: '20', gradient: 'p6', badge: '' },
    { name: 'Cooking Set', spec: 'Lengkap', price: '15', gradient: 'p7', badge: '' }
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
    { name: 'Basic', desc: 'Essentials untuk trip solo/couple', price: 'Dari RM 120', gradient: 'k1' },
    { name: 'Family', desc: 'Comfort untuk seluruh keluarga', price: 'Dari RM 200', gradient: 'k2' },
    { name: 'Group', desc: 'Perfect untuk gathering & group besar', price: 'Dari RM 350', gradient: 'k3' },
    { name: 'Event', desc: 'Kami setup, anda enjoy', price: 'Custom Quote', gradient: 'k4' }
  ],
  why: [
    { icon: '🧼', title: 'Gear Bersih', text: 'Semua gear dicuci & diperiksa sebelum setiap sewaan.' },
    { icon: '💰', title: 'Harga Berpatutan', text: 'Jimat berbanding beli gear sendiri. Kualiti premium, harga mesra.' },
    { icon: '🚚', title: 'Pickup & Delivery', text: 'Self pickup di Klang Valley atau kami hantar ke anda.' },
    { icon: '🎉', title: 'Untuk Semua Majlis', text: 'Camping, picnic, birthday, team building & outdoor event.' }
  ],
  gallery: [
    { photo: 'imej/village6.png' },
    { gradient: 'g2' },
    { photo: 'imej/cottage-l.png' },
    { gradient: 'g4' },
    { gradient: 'g5' },
    { gradient: 'g6' }
  ],
  testimonials: [
    { text: 'Gear semua bersih, delivery on time. Sangat puas hati!', who: 'Hafizah, Shah Alam' },
    { text: 'Pakej picnic cantik gila, memang berbaloi!', who: 'Azrul, Subang' },
    { text: 'Dah 3 kali sewa, memang tak kecewa. Seller responsive!', who: 'Suriani, KL' }
  ],
  footer: {
    tagline: 'Sewa gear camping & picnic berkualiti untuk trip, picnic, dan event anda di Klang Valley.',
    pickup: 'Klang Valley',
    hours: '10am – 8pm'
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
