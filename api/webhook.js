const stripe   = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');

const PACKAGES = {
  single: { label: '1-Hour Tutoring Session', sessions: 1 },
  bundle: { label: '5-Session Bundle',         sessions: 5 },
};

// Vercel serverless functions parse the body automatically,
// but Stripe webhook verification needs the raw body.
// We disable the default body parser via the config export below.
module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    await handlePaymentSuccess(event.data.object);
  }

  res.json({ received: true });
};

// Tell Vercel not to parse the body — Stripe needs the raw bytes to verify the signature
module.exports.config = {
  api: { bodyParser: false },
};

async function handlePaymentSuccess(session) {
  const email = session.customer_details?.email;
  const name  = session.customer_details?.name || 'Student';
  const pkg   = PACKAGES[session.metadata?.package] || PACKAGES.single;
  const amount = (session.amount_total / 100).toFixed(2);

  if (!email) { console.warn('No customer email on session:', session.id); return; }

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from:    'Pomelo English <hello@pomelo-english.com>',
      to:      email,
      subject: `✅ You're confirmed — Pomelo English booking`,
      html:    buildConfirmationEmail(name, pkg, amount),
    });
    console.log(`Confirmation email sent → ${email}`);
  } catch (err) {
    console.error('Resend error:', err);
  }
}

function buildConfirmationEmail(name, pkg, amount) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0f0ff;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto 60px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(79,70,229,0.12);">
    <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e3a8a 100%);padding:44px 40px 36px;text-align:center;">
      <p style="color:#818cf8;font-size:1rem;font-weight:800;margin:0 0 10px;letter-spacing:0.05em;">✦ POMELO ENGLISH</p>
      <h1 style="color:#ffffff;font-size:1.75rem;font-weight:700;margin:0 0 8px;line-height:1.2;">Payment Confirmed!</h1>
      <p style="color:rgba(255,255,255,0.65);font-size:0.92rem;margin:0;">Your tutoring session${pkg.sessions > 1 ? 's are' : ' is'} secured.</p>
    </div>
    <div style="padding:40px;">
      <p style="font-size:1rem;color:#374151;margin:0 0 6px;">Hi ${name},</p>
      <p style="font-size:0.95rem;color:#6b7280;line-height:1.75;margin:0 0 28px;">
        Thank you for booking with Pomelo English! Your payment of <strong style="color:#1e1b4b;">$${amount} CAD</strong> has been received and your ${pkg.sessions === 1 ? 'session is' : 'sessions are'} confirmed.
      </p>
      <div style="background:#f8f7ff;border:1px solid #e5e7eb;border-radius:14px;padding:22px 26px;margin-bottom:28px;">
        <p style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;font-weight:700;margin:0 0 14px;">Order Summary</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="font-size:0.9rem;color:#374151;font-weight:600;padding-bottom:8px;">${pkg.label}</td>
            <td style="font-size:0.9rem;color:#374151;font-weight:700;text-align:right;padding-bottom:8px;">$${amount} CAD</td>
          </tr>
          <tr>
            <td style="font-size:0.82rem;color:#9ca3af;">${pkg.sessions} session${pkg.sessions > 1 ? 's' : ''} × 1 hour each</td>
            <td style="font-size:0.82rem;color:#10b981;text-align:right;font-weight:600;">Paid ✓</td>
          </tr>
        </table>
      </div>
      <div style="background:linear-gradient(135deg,rgba(79,70,229,0.05),rgba(6,182,212,0.05));border:1px solid rgba(79,70,229,0.15);border-radius:14px;padding:22px 26px;margin-bottom:32px;">
        <p style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;font-weight:700;margin:0 0 14px;">What's next?</p>
        <ol style="margin:0;padding:0 0 0 18px;display:flex;flex-direction:column;gap:8px;">
          <li style="font-size:0.88rem;color:#374151;line-height:1.5;">Click the button below to schedule your session time</li>
          <li style="font-size:0.88rem;color:#374151;line-height:1.5;">Pick a date &amp; time that works for you</li>
          <li style="font-size:0.88rem;color:#374151;line-height:1.5;">You'll receive a Zoom/Meet link before your session</li>
        </ol>
      </div>
      <div style="text-align:center;margin-bottom:36px;">
        <a href="${process.env.BASE_URL}/thank-you.html" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#ffffff;text-decoration:none;padding:15px 36px;border-radius:999px;font-weight:700;font-size:0.95rem;box-shadow:0 4px 16px rgba(79,70,229,0.35);">
          Schedule My Session →
        </a>
      </div>
      <p style="font-size:0.82rem;color:#9ca3af;text-align:center;border-top:1px solid #f3f4f6;padding-top:24px;margin:0;line-height:1.6;">
        Questions? Reply to this email or reach us at
        <a href="mailto:hello@pomelo-english.com" style="color:#4f46e5;text-decoration:none;">hello@pomelo-english.com</a><br/>
        <span style="font-size:0.75rem;">© 2026 Pomelo English. All rights reserved.</span>
      </p>
    </div>
  </div>
</body>
</html>`;
}
