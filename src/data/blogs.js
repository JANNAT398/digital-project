// Blog articles for FunGearBD. Edit titles, dates and copy freely.
// Images are generated on the fly; swap the URLs for your own uploads anytime.
const img = (prompt) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`

export const blogs = [
  {
    id: 1,
    image: img('premium%20wireless%20earbuds%20charging%20case%20close%20up%20studio%20product%20photo'),
    date: '18 Nov, 2026',
    comments: 24,
    author: 'FunGearBD Team',
    category: 'Buying Guide',
    readTime: '4 min read',
    title: 'How to Choose the Right Wireless Earbuds in 2026',
    description:
      'ANC, battery life, codecs and fit — here is what really matters before you buy your next pair of earbuds.',
    content:
      'Wireless earbuds have become the most personal gadget we own. They sit in our ears for hours, so a little research goes a long way.\n\nStart with battery life. Look at the total playtime with the charging case, not just the buds alone — anything above 24 hours combined is comfortable for a full week of commutes. Active Noise Cancellation (ANC) is the next big factor: it is genuinely useful on buses and crowded streets, but check that the transparency mode sounds natural so you can still hear traffic when you need to.\n\nFit matters more than specs. Silicone tips in multiple sizes make a bigger difference to sound quality and comfort than any marketing claim. If you plan to work out, pick a model with an IPX4 rating or higher so sweat does not damage the drivers.\n\nFinally, match your ecosystem. If you use an Android phone, codec support like AAC or LDAC gives you better streaming quality. Whatever you choose, always buy from an authorised seller so your warranty stays valid — that is something we guarantee on every FunGearBD order.',
  },
  {
    id: 2,
    image: img('modern%20smartwatch%20with%20fitness%20dashboard%20on%20wrist%20lifestyle%20photo'),
    date: '14 Nov, 2026',
    comments: 15,
    author: 'FunGearBD Team',
    category: 'Buying Guide',
    readTime: '5 min read',
    title: 'Smartwatch Buying Guide: Features That Actually Matter',
    description:
      'Ignore the gimmicks. These are the smartwatch features that make a real difference in daily life.',
    content:
      'A smartwatch can be a brilliant health companion or an expensive notification machine. The difference comes down to which features you will actually use.\n\nFirst, decide between a lifestyle watch and a performance watch. Lifestyle watches focus on notifications, calls and a clean design, while performance watches add accurate GPS, heart-rate zones and recovery metrics for runners and cyclists.\n\nBattery is the silent deal-breaker. A bright always-on display is lovely but drains fast; look for at least 5 days of typical use if you dislike charging daily. Check that the charging is magnetic and the cable is easy to replace.\n\nHealth sensors are only as good as the app behind them. A watch with fewer sensors but a clearer, well-built app usually beats a feature-stuffed rival with a confusing interface. Make sure sleep tracking and SpO2 readings are available in your region.\n\nLastly, consider strap compatibility. Standard 20mm or 22mm quick-release straps mean you can swap between silicone for workouts and leather for the office without buying a new watch. That flexibility is what keeps a good watch on your wrist for years.',
  },
  {
    id: 3,
    image: img('mechanical%20gaming%20keyboard%20rgb%20backlight%20dark%20product%20photo'),
    date: '09 Nov, 2026',
    comments: 31,
    author: 'FunGearBD Team',
    category: 'Gaming',
    readTime: '6 min read',
    title: 'Mechanical vs Membrane Keyboards for Gaming',
    description:
      'Switch types, actuation and sound — a practical breakdown to help you pick the right keyboard.',
    content:
      'The keyboard is the one gaming peripheral you touch constantly, so it is worth getting right. The biggest decision is switch type.\n\nMechanical keyboards use individual switches under every key. They offer a crisp, consistent feel and last for millions of presses. Linear switches are smooth and silent, ideal for fast-paced competitive games. Tactile switches add a noticeable bump so you feel every press, while clicky switches add an audible click for typists who love feedback.\n\nMembrane keyboards are quieter and cheaper. They feel softer and are perfectly fine for casual play and office work, but the keys can feel mushy over time and are harder to repair.\n\nIf you play fast shooters, look for switches with a short actuation distance and a keyboard that supports N-key rollover and a high polling rate, so no press is ever missed. For work and gaming in one setup, a hot-swappable board is the smart pick — you can change switches later without buying a whole new keyboard.\n\nWhichever you choose, wrist comfort matters. Pair your keyboard with the right height and, if you type all day, consider a wrist rest to keep your posture healthy.',
  },
  {
    id: 4,
    image: img('portable%20power%20bank%20charging%20smartphone%20flat%20lay%20photo'),
    date: '03 Nov, 2026',
    comments: 19,
    author: 'FunGearBD Team',
    category: 'Accessories',
    readTime: '4 min read',
    title: 'Power Banks Explained: mAh, Fast Charging & Safety',
    description:
      'Understand capacity, output wattage and safety ratings before your next power bank purchase.',
    content:
      'A power bank is emergency peace of mind, but only if you understand three numbers: capacity, output and input.\n\nCapacity is measured in milliamp-hours (mAh). A 10,000mAh bank charges a typical phone about two times, while 20,000mAh handles two to three full charges and maybe a tablet. Remember that real-world output is lower than the printed number — expect roughly 60 to 70 percent once conversion losses are counted.\n\nOutput wattage decides how fast your devices charge. A standard 18W port is fine for phones, but a modern laptop or tablet needs 45W or 65W over USB-C Power Delivery. Check that the bank supports the fast-charging standard your phone uses, or you simply get slow charging.\n\nInput matters too. A bank that recharges at 18W takes hours to refill, while one supporting 65W USB-C input can top up during a lunch break.\n\nThe most important number of all is safety. Buy from reputable brands with overcharge, overheat and short-circuit protection. Never leave a swollen or hot power bank in use, and always carry it in your hand luggage, not checked baggage, when you fly. Genuine certification is not optional — it protects your device and your family.',
  },
  {
    id: 5,
    image: img('home%20streaming%20studio%20desk%20with%20microphone%20and%20ring%20light'),
    date: '28 Oct, 2026',
    comments: 12,
    author: 'FunGearBD Team',
    category: 'Setup',
    readTime: '5 min read',
    title: 'Build a Budget Home Studio for Streaming',
    description:
      'You do not need a fortune to sound and look professional. Here is a sensible starter setup.',
    content:
      'Streaming and content creation are more accessible than ever, and you can build a great setup without overspending.\n\nStart with audio, because viewers forgive bad video but not bad sound. A USB condenser microphone on a boom arm keeps your desk clear and your voice close, and a simple pop filter removes harsh plosives. If your room echoes, a few soft furnishings or a cheap acoustic panel behind the mic make a surprising difference.\n\nFor video, lighting beats an expensive camera. A single ring light or softbox in front of you gives a clean, flattering look, and a plain, tidy background keeps attention on you. Most modern webcams are perfectly good once your lighting is right.\n\nDo not skip the small things: a stable mount, cable management clips and a comfortable chair you can sit in for hours. Your energy on stream comes directly from how comfortable you are.\n\nFinally, upgrade in order of impact: audio first, then lighting, then camera. This budget-first approach means every taka you spend visibly improves your stream, and nothing sits unused in a drawer.',
  },
  {
    id: 6,
    image: img('assorted%20tech%20accessories%20cables%20cases%20organized%20flat%20lay%20photo'),
    date: '21 Oct, 2026',
    comments: 9,
    author: 'FunGearBD Team',
    category: 'Tips',
    readTime: '3 min read',
    title: 'Protecting Your Tech: Cables, Cases & Everyday Care',
    description:
      'Simple habits that make your gadgets last years longer and keep your warranty intact.',
    content:
      'Good gadgets deserve good care, and a few small habits can add years to their life.\n\nCables are the first thing to fail. Avoid sharp bends near the connector, never yank by the wire, and coil loosely rather than wrapping tightly around a charger. A braided cable and a strain-relief sleeve cost very little and prevent the frustrating "my charger stopped working" moment.\n\nCases and screen protectors are genuinely worth it on phones and tablets. A tempered-glass protector absorbs the impact of a drop so the expensive display does not have to. Pick a case with raised edges around the camera and screen.\n\nHeat is the silent killer of batteries. Avoid leaving devices in a hot car, do not charge under a pillow, and take your phone out of a thick case while fast charging if it gets warm.\n\nKeep your warranty safe by buying from authorised sellers and storing your invoice digitally. If something does go wrong, you are covered. Treat your tech well and it will keep up with you — and remember, we are always a message away if you need advice or a genuine replacement part.',
  },
]

export const getBlogById = (id) => blogs.find((b) => b.id === Number(id))
