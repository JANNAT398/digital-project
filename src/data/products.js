/**
 * FunGearBD — demo catalogue.
 *
 * All product data is centralised here so it is easy to replace with real data
 * from an API later. Prices are stored in BDT (Bangladeshi Taka).
 *
 * Product images are generated on demand from the image service using a
 * descriptive prompt — swap `image`/`images` with real CDN URLs in production.
 */

const img = (prompt, size = 'square') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${size}`

const photo = (subject) =>
  img(`${subject}, professional e-commerce product photography, pure white seamless background, soft studio lighting, sharp focus, high detail, centered`)

/* -------------------------------------------------------------------------- */
/*  Categories                                                                */
/* -------------------------------------------------------------------------- */

export const categories = [
  { name: 'Audio & Headphones', slug: 'audio-headphones', image: photo('premium black wireless over-ear headphones') },
  { name: 'Earbuds & TWS', slug: 'earbuds-tws', image: photo('white true wireless earbuds charging case') },
  { name: 'Smart Watches', slug: 'smart-watches', image: photo('modern smartwatch with fitness display') },
  { name: 'Gaming Gear', slug: 'gaming-gear', image: photo('rgb gaming mouse and mechanical keyboard') },
  { name: 'Computer Accessories', slug: 'computer-accessories', image: photo('wireless computer keyboard and mouse combo') },
  { name: 'Mobile Accessories', slug: 'mobile-accessories', image: photo('smartphone accessories phone holder and cables') },
  { name: 'Power & Charging', slug: 'power-charging', image: photo('portable power bank and fast charger') },
  { name: 'Smart Home', slug: 'smart-home', image: photo('smart home gadgets security camera and smart speaker') },
]

export const categorySlugs = categories.map((c) => c.slug)

export const popularTags = [
  'Wireless', 'Bluetooth 5.3', 'Fast Charging', 'Noise Cancelling', 'RGB',
  'Waterproof', 'Gaming', 'Portable', 'Smart', 'USB-C', 'Premium', 'Budget',
  'Best Seller', 'New Arrival',
]

/* -------------------------------------------------------------------------- */
/*  Products                                                                  */
/* -------------------------------------------------------------------------- */

const rawProducts = [
  {
    id: 1,
    name: 'Pulse Pro Wireless Over-Ear Headphones',
    brand: 'FunGear',
    price: 4890,
    oldPrice: 6990,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 24,
    sold: 940,
    category: 'audio-headphones',
    tags: ['Wireless', 'Bluetooth 5.3', 'Noise Cancelling', 'Best Seller'],
    highlights: ['Active Noise Cancelling', '40h battery life', 'Bluetooth 5.3 multipoint', 'Foldable design'],
    description:
      'Immersive over-ear sound with hybrid active noise cancelling, plush memory-foam ear cushions and a 40-hour battery. Perfect for travel, work and long listening sessions.',
    specs: {
      Driver: '40mm dynamic',
      Bluetooth: '5.3 (multipoint)',
      'Battery Life': 'Up to 40 hours',
      Weight: '268 g',
      Charging: 'USB-C, 10 min = 5h',
      Warranty: '1 year',
    },
  },
  {
    id: 2,
    name: 'AirDots Buds 3 True Wireless Earbuds',
    brand: 'FunGear',
    price: 2290,
    oldPrice: 3290,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 60,
    sold: 1420,
    category: 'earbuds-tws',
    tags: ['Wireless', 'Bluetooth 5.3', 'Fast Charging', 'Best Seller'],
    highlights: ['ENC clear calls', '28h with charging case', 'Touch controls', 'IPX5 water resistant'],
    description:
      'Compact true-wireless earbuds with punchy bass, environmental noise cancelling for calls and a pocket-size charging case delivering up to 28 hours of playtime.',
    specs: {
      Driver: '13mm composite',
      Bluetooth: '5.3',
      'Battery Life': '7h + 21h case',
      'Water Resistance': 'IPX5',
      Charging: 'USB-C',
      Warranty: '1 year',
    },
  },
  {
    id: 3,
    name: 'Chrono S6 AMOLED Smart Watch',
    brand: 'FunGear',
    price: 6490,
    oldPrice: 8990,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 18,
    sold: 760,
    category: 'smart-watches',
    tags: ['Smart', 'Waterproof', 'Premium', 'New Arrival'],
    highlights: ['1.43" AMOLED display', 'SpO2 & heart rate', '120+ sport modes', 'Bluetooth calling'],
    description:
      'A sleek metal-frame smartwatch with an always-on AMOLED display, blood-oxygen monitoring and built-in Bluetooth calling for everyday health and productivity.',
    specs: {
      Display: '1.43" AMOLED',
      'Battery Life': 'Up to 10 days',
      Sensors: 'Heart rate, SpO2',
      'Water Rating': 'IP68',
      'Calling': 'Bluetooth calling',
      Warranty: '1 year',
    },
  },
  {
    id: 4,
    name: 'Raptor V3 RGB Gaming Mouse',
    brand: 'Raptor',
    price: 1790,
    oldPrice: 2490,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 45,
    sold: 1180,
    category: 'gaming-gear',
    tags: ['Gaming', 'RGB', 'Best Seller'],
    highlights: ['12,000 DPI sensor', '8 programmable buttons', 'RGB lighting', 'Braided cable'],
    description:
      'Competitive-grade gaming mouse with a high-precision 12,000 DPI sensor, durable switches and customisable RGB lighting for a fully personalised setup.',
    specs: {
      Sensor: '12,000 DPI optical',
      Buttons: '8 programmable',
      Connection: 'USB wired',
      Lighting: 'RGB',
      Weight: '85 g',
      Warranty: '1 year',
    },
  },
  {
    id: 5,
    name: 'Tactile TKL Mechanical Keyboard',
    brand: 'Raptor',
    price: 4290,
    oldPrice: null,
    rating: 5,
    ratingCount: 5,
    sale: false,
    inStock: true,
    stock: 30,
    sold: 520,
    category: 'gaming-gear',
    tags: ['Gaming', 'RGB'],
    highlights: ['Hot-swappable switches', 'Tenkeyless layout', 'Per-key RGB', 'Detachable USB-C'],
    description:
      'A tenkeyless mechanical keyboard with hot-swappable switches and per-key RGB — built for gamers and typists who want a clean, compact desk setup.',
    specs: {
      Layout: 'TKL (87 keys)',
      Switches: 'Hot-swappable',
      Lighting: 'Per-key RGB',
      Connection: 'USB-C detachable',
      'Key Caps': 'Double-shot PBT',
      Warranty: '1 year',
    },
  },
  {
    id: 6,
    name: 'Turbo 20,000mAh Fast Power Bank',
    brand: 'Voltix',
    price: 1890,
    oldPrice: 2490,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 80,
    sold: 2100,
    category: 'power-charging',
    tags: ['Fast Charging', 'Portable', 'USB-C', 'Best Seller'],
    highlights: ['22.5W fast charge', '20,000mAh capacity', 'Dual USB + USB-C', 'Digital display'],
    description:
      'Charge your phone up to four times on a single fill. 22.5W fast charging, USB-C in/out and a clear digital battery readout.',
    specs: {
      Capacity: '20,000mAh',
      Output: '22.5W max',
      Ports: '2× USB-A, 1× USB-C',
      Display: 'Digital percentage',
      Weight: '430 g',
      Warranty: '6 months',
    },
  },
  {
    id: 7,
    name: 'Boom 30W Portable Bluetooth Speaker',
    brand: 'SoundArc',
    price: 2790,
    oldPrice: 3590,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 26,
    sold: 680,
    category: 'audio-headphones',
    tags: ['Wireless', 'Bluetooth 5.3', 'Waterproof', 'Portable'],
    highlights: ['30W stereo output', 'IPX7 waterproof', '16h playtime', 'TWS pairing'],
    description:
      'A rugged, waterproof Bluetooth speaker with deep 30W stereo sound, ideal for outdoor gatherings, picnics and poolside sessions.',
    specs: {
      Output: '2 × 15W',
      Bluetooth: '5.3',
      'Battery Life': 'Up to 16 hours',
      'Water Rating': 'IPX7',
      'TWS Pairing': 'Yes',
      Warranty: '1 year',
    },
  },
  {
    id: 8,
    name: 'Nano Bluetooth 5.3 USB Adapter',
    brand: 'LinkPro',
    price: 690,
    oldPrice: 990,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 120,
    sold: 1900,
    category: 'computer-accessories',
    tags: ['Wireless', 'Bluetooth 5.3', 'Budget', 'USB-C'],
    highlights: ['Bluetooth 5.3', 'Plug and play', 'Low latency', 'Compact body'],
    description:
      'Add reliable Bluetooth 5.3 to any laptop or desktop. Ultra-compact, plug-and-play with low-latency audio and stable connectivity.',
    specs: {
      Version: 'Bluetooth 5.3',
      Range: 'Up to 20 m',
      Interface: 'USB-A',
      Compatibility: 'Windows / macOS',
      Weight: '5 g',
      Warranty: '6 months',
    },
  },
  {
    id: 9,
    name: 'Vision 1080p Full HD Webcam',
    brand: 'ClearView',
    price: 2190,
    oldPrice: null,
    rating: 4,
    ratingCount: 4,
    sale: false,
    inStock: true,
    stock: 34,
    sold: 410,
    category: 'computer-accessories',
    tags: ['Smart', 'USB-C', 'Premium'],
    highlights: ['1080p 30fps', 'Built-in dual mic', 'Auto light correction', 'Privacy shutter'],
    description:
      'Look sharp on every call with a 1080p Full HD webcam, dual noise-reducing microphones and an integrated privacy shutter.',
    specs: {
      Resolution: '1080p @ 30fps',
      Microphone: 'Dual built-in',
      Interface: 'USB-A',
      'Field of View': '90°',
      Mount: 'Clip + tripod ready',
      Warranty: '1 year',
    },
  },
  {
    id: 10,
    name: 'MagSafe 15W Wireless Charger Pad',
    brand: 'Voltix',
    price: 1490,
    oldPrice: 1990,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 70,
    sold: 1350,
    category: 'power-charging',
    tags: ['Fast Charging', 'Wireless', 'USB-C'],
    highlights: ['15W magnetic charging', 'Non-slip surface', 'USB-C powered', 'Case-friendly'],
    description:
      'Snap-and-charge magnetic wireless pad delivering up to 15W of secure fast charging through the case.',
    specs: {
      Output: '15W max',
      'Input Port': 'USB-C',
      'Compatibility': 'MagSafe / Qi',
      'Cable Length': '1 m',
      Certification: 'CE / FCC',
      Warranty: '6 months',
    },
  },
  {
    id: 11,
    name: 'Stream 4K Action Camera',
    brand: 'ClearView',
    price: 8990,
    oldPrice: 11990,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 12,
    sold: 260,
    category: 'smart-home',
    tags: ['Waterproof', 'Premium', 'New Arrival'],
    highlights: ['4K @ 60fps', 'Waterproof housing', 'EIS stabilisation', '2" touch display'],
    description:
      'Capture every adventure in crisp 4K/60fps with electronic image stabilisation, wide-angle lens and a rugged waterproof housing.',
    specs: {
      Video: '4K @ 60fps',
      Stabilisation: 'Electronic (EIS)',
      Display: '2" touchscreen',
      'Water Rating': '30 m with housing',
      Battery: '1350mAh (90 min)',
      Warranty: '1 year',
    },
  },
  {
    id: 12,
    name: 'Guard 2K Smart Security Camera',
    brand: 'LinkPro',
    price: 3690,
    oldPrice: 4590,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 40,
    sold: 580,
    category: 'smart-home',
    tags: ['Smart', 'Waterproof', 'Wireless'],
    highlights: ['2K resolution', 'Motion alerts', 'Two-way audio', 'Night vision'],
    description:
      'Keep an eye on home from anywhere. 2K clarity, colour night vision, motion detection alerts and two-way audio in one app.',
    specs: {
      Resolution: '2K (2304×1296)',
      'Night Vision': 'Up to 10 m',
      Audio: 'Two-way',
      Storage: 'microSD + Cloud',
      'Power': 'DC 5V',
      Warranty: '1 year',
    },
  },
  {
    id: 13,
    name: 'Cube Mini Smart Speaker',
    brand: 'SoundArc',
    price: 1990,
    oldPrice: null,
    rating: 4,
    ratingCount: 4,
    sale: false,
    inStock: true,
    stock: 55,
    sold: 720,
    category: 'smart-home',
    tags: ['Smart', 'Wireless', 'Budget'],
    highlights: ['Voice assistant ready', '10W sound', 'Multi-room sync', 'Compact design'],
    description:
      'A palm-sized smart speaker with clear 10W audio and app-based voice assistance — a perfect first step into a smart home.',
    specs: {
      Output: '10W',
      'Wi-Fi': '2.4GHz',
      'Voice Assistant': 'App controlled',
      Dimensions: '100 × 100 × 96 mm',
      'Power': 'DC adapter',
      Warranty: '1 year',
    },
  },
  {
    id: 14,
    name: 'Grip Wireless Mouse (Silent Click)',
    brand: 'LinkPro',
    price: 990,
    oldPrice: 1390,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 100,
    sold: 2400,
    category: 'computer-accessories',
    tags: ['Wireless', 'Budget', 'Portable'],
    highlights: ['Silent click', '2.4GHz wireless', 'Auto sleep', 'Ergonomic grip'],
    description:
      'Quiet, comfortable and reliable — a wireless mouse with silent switches ideal for the office, home and study desk.',
    specs: {
      Sensor: '1600 DPI',
      Connection: '2.4GHz USB receiver',
      Battery: '1× AA (12 months)',
      Buttons: '4',
      Weight: '75 g',
      Warranty: '6 months',
    },
  },
  {
    id: 15,
    name: 'Flex Arm Mobile Holder Stand',
    brand: 'GripTech',
    price: 590,
    oldPrice: 890,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 150,
    sold: 3100,
    category: 'mobile-accessories',
    tags: ['Portable', 'Budget', 'Smart'],
    highlights: ['360° rotation', 'Aluminium arm', 'Cable management', 'Universal fit'],
    description:
      'A sturdy aluminium phone holder with 360° rotation and anti-slip pads — perfect for streaming, video calls and hands-free use.',
    specs: {
      Material: 'Aluminium alloy',
      Rotation: '360°',
      'Phone Size': 'Up to 6.9"',
      Mount: 'Desk clamp',
      Weight: '320 g',
      Warranty: '3 months',
    },
  },
  {
    id: 16,
    name: 'Braided USB-C Fast Cable 100W',
    brand: 'Voltix',
    price: 590,
    oldPrice: null,
    rating: 5,
    ratingCount: 5,
    sale: false,
    inStock: true,
    stock: 200,
    sold: 4200,
    category: 'mobile-accessories',
    tags: ['Fast Charging', 'USB-C', 'Best Seller'],
    highlights: ['100W power delivery', 'Nylon braided', '480Mbps data', '2m length'],
    description:
      'Charge laptops, tablets and phones at full speed with a 100W braided USB-C cable built to survive 20,000+ bends.',
    specs: {
      Power: '100W (20V/5A)',
      Data: '480 Mbps',
      Length: '2 m',
      'Cable Type': 'Nylon braided',
      Connectors: 'USB-C to USB-C',
      Warranty: '6 months',
    },
  },
  {
    id: 17,
    name: 'Studio Pro Condenser Microphone',
    brand: 'SoundArc',
    price: 3490,
    oldPrice: 4290,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 22,
    sold: 340,
    category: 'audio-headphones',
    tags: ['Premium', 'USB-C', 'Gaming'],
    highlights: ['Cardioid pickup', 'USB-C plug & play', 'Boom arm compatible', 'Mute button'],
    description:
      'Broadcast-quality USB-C microphone for streaming, podcasting and voice recording with a cardioid pattern that rejects background noise.',
    specs: {
      Polar: 'Cardioid',
      Sample: '48kHz / 16-bit',
      Interface: 'USB-C',
      'Mute Button': 'Yes',
      Mount: '3/8" thread',
      Warranty: '1 year',
    },
  },
  {
    id: 18,
    name: 'FitBand Lite Fitness Tracker',
    brand: 'FunGear',
    price: 1590,
    oldPrice: 2190,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 65,
    sold: 980,
    category: 'smart-watches',
    tags: ['Smart', 'Waterproof', 'Budget'],
    highlights: ['Colour AMOLED band', 'Heart rate & sleep', '14-day battery', '50m waterproof'],
    description:
      'A lightweight fitness band that tracks steps, heart rate, sleep and more with a bright colour display and two-week battery.',
    specs: {
      Display: '1.47" colour',
      'Battery Life': 'Up to 14 days',
      Sensors: 'Heart rate, SpO2',
      'Water Rating': '5 ATM',
      Compatibility: 'Android / iOS',
      Warranty: '1 year',
    },
  },
  {
    id: 19,
    name: 'Chrono Lite Smart Watch',
    brand: 'FunGear',
    price: 3290,
    oldPrice: null,
    rating: 4,
    ratingCount: 4,
    sale: false,
    inStock: true,
    stock: 48,
    sold: 610,
    category: 'smart-watches',
    tags: ['Smart', 'Budget', 'New Arrival'],
    highlights: ['1.85" HD display', '100+ watch faces', 'IP67', '7-day battery'],
    description:
      'A large-display smartwatch with 100+ watch faces, health tracking and reliable 7-day battery life at an entry price.',
    specs: {
      Display: '1.85" HD LCD',
      'Battery Life': 'Up to 7 days',
      Sensors: 'Heart rate',
      'Water Rating': 'IP67',
      'Watch Faces': '100+',
      Warranty: '1 year',
    },
  },
  {
    id: 20,
    name: 'Raptor Gamepad Wireless Controller',
    brand: 'Raptor',
    price: 2690,
    oldPrice: 3490,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 36,
    sold: 470,
    category: 'gaming-gear',
    tags: ['Gaming', 'Wireless', 'RGB'],
    highlights: ['Dual vibration', 'Bluetooth + 2.4G', '20h battery', 'Turbo function'],
    description:
      'A comfortable wireless gamepad with dual-motor vibration, turbo buttons and broad PC/Android compatibility.',
    specs: {
      Connection: 'Bluetooth + 2.4GHz',
      'Battery Life': 'Up to 20 hours',
      Vibration: 'Dual motor',
      Compatibility: 'PC / Android / Switch',
      Weight: '230 g',
      Warranty: '6 months',
    },
  },
  {
    id: 21,
    name: 'Cooling Laptop Stand (Adjustable)',
    brand: 'GripTech',
    price: 1290,
    oldPrice: 1790,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 58,
    sold: 830,
    category: 'computer-accessories',
    tags: ['Portable', 'Budget', 'USB-C'],
    highlights: ['6-level height', 'Aluminium body', 'Heat dissipation', 'Fits up to 17"'],
    description:
      'Raise your laptop to a healthy viewing angle while improving airflow with a slim aluminium stand.',
    specs: {
      Material: 'Aluminium alloy',
      Levels: '6 adjustable',
      'Laptop Size': 'Up to 17"',
      Load: '10 kg',
      Foldable: 'Yes',
      Warranty: '3 months',
    },
  },
  {
    id: 22,
    name: 'Boom Mini Clip Speaker',
    brand: 'SoundArc',
    price: 1290,
    oldPrice: null,
    rating: 4,
    ratingCount: 4,
    sale: false,
    inStock: true,
    stock: 90,
    sold: 1150,
    category: 'audio-headphones',
    tags: ['Wireless', 'Portable', 'Budget', 'Waterproof'],
    highlights: ['Clip-on design', 'IPX5 splash proof', '8h battery', 'Built-in mic'],
    description:
      'Clip this tiny speaker to your bag or belt for on-the-go sound with a built-in mic for calls.',
    specs: {
      Output: '5W',
      Bluetooth: '5.3',
      'Battery Life': 'Up to 8 hours',
      'Water Rating': 'IPX5',
      Weight: '120 g',
      Warranty: '6 months',
    },
  },
  {
    id: 23,
    name: 'Screen Protector Glass (Pack of 2)',
    brand: 'GripTech',
    price: 390,
    oldPrice: 690,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 300,
    sold: 5200,
    category: 'mobile-accessories',
    tags: ['Budget', 'Premium'],
    highlights: ['9H hardness', 'Oleophobic coating', 'Bubble-free install', 'Case friendly'],
    description:
      'Scratch-resistant 9H tempered glass with a silky oleophobic coating and an easy bubble-free installation kit.',
    specs: {
      Hardness: '9H',
      Coating: 'Oleophobic',
      Thickness: '0.33 mm',
      Pack: '2 pieces',
      Compatibility: 'Model specific',
      Warranty: 'Replacement',
    },
  },
  {
    id: 24,
    name: 'Nano Car Charger Dual USB',
    brand: 'Voltix',
    price: 790,
    oldPrice: 1090,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 130,
    sold: 2600,
    category: 'power-charging',
    tags: ['Fast Charging', 'USB-C', 'Budget'],
    highlights: ['30W dual output', 'Compact body', 'Over-current protection', 'LED indicator'],
    description:
      'Charge two devices at once on the road with a compact 30W car charger featuring full safety protection.',
    specs: {
      Output: '30W total',
      Ports: '1× USB-C, 1× USB-A',
      Input: '12–24V DC',
      Protection: 'Over-current / short',
      Weight: '35 g',
      Warranty: '6 months',
    },
  },
  {
    id: 25,
    name: 'Smart Wi-Fi Plug (16A)',
    brand: 'LinkPro',
    price: 890,
    oldPrice: 1290,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 110,
    sold: 1400,
    category: 'smart-home',
    tags: ['Smart', 'Budget', 'Wireless'],
    highlights: ['App & voice control', 'Timer schedules', '16A load', 'Energy monitoring'],
    description:
      'Turn any appliance smart. Control devices remotely, set schedules and monitor power usage straight from your phone.',
    specs: {
      'Max Load': '16A / 3500W',
      'Wi-Fi': '2.4GHz',
      Control: 'App / Voice',
      Timer: 'Yes',
      Material: 'Flame-retardant PC',
      Warranty: '1 year',
    },
  },
  {
    id: 26,
    name: 'Ergo Silent Wireless Keyboard',
    brand: 'LinkPro',
    price: 1790,
    oldPrice: null,
    rating: 4,
    ratingCount: 4,
    sale: false,
    inStock: false,
    stock: 0,
    sold: 460,
    category: 'computer-accessories',
    tags: ['Wireless', 'Bluetooth 5.3'],
    highlights: ['Silent scissor keys', 'Dual Bluetooth + 2.4G', 'Multi-device', 'Slim profile'],
    description:
      'A quiet, slim wireless keyboard with multi-device switching across Bluetooth and 2.4GHz for a tidy workspace.',
    specs: {
      Layout: 'Full size',
      Connection: 'Bluetooth + 2.4G',
      Devices: 'Up to 3',
      Battery: '2× AAA',
      'Key Type': 'Scissor',
      Warranty: '6 months',
    },
  },
  {
    id: 27,
    name: 'Pulse Sport Neckband Earphones',
    brand: 'FunGear',
    price: 1190,
    oldPrice: 1690,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 85,
    sold: 1250,
    category: 'earbuds-tws',
    tags: ['Wireless', 'Bluetooth 5.3', 'Portable', 'Budget'],
    highlights: ['18h playtime', 'Magnetic earbuds', 'IPX5', 'Fast charge'],
    description:
      'Lightweight neckband earphones that stay put during workouts, with magnetic earbuds and all-day battery.',
    specs: {
      Driver: '10mm',
      Bluetooth: '5.3',
      'Battery Life': 'Up to 18 hours',
      'Water Rating': 'IPX5',
      Charging: 'USB-C',
      Warranty: '1 year',
    },
  },
  {
    id: 28,
    name: 'AirDots Buds Neo',
    brand: 'FunGear',
    price: 1490,
    oldPrice: null,
    rating: 4,
    ratingCount: 4,
    sale: false,
    inStock: true,
    stock: 95,
    sold: 1620,
    category: 'earbuds-tws',
    tags: ['Wireless', 'Bluetooth 5.3', 'Budget', 'New Arrival'],
    highlights: ['Deep bass', 'Game mode low latency', '24h with case', 'Touch control'],
    description:
      'Budget-friendly true wireless earbuds with punchy bass, a low-latency game mode and 24 hours of total playtime.',
    specs: {
      Driver: '10mm',
      Bluetooth: '5.3',
      'Battery Life': '5h + 19h case',
      'Game Mode': 'Yes',
      Charging: 'USB-C',
      Warranty: '6 months',
    },
  },
  {
    id: 29,
    name: 'Titan 65W GaN Fast Charger',
    brand: 'Voltix',
    price: 2490,
    oldPrice: 3190,
    rating: 5,
    ratingCount: 5,
    sale: true,
    inStock: true,
    stock: 52,
    sold: 890,
    category: 'power-charging',
    tags: ['Fast Charging', 'USB-C', 'Premium', 'Best Seller'],
    highlights: ['65W GaN', '3 ports', 'Laptop compatible', 'Compact travel size'],
    description:
      'One charger for everything — 65W GaN technology powers laptops, tablets and phones from a charger the size of a matchbox.',
    specs: {
      Output: '65W total',
      Ports: '2× USB-C, 1× USB-A',
      Technology: 'GaN III',
      'Plug Type': 'Type G / Type C',
      Weight: '110 g',
      Warranty: '1 year',
    },
  },
  {
    id: 30,
    name: 'Shield Rugged Phone Case',
    brand: 'GripTech',
    price: 690,
    oldPrice: 990,
    rating: 4,
    ratingCount: 4,
    sale: true,
    inStock: true,
    stock: 160,
    sold: 2950,
    category: 'mobile-accessories',
    tags: ['Waterproof', 'Premium'],
    highlights: ['Military-grade drop protection', 'Raised camera lip', 'Slim profile', 'Anti-yellow'],
    description:
      'Military-grade protection without the bulk — reinforced corners, raised camera lip and a clear anti-yellow finish.',
    specs: {
      Protection: 'MIL-STD 810G',
      Material: 'TPU + PC',
      'Drop Height': '2 m',
      'Camera Lip': 'Raised',
      'Finish': 'Anti-yellow clear',
      Warranty: 'Replacement',
    },
  },
]

/* -------------------------------------------------------------------------- */
/*  Derived exports                                                           */
/* -------------------------------------------------------------------------- */

export let products = rawProducts.map((p) => {
  const seed = p.name.split(' ').slice(0, 3).join(' ')
  const gallery = [
    photo(seed),
    photo(`${seed} alternate angle`),
    photo(`${seed} with accessories and packaging`),
    photo(`${seed} lifestyle detail shot`),
  ]
  return { ...p, image: gallery[0], images: gallery }
})

export const setProductsCache = (newProducts) => {
  if (Array.isArray(newProducts) && newProducts.length > 0) {
    products = newProducts
  }
}

export const getCategoryCounts = (list = products) => {
  const counts = {}
  list.forEach((p) => {
    if (p.category) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
  })
  return counts
}

export const getPriceBounds = (list = products) => {
  if (!list || list.length === 0) return { min: 0, max: 100000 }
  const prices = list.map((p) => Number(p.price) || 0)
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  }
}

export const getSaleProducts = (limit = 3, list = products) =>
  list.filter((p) => p.sale).slice(0, limit)

export const getProductById = (id, list = products) =>
  list.find((p) => Number(p.id) === Number(id))

export const getProductsByCategory = (slug, list = products) =>
  slug ? list.filter((p) => p.category === slug) : list

export const getCategoryName = (slug) =>
  categories.find((c) => c.slug === slug)?.name || slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || slug

export const searchProducts = (query, list = products) => {
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter(
    (p) =>
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q)) ||
      p.category?.replace(/-/g, ' ').includes(q)
  )
}

/* --- Home page collections ------------------------------------------------ */

export const getTrendingProducts = (limit = 8, list = products) =>
  [...list].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, limit)

export const getBestSellingProducts = (limit = 8, list = products) => {
  const matched = list.filter(
    (p) => p.tags?.some((t) => /best/i.test(t)) || (p.sold && p.sold > 80)
  )
  return (matched.length > 0 ? matched : list).slice(0, limit)
}

export const getNewArrivals = (limit = 8, list = products) => {
  const matched = list.filter(
    (p) => p.tags?.some((t) => /new/i.test(t)) || p.id > 10
  )
  return (matched.length > 0 ? matched : [...list].reverse()).slice(0, limit)
}

export const getDealProducts = (limit = 4, list = products) =>
  list.filter((p) => p.sale && p.oldPrice).slice(0, limit)

export const collections = [
  {
    slug: 'gaming-gear',
    title: 'Pro Gaming Setup',
    subtitle: 'Keyboards, mice & controllers',
    image: img('rgb gaming setup with mechanical keyboard and mouse, dramatic dark studio lighting', 'landscape_4_3'),
  },
  {
    slug: 'audio-headphones',
    title: 'Sound That Moves You',
    subtitle: 'Headphones & speakers',
    image: img('premium wireless headphones and bluetooth speaker, clean modern studio', 'landscape_4_3'),
  },
  {
    slug: 'smart-watches',
    title: 'Wearable Tech',
    subtitle: 'Smart watches & fitness bands',
    image: img('modern smartwatch on wrist, lifestyle photography, minimal background', 'landscape_4_3'),
  },
]

/* --- Deterministic demo reviews ------------------------------------------- */

const reviewPool = [
  { name: 'Tanvir Ahmed', rating: 5, title: 'Excellent quality', body: 'Delivery was super fast and the product quality exceeded my expectation. Fully genuine, exactly as described.' },
  { name: 'Nusrat Jahan', rating: 5, title: 'Worth every taka', body: 'Been using it daily for a month now with zero issues. Build quality feels premium and battery life is great.' },
  { name: 'Rakib Hasan', rating: 4, title: 'Very good, minor delay', body: 'Product is fantastic. Shipping took an extra day but customer support on WhatsApp kept me updated.' },
  { name: 'Sadia Islam', rating: 5, title: 'Highly recommended', body: 'Packaging was neat and secure. Working perfectly. Will definitely order from FunGearBD again.' },
  { name: 'Mehedi Karim', rating: 4, title: 'Great value', body: 'Good value for the price. Setup was simple and everything matched the description on the site.' },
]

export const getProductReviews = (product) => {
  if (!product) return []
  const offset = product.id % reviewPool.length
  const count = 3 + (product.id % 2)
  return Array.from({ length: count }, (_, i) => {
    const r = reviewPool[(offset + i) % reviewPool.length]
    return { ...r, date: `${((i + product.id) % 28) + 1} Aug 2026` }
  })
}
