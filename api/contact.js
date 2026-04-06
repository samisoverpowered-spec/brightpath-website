const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, plan, goals, program, level, frequency, notes } = req.body || {};

  if (!name?.trim() || !email?.trim() || !goals?.trim() || !program?.trim() || !level) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error — email could not be sent. Please contact us directly.' });
  }

  const resend = new Resend(apiKey);

  // Both addresses receive the notification.
  // Note: Resend sandbox only allows sending to the account's verified email.
  // Once pomeloenglish.com is verified in Resend these can be any address.
  const notifyAddresses = [
    'samisoverpowered@gmail.com',
    'pomeloenglish3300@gmail.com',
  ];

  try {
    const result = await resend.emails.send({
      from: 'Pomelo English <onboarding@resend.dev>',
      to: notifyAddresses,
      reply_to: email,
      subject: `New Student Enquiry — ${name}`,
      html: buildEmail({ name, email, plan, goals, program, level, frequency, notes }),
    });

    // Resend returns { id } on success, or { error } on failure
    if (result.error) {
      console.error('Resend API error:', JSON.stringify(result.error));
      return res.status(500).json({
        error: `Email service error: ${result.error.message || JSON.stringify(result.error)}`,
      });
    }

    console.log('Email sent successfully, id:', result.data?.id);
    res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Resend exception:', err?.message || err);
    res.status(500).json({ error: `Failed to send: ${err?.message || 'Unknown error'}` });
  }
};

function buildEmail({ name, email, plan, goals, program, level, frequency, notes }) {
  const row = (label, value) => value ? `
    <tr>
      <td style="padding:10px 16px;font-size:0.82rem;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;width:38%;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
      <td style="padding:10px 16px;font-size:0.92rem;color:#1f2937;vertical-align:top;border-bottom:1px solid #f3f4f6;">${String(value).replace(/\n/g, '<br/>')}</td>
    </tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:580px;margin:36px auto 56px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
    <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#1e3a8a 100%);padding:36px 40px 28px;">
      <p style="color:#a5b4fc;font-size:0.8rem;font-weight:800;margin:0 0 8px;letter-spacing:0.08em;">✦ POMELO ENGLISH — NEW ENQUIRY</p>
      <h1 style="color:#fff;font-size:1.55rem;font-weight:700;margin:0 0 6px;line-height:1.25;">New Student Interested</h1>
      <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;margin:0;">Reply directly to this email to reach them.</p>
    </div>
    <div style="padding:32px 40px 36px;">
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tbody>
          ${row('Name', name)}
          ${row('Email', `<a href="mailto:${email}" style="color:#4f46e5;">${email}</a>`)}
          ${row('Plan interested in', plan || 'Not specified')}
          ${row('Goals', goals)}
          ${row('Program / working towards', program)}
          ${row('Current English level', level)}
          ${row('Sessions per week', frequency || 'Not specified')}
          ${row('Additional notes', notes || '—')}
        </tbody>
      </table>
      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${email}?subject=Re: Your Pomelo English Enquiry" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;text-decoration:none;padding:13px 32px;border-radius:999px;font-weight:700;font-size:0.9rem;box-shadow:0 4px 14px rgba(79,70,229,0.3);">Reply to ${name} →</a>
      </div>
    </div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 40px;text-align:center;">
      <p style="font-size:0.75rem;color:#9ca3af;margin:0;">© 2026 Pomelo English · Sent from your website contact form</p>
    </div>
  </div>
</body>
</html>`;
}
