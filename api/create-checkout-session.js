const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PACKAGES = {
  single: {
    label:       '1-Hour Tutoring Session',
    description: 'Live 1-on-1 English tutoring with a Pomelo English expert',
    amount:      3000,
    sessions:    1,
  },
  bundle: {
    label:       '5-Session Bundle',
    description: '5 × 1-hour live sessions — save $20 CAD',
    amount:      13000,
    sessions:    5,
  },
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { package: pkg } = req.body || {};
  const selected = PACKAGES[pkg];
  if (!selected) return res.status(400).json({ error: 'Invalid package selected.' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: {
            name:        selected.label,
            description: selected.description,
          },
          unit_amount: selected.amount,
        },
        quantity: 1,
      }],
      mode:                       'payment',
      billing_address_collection: 'auto',
      success_url: `${process.env.BASE_URL}/thank-you.html?session_id={CHECKOUT_SESSION_ID}&pkg=${pkg}`,
      cancel_url:  `${process.env.BASE_URL}/book.html?cancelled=1`,
      metadata:    { package: pkg, sessions: String(selected.sessions) },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
