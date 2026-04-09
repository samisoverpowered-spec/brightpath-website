const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PACKAGES = {
  single: {
    label:    '1-Hour Tutoring Session',
    sessions: 1,
  },
  bundle: {
    label:    '5-Session Bundle',
    sessions: 5,
  },
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing session id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    const pkg     = PACKAGES[session.metadata?.package] || PACKAGES.single;
    res.json({
      customer_name:  session.customer_details?.name  || 'Student',
      customer_email: session.customer_details?.email || '',
      amount_total:   (session.amount_total / 100).toFixed(2),
      package_label:  pkg.label,
      sessions:       pkg.sessions,
    });
  } catch (err) {
    console.error('Session retrieval error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
